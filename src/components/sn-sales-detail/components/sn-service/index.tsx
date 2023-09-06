"use client";
import { Button, Stack } from "@mui/material";
import React, { useContext } from "react";
import ServiceTable from "./ServiceTable";
import ServiceHeader from "./ServiceHeader/ServiceHeaderDesktop";
import { EditContext, EditProvider } from "./context/EditContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceHeaderMobile from "./ServiceHeader/ServiceHeaderMobile";
import { useSalesService } from "store/sales/selectors";
import { useFieldArray, useFormContext } from "react-hook-form";
import Loading from "components/Loading";
import useFetchServiceSection from "components/sn-sales-detail/hooks/useGetServiceSection";
import PlusIcon from "icons/PlusIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { ServiceSection } from "store/sales/reducer";

const SaleService = () => {
  const { isMdSmaller } = useBreakpoint();
  const { setEdit } = useContext(EditContext);
  const salesT = useTranslations(NS_SALES);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
  };
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sectionsList",
  });
  // const sectionsList = getValues("sectionsList");

  const onAddSection = () => {
    setEdit(false);
    append({} as ServiceSection);
  };

  const onRemoveSection = (index, sectionId) => {
    const deletedSections =
      (getValues("deletedSections") as Array<string>) || [];
    setValue("deletedSections", [...deletedSections, sectionId]);
    remove(index);
  };

  return (
    <EditProvider>
      <Stack spacing={2}>
        <Stack></Stack>
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
                      index={index}
                      onRemoveSection={() => onRemoveSection(index, section.id)}
                      onAddSection={onAddSection}
                      key={section.id}
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
    </EditProvider>
  );
};

export default SaleService;
