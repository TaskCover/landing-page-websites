"use client";
import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ServiceTable from "./ServiceTable";
import ServiceHeader from "./ServiceHeader/ServiceHeaderDesktop";
import { EditProvider } from "./context/EditContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceHeaderMobile from "./ServiceHeader/ServiceHeaderMobile";
import { useSalesService } from "store/sales/selectors";
import { useFormContext } from "react-hook-form";
import Loading from "components/Loading";
import useFetchServiceSection from "components/sn-sales-detail/hooks/useGetServiceSection";

const SaleService = () => {
  const { isMdSmaller } = useBreakpoint();
  const { getValues, control } = useFormContext();
  const { isFetching } = useSalesService();
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
  };

  // const sectionsList = getValues("sectionsList");
  const { serviceSectionList } = useSalesService();

  return (
    <EditProvider>
      <Stack spacing={2}>
        <Stack>
          <ServiceHeader />
        </Stack>
        <Stack spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {serviceSectionList?.map((section, index) => (
                    <ServiceTable
                      index={index}
                      key={`SERVICE-SECTION-${index}`}
                      section={section}
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
