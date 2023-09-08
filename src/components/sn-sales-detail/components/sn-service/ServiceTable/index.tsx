import { CellProps, TableLayout } from "components/Table";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ServiceTableItem from "./ServiceTableItemDesktop";
import { Stack, TableBody } from "@mui/material";
import { Button, IconButton, Text } from "components/shared";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import { EditContext } from "../context/EditContext";
import PlusIcon from "icons/PlusIcon";
import MoreDotIcon from "icons/MoreDotIcon";
import useBreakpoint from "hooks/useBreakpoint";
import ServiceTableItemMobile from "./ServiceTableItemMobile";
import ServiceItemAction from "./ServiceItemAction";
import SectionItemAction from "./SectionItemAction";
import useItemAction from "components/sn-sales-detail/hooks/useItemAction";
import useFetchServiceSection from "components/sn-sales-detail/hooks/useGetServiceSection";
import { Service, ServiceSection } from "store/sales/reducer";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { uuid } from "utils/index";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";
import {
  ServiceColumn,
  useGetHeaderColumn,
} from "components/sn-sales-detail/hooks/useGetHeaderColumn";
import { useSalesService } from "store/sales/selectors";

interface IProps {
  section: ServiceSection;
  index: number;
  onAddSection: () => void;
  onRemoveSection: () => void;
}

const ServiceTable = ({
  section,
  index,
  onAddSection,
  onRemoveSection,
}: IProps) => {
  const salesT = useTranslations(NS_SALES);
  const { isEdit } = useContext(EditContext);
  const { isMdSmaller } = useBreakpoint();
  const { columns: defaultColumns } = useGetHeaderColumn();
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `sectionsList.${index}.service`,
  });
  const { sectionColumns } = useSalesService();
  const commonT = useTranslations(NS_COMMON);
  const { onAction } = useItemAction(
    index,
    append as UseFieldArrayAppend<FieldValues, string>,
    remove as UseFieldArrayRemove,
    onRemoveSection,
    fields,
  );

  const onDragService = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    move(source.index, destination.index);
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

  const headerList = useMemo(() => {
    const list = defaultColumns.reduce((prev, item) => {
      const sections = sectionColumns[index];

      const isExisted = sections?.columns.includes(item.id as ServiceColumn);
      if (isExisted) {
        prev.push(item);
      }
      return prev;
    }, [] as CellProps[]);
    if (isEdit) {
      list.push({
        id: ServiceColumn.ACTION,
        value: "",
        width: "4%",
      });
    }
    return list;
  }, [sectionColumns, isEdit]);

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
                  <Text variant="h4">Section {index + 1}</Text>
                  {isEdit && (
                    <SectionItemAction
                      sectionIndex={index}
                      sectionId={section.id}
                      onChangeAction={onAction}
                    />
                  )}
                </Stack>
                <Button
                  onClick={onAddSection}
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
                headerList={headerList}
                maxHeight={920}
                headerProps={{
                  sx: { px: { xs: 2, md: 2 } },
                }}
                position="relative"
                sx={{
                  overflow: "auto",
                }}
              >
                <DragDropContext onDragEnd={onDragService}>
                  <Droppable droppableId="droppableService">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {fields?.map((item, serviceIndex) => (
                          <ServiceTableItem
                            onAction={onAction}
                            service={item as Service}
                            index={serviceIndex}
                            key={item.id}
                            sectionIndex={index}
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
