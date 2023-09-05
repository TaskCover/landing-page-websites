import { Stack, TableRow } from "@mui/material";
import { BodyCell } from "components/Table";
import { Button, IconButton, Input, Text } from "components/shared";
import React, { useContext, useMemo } from "react";
import { EditContext } from "../context/EditContext";
import { Draggable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import ServiceItemAction from "./ServiceItemAction";
import useItemAction from "components/sn-sales-detail/hooks/useItemAction";
import { Service } from "store/sales/reducer";
import { formatEstimateTime } from "utils/index";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  index: number;
  sectionKey: string;
  service: Service;
}

const ServiceTableItem = ({ index, sectionKey, service }: IProps) => {
  const { isEdit } = useContext(EditContext);
  const { register, control, getValues } = useFormContext();
  const saleT = useTranslations(NS_SALES);
  const { onAction } = useItemAction();

  return (
    <Draggable draggableId={service?.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            alignItems="center"
            py={1}
          >
            {isEdit && (
              <IconButton
                sx={{
                  position: "absolute",
                  left: "-4px",
                }}
                noPadding
                {...provided.dragHandleProps}
              >
                <MoveDotIcon />
              </IconButton>
            )}
            <TableRow>
              <BodyCell
                align="left"
                size="small"
                sx={{
                  ...defaultSx.item,
                }}
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    {...register(`${sectionKey}.${index}.name`)}
                    render={({ field }) => (
                      <Input
                        {...field}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">{service.name}</Text>
                )}
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{service.desc}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{`${service.estimate}h`}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{service.qty}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{service.price}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{service.tolBudget}</Text>
              </BodyCell>

              {isEdit && (
                <BodyCell>
                  <ServiceItemAction
                    onChangeAction={onAction}
                    serviceId={service.id}
                  />
                </BodyCell>
              )}
            </TableRow>
          </Stack>
        </div>
      )}
    </Draggable>
  );
};

export default ServiceTableItem;

const defaultSx = {
  item: {
    "&.MuiTableCell-root": {
      py: 2,
    },
  },
};
