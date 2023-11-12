"use client";
import { Stack } from "@mui/material";
import React, { memo, useCallback, useContext } from "react";
import ServiceTable from "./ServiceTable";
import ServiceHeader from "./ServiceHeader/ServiceHeaderDesktop";
import { EditContext } from "./context/EditContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceHeaderMobile from "./ServiceHeader/ServiceHeaderMobile";
import { FieldValue, useFieldArray, useFormContext } from "react-hook-form";
import PlusIcon from "icons/PlusIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { ServiceSection } from "store/sales/reducer";
import { useSalesService } from "store/sales/selectors";
import { Button } from "components/shared";
import useGetOptions, {
  useFetchOptions,
} from "components/sn-resource-planing/hooks/useGetOptions";
import { ScrollViewProvider } from "components/sn-sales-detail/hooks/useScrollErrorField";
import { uuid } from "utils/index";
import { SALE_BILL_TYPE, SERVICE_UNIT_OPTIONS } from "constant/enums";
import { defaultShowColumns } from "components/sn-sales-detail/hooks/useGetHeaderColumn";

const SaleService = () => {
  const { isMdSmaller } = useBreakpoint();
  const { setEdit } = useContext(EditContext);
  const { serviceSectionList } = useSalesService();
  const salesT = useTranslations(NS_SALES);
  const { isEdit } = useContext(EditContext);
  const { control, setValue, getValues } = useFormContext();
  const { positionOptions } = useGetOptions();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sectionsList",
  });

  // const sectionsList = getValues("sectionsList");
  // TODO: Drag if needed
  const onDragEnd = (result, provided) => {
    const { destination, source, draggableId } = result;
    const sectionList = [...getValues("sectionsList")];
    //if descId == sourceId => change position of draggableId
    // if descId != sourceId => move draggableId to descId at the position index of descId
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const desSectionIndex = destination.droppableId.split(".")[2];
    const sourceSectionIndex = source.droppableId.split(".")[2];
    const desSectionId = destination.droppableId.split(".")[1];
    const sourceSectionId = source.droppableId.split(".")[1];

    if (desSectionId === sourceSectionId) {
      const section = sectionList[desSectionIndex];
      const tmp = section.service[source.index];
      section.service[source.index] = section.service[destination.index];
      section.service[destination.index] = tmp;
      setValue("sectionsList", sectionList, { shouldDirty: true });
      return;
    }
    const desSection = sectionList[desSectionIndex];
    const sourceSection = sectionList[sourceSectionIndex];
    const draggable = sourceSection.service[source.index];
    sourceSection.service.splice(source.index, 1);
    desSection.service.splice(destination.index, 0, draggable);
    setValue("sectionsList", sectionList, { shouldDirty: true });
  };

  const onAddSection = () => {
    append({
      id: uuid(),
      service: [
        {
          id: uuid(),
          name: "",
          desc: "",
          serviceType: positionOptions[0]?.value,
          price: 0,
          billType: SALE_BILL_TYPE.FIX,
          qty: 0,
          discount: 0,
          unit: SERVICE_UNIT_OPTIONS.DAY,
          tolBudget: 0,
        },
      ],
    });
    setEdit(true);
  };

  const onRemoveSection = useCallback(
    (index) => {
      const deletedSections =
        (getValues("deletedSections") as Array<string>) || [];
      setValue("deletedSections", [
        ...deletedSections,
        serviceSectionList[index]?.id,
      ]);
      remove(index);
    },
    [JSON.stringify(serviceSectionList)],
  );
  useFetchOptions();

  return (
    <Stack spacing={2} position="relative">
      <Stack spacing={2}>
        <Stack
          sx={{
            position: isEdit ? "sticky" : "relative",
            top: 0,
            zIndex: 1000,
            padding: "20px 0px",
            backgroundColor: "background.paper",
          }}
          direction="row"
          justifyContent={fields.length === 0 ? "space-between" : "flex-end"}
        >
          {fields.length === 0 && (
            <Button
              onClick={onAddSection}
              variant="text"
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              sx={{
                display: "block",
                "&.MuiButton-text:hover": {
                  color: "secondary.main",
                  textAlign: "center",
                },
                width: "fit-content",
              }}
              color="secondary"
              startIcon={
                <PlusIcon
                  sx={{
                    width: 18,
                    height: 18,
                  }}
                />
              }
            >
              {salesT("detail.service.addService")}
            </Button>
          )}
          <ServiceHeader />
        </Stack>
        <ScrollViewProvider>
          <DragDropContext onDragEnd={onDragEnd}>
            {fields?.map((section, index) => (
              <Droppable
                key={section.id}
                direction="vertical"
                droppableId={`sectionList.${section.id}.${index}`}
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <ServiceTable
                      key={section.id}
                      index={index}
                      onRemoveSection={() => onRemoveSection(index)}
                      onAddSection={onAddSection}
                      section={section as ServiceSection}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </ScrollViewProvider>
      </Stack>
      {isMdSmaller && <ServiceHeaderMobile />}
    </Stack>
  );
};

export default SaleService;
