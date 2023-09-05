"use client";
import { Button, Stack } from "@mui/material";
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
import PlusIcon from "icons/PlusIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";

const SaleService = () => {
  const { isMdSmaller } = useBreakpoint();
  const salesT = useTranslations(NS_SALES);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
  };

  // const sectionsList = getValues("sectionsList");
  const { serviceSectionList } = useSalesService();

  return (
    <EditProvider>
      <Stack spacing={2}>
        <Stack>{serviceSectionList.length !== 0 && <ServiceHeader />}</Stack>
        <Stack spacing={2}>
          <Stack direction="row">
            {serviceSectionList.length === 0 && (
              <Button
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
          </Stack>
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
