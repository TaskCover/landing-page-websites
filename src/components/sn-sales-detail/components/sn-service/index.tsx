"use client";
import { Stack } from "@mui/material";
import React from "react";
import ServiceTable from "./ServiceTable";
import ServiceHeader from "./ServiceHeader/ServiceHeaderDesktop";
import { EditProvider } from "./context/EditContext";
import { DUMMY_SERVICE } from "../dummy";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceHeaderMobile from "./ServiceHeader/ServiceHeaderMobile";
import useGetServiceSection from "components/sn-sales-detail/hooks/useGetServiceSection";
import { useSalesService } from "store/sales/selectors";

const SaleService = () => {
  const { serviceSectionList } = useSalesService();
  const { isMdSmaller } = useBreakpoint();
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
  };
  useGetServiceSection();
  return (
    <EditProvider>
      <Stack spacing={2}>
        <Stack>
          <ServiceHeader />
        </Stack>
        <Stack spacing={2}>
          {/* Service table
           */}
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
