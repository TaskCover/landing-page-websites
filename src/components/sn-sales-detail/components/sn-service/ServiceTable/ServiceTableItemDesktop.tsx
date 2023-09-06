import { Stack, TableRow } from "@mui/material";
import { BodyCell } from "components/Table";
import { Button, IconButton, Input, Text } from "components/shared";
import React, { cloneElement, useContext, useMemo } from "react";
import { EditContext } from "../context/EditContext";
import { Draggable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import ServiceItemAction from "./ServiceItemAction";
import useItemAction from "components/sn-sales-detail/hooks/useItemAction";
import { Service } from "store/sales/reducer";
import { formatEstimateTime, formatNumber } from "utils/index";
import { Controller, useFormContext } from "react-hook-form";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import useHeaderServiceTable from "components/sn-sales-detail/hooks/useHeaderServiceTable";
import { ServiceColumn } from "components/sn-sales-detail/hooks/useGetHeaderColumn";
import { Action } from "../../TodoList/SubItem";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";

interface IProps {
  index: number;
  sectionKey: string;
  service: Service;
  onAction: (action: Action) => void;
}

const ServiceTableItem = ({ index, sectionKey, service, onAction }: IProps) => {
  const { isEdit } = useContext(EditContext);
  const { register, control, getValues } = useFormContext();
  const { columns } = useHeaderServiceTable();
  const currency = getValues("currency");

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
                {isEdit ? (
                  <Controller
                    control={control}
                    {...register(`${sectionKey}.${index}.desc`)}
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
                  <Text variant="body2">{service.desc}</Text>
                )}
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    defaultValue={0}
                    {...register(`${sectionKey}.${index}.estimate`)}
                    render={({ field }) => (
                      <Input
                        helperText="h"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        {...field}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">{`${service.estimate || 0}h`}</Text>
                )}
              </BodyCell>

              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    defaultValue={0}
                    {...register(`${sectionKey}.${index}.qty`)}
                    render={({ field }) => (
                      <Input
                        helperText="pcs"
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        {...field}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">
                    {formatNumber(service.qty, { suffix: "pcs" })}
                  </Text>
                )}
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    defaultValue={0}
                    {...register(`${sectionKey}.${index}.price`)}
                    render={({ field }) => (
                      <Input
                        helperText={`${CURRENCY_SYMBOL[currency]}/pc`}
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        {...field}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">
                    {formatNumber(service.price, {
                      prefix: CURRENCY_SYMBOL[currency],
                      suffix: "/pc",
                      numberOfFixed: 2,
                    })}
                  </Text>
                )}
              </BodyCell>
              {columns.includes(ServiceColumn.MARK_UP) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  {isEdit ? (
                    <Controller
                      control={control}
                      {...register(`${sectionKey}.${index}.markup`)}
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
                    <Text variant="body2">{service.markup}</Text>
                  )}
                </BodyCell>
              )}
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    defaultValue={0}
                    {...register(`${sectionKey}.${index}.tolBudget`)}
                    render={({ field }) => (
                      <Input
                        helperText={CURRENCY_SYMBOL[currency]}
                        type="number"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        {...field}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">
                    {formatNumber(service.tolBudget, {
                      prefix: CURRENCY_SYMBOL[currency],
                    })}
                  </Text>
                )}
              </BodyCell>

              {isEdit && (
                <BodyCell>
                  <ServiceItemAction
                    onChangeAction={onAction}
                    serviceId={service.id}
                    index={index}
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
