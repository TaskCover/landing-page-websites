"use client";
import { Button, Stack } from "@mui/material";
import React, { useCallback, useContext } from "react";
import ServiceTable from "./ServiceTable";
import ServiceHeader from "./ServiceHeader/ServiceHeaderDesktop";
import { EditContext } from "./context/EditContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceHeaderMobile from "./ServiceHeader/ServiceHeaderMobile";
import { useFieldArray, useFormContext } from "react-hook-form";
import PlusIcon from "icons/PlusIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { ServiceSection } from "store/sales/reducer";
import { useSalesService } from "store/sales/selectors";

const SaleService = () => {
  const { isMdSmaller } = useBreakpoint();
  const { setEdit } = useContext(EditContext);
  const { serviceSectionList } = useSalesService();
  const salesT = useTranslations(NS_SALES);

  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sectionsList",
  });

  // const sectionsList = getValues("sectionsList");
  // TODO: Drag if needed
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  };

  const onAddSection = () => {
    append({} as ServiceSection);
  };

  const onRemoveSection = useCallback(
    (index) => {
      const deletedSections =
        (getValues("deletedSections") as Array<string>) || [];
      setValue("deletedSections", [
        ...deletedSections,
        serviceSectionList[index].id,
      ]);
      remove(index);
    },
    [serviceSectionList],
  );

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent={fields.length === 0 ? "space-between" : "flex-end"}
        >
          {fields.length === 0 && (
            <Button
              onClick={onAddSection}
              TouchRippleProps={{
                style: {
                  display: "none",
                },
              }}
              sx={{
                display: "block",
                width: "fit-content",
                height: "fit-content",
                "&.MuiButton-text:hover": {
                  color: "secondary.main",
                  textAlign: "center",
                },
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
              {salesT("detail.service.addSection")}
            </Button>
          )}
          <ServiceHeader />
        </Stack>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {fields?.map((section, index) => (
                  <ServiceTable
                    key={section.id}
                    index={index}
                    onRemoveSection={() => onRemoveSection(index)}
                    onAddSection={onAddSection}
                    section={section as ServiceSection}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
      {isMdSmaller && <ServiceHeaderMobile />}
    </Stack>
  );
};

export default SaleService;
