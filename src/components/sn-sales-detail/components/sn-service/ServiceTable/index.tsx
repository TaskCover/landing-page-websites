import { CellProps, TableLayout } from "components/Table";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { useContext, useMemo } from "react";
import ServiceTableItem from "./ServiceTableItemDesktop";
import { Stack, TableBody } from "@mui/material";
import { Button, IconButton, Text } from "components/shared";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import { EditContext } from "../context/EditContext";
import PlusIcon from "icons/PlusIcon";
import useHeaderServiceTable from "components/sn-sales-detail/hooks/useHeaderServiceTable";
import MoreDotIcon from "icons/MoreDotIcon";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceTableItemMobile from "./ServiceTableItemMobile";
import ServiceItemAction from "./ServiceItemAction";
import SectionItemAction from "./SectionItemAction";
import useItemAction from "components/sn-sales-detail/hooks/useItemAction";
import useFetchServiceSection from "components/sn-sales-detail/hooks/useGetServiceSection";
import { Service, ServiceSection } from "store/sales/reducer";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { uuid } from "utils/index";

interface IProps {
  section: ServiceSection;
  index: number;
}

const ServiceTable = ({ section, index }: IProps) => {
  const salesT = useTranslations(NS_SALES);
  const { isEdit } = useContext(EditContext);
  const { serviceTableHeader } = useHeaderServiceTable();
  const { isMdSmaller } = useBreakpoint();
  const { onAction } = useItemAction();
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: `sectionsList.${index}.service`,
  });

  const onDragService = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
  };

  const onAddRow = () => {
    append({
      id: uuid(),
      name: "name",
      desc: "description",
      price: 0,
      qty: 0,
      unit: "unit",
      tolBudget: 0,
    });
  };

  // const onAddRowByRateCard = () => {
  //   console.log("add row by rate card");
  // };

  return (
    <Stack py={2}>
      <Draggable draggableId={section.id} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* {isEdit && (
                    <IconButton noPadding {...provided.dragHandleProps}>
                      <MoveDotIcon
                        fontSize="small"
                        sx={{ color: "grey.A200" }}
                      />
                    </IconButton>
                  )} */}
                  <Text variant="h4">Section {index}</Text>
                  {isEdit && (
                    <SectionItemAction
                      sectionId={section.id}
                      onChangeAction={onAction}
                    />
                  )}
                </Stack>
                <Button
                  variant="text"
                  TouchRippleProps={{
                    style: {
                      display: "none",
                    },
                  }}
                  sx={{
                    display: index !== 0 || !isEdit ? "none" : "block",
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
              </Stack>
              {/* Table layout desktop */}
              <TableLayout
                headerList={serviceTableHeader}
                maxHeight={860}
                minWidth={1020}
                px={2}
                headerProps={{
                  sx: { px: { xs: 2, md: 2 }, overflow: "auto" },
                }}
                position="relative"
              >
                <DragDropContext onDragEnd={onDragService}>
                  <Droppable droppableId="droppableService">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {fields?.map((item, serviceIndex) => (
                          <ServiceTableItem
                            service={item as Service}
                            index={serviceIndex}
                            key={item.id}
                            sectionKey={`sectionsList.${index}.service`}
                          />
                        ))}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TableLayout>
            </Stack>
          </div>
        )}
      </Draggable>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={onAddRow}
          variant="text"
          TouchRippleProps={{
            style: {
              display: "none",
            },
          }}
          sx={{
            display: isEdit ? "block" : "none",
            width: "fit-content",
            "&.MuiButton-text:hover": {
              color: "secondary.main",
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
          {salesT("detail.service.addNewRow")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ServiceTable;
