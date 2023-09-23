import { Stack, TableRow } from "@mui/material";
import { BodyCell } from "components/Table";
import { Button, IconButton, Input, Select, Text } from "components/shared";
import React, { cloneElement, useCallback, useContext, useMemo } from "react";
import { EditContext } from "../context/EditContext";
import { Draggable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import ServiceItemAction from "./ServiceItemAction";
import { Service } from "store/sales/reducer";
import { formatEstimateTime, formatNumber } from "utils/index";
import { Controller, useFormContext } from "react-hook-form";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { ServiceColumn } from "components/sn-sales-detail/hooks/useGetHeaderColumn";
import { Action } from "../../TodoList/SubItem";
import { UNIT_OPTIONS } from "components/sn-sales/Modals/AddDealsModal";
import { useSalesService } from "store/sales/selectors";
import LockIcon from "icons/LockIcon";
import UnlockIcon from "icons/UnlockIcon";

interface IProps {
  index: number;
  sectionKey: string;
  service: Service;
  sectionIndex: number;
  onAction: (action: Action) => void;
}

const ServiceTableItem = ({
  index,
  sectionKey,
  service,
  sectionIndex,
  onAction,
}: IProps) => {
  const { isEdit } = useContext(EditContext);
  const { register, control, getValues } = useFormContext();
  const currency = getValues("currency");
  const { sectionColumns } = useSalesService();
  const [isLocked, setIsLocked] = React.useState(false);

  const isShowCols = useCallback(
    (cols: ServiceColumn) => {
      if (!sectionColumns[sectionIndex]) return true;
      return sectionColumns[sectionIndex].columns.includes(cols);
    },
    [sectionColumns],
  );

  const defaultUnit = useMemo(() => {
    const unit = UNIT_OPTIONS.find(
      (item) => item.value === service.unit,
    )?.value;
    return unit || UNIT_OPTIONS[0];
  }, [service.unit]);
  return (
    <Draggable
      draggableId={service?.id}
      index={index}
      isDragDisabled={isLocked}
    >
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
                  zIndex: 999,
                  left: "-6px",
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
                  ml: 2,
                }}
              >
                {isEdit ? (
                  <Controller
                    control={control}
                    {...register(`${sectionKey}.${index}.name`)}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={isLocked}
                        multiline
                        maxRows={2}
                        minRows={1}
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
              {isShowCols(ServiceColumn.DESCRIPTION) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                    height: "auto",
                  }}
                  align="left"
                >
                  {isEdit ? (
                    <Controller
                      control={control}
                      {...register(`${sectionKey}.${index}.desc`)}
                      render={({ field }) => (
                        <Input
                          multiline
                          maxRows={2}
                          minRows={1}
                          {...field}
                          disabled={isLocked}
                          sx={{
                            width: "100%",
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Text
                      variant="body2"
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        height: "fit-content",
                        boxSizing: "border-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {service.desc}
                    </Text>
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
                    {...register(`${sectionKey}.${index}.serviceType`)}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={isLocked}
                        multiline
                        maxRows={2}
                        minRows={1}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">{service.serviceType}</Text>
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
                    {...register(`${sectionKey}.${index}.billType`)}
                    render={({ field }) => (
                      <Input
                        multiline
                        maxRows={2}
                        minRows={1}
                        {...field}
                        disabled={isLocked}
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                ) : (
                  <Text variant="body2">{service.billType}</Text>
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
                    defaultValue={defaultUnit}
                    {...register(`${sectionKey}.${index}.unit`)}
                    render={({ field }) => {
                      return (
                        <Select
                          multiline
                          placeholder="Select unit"
                          {...field}
                          disabled={isLocked}
                          options={UNIT_OPTIONS}
                          sx={{
                            width: "100%",
                          }}
                        />
                      );
                    }}
                  />
                ) : (
                  <Text variant="body2">
                    {service.unit || UNIT_OPTIONS[0].value}
                  </Text>
                )}
              </BodyCell>

              {isShowCols(ServiceColumn.ESTIMATE) && (
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
                          disabled={isLocked}
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
                        disabled={isLocked}
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
              {isShowCols(ServiceColumn.PRICE) && (
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
                          disabled={isLocked}
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
              )}
              {isShowCols(ServiceColumn.DISCOUNT) && (
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
                      {...register(`${sectionKey}.${index}.discount`)}
                      render={({ field }) => (
                        <Input
                          helperText="%"
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0,
                              max: 100,
                            },
                          }}
                          {...field}
                          disabled={isLocked}
                          sx={{
                            width: "100%",
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Text variant="body2">
                      {formatNumber(service.discount, { suffix: "%" })}
                    </Text>
                  )}
                </BodyCell>
              )}

              {isShowCols(ServiceColumn.MARK_UP) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  {isEdit ? (
                    <Controller
                      control={control}
                      {...register(`${sectionKey}.${index}.markUp`)}
                      render={({ field }) => (
                        <Input
                          helperText="%"
                          {...field}
                          disabled={isLocked}
                          InputProps={{
                            inputProps: {
                              min: 0,
                              max: 100,
                            },
                          }}
                          type="number"
                          sx={{
                            width: "100%",
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Text variant="body2">
                      {formatNumber(service.markUp, { suffix: "%" })}
                    </Text>
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
                        disabled={isLocked}
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
                <BodyCell sx={{ padding: 0, position: "relative" }}>
                  <Stack
                    direction={"row"}
                    spacing={0}
                    sx={{
                      position: "relative",
                      zIndex: 99,
                    }}
                  >
                    <IconButton
                      sx={{
                        width: "24px",
                        color: isLocked ? "success.main" : "text.main",
                      }}
                      onClick={() => setIsLocked(!isLocked)}
                    >
                      {isLocked ? <LockIcon /> : <UnlockIcon />}
                    </IconButton>
                    <ServiceItemAction
                      onChangeAction={onAction}
                      serviceId={service.id}
                      index={index}
                    />
                  </Stack>
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
      py: 1,
      px: 1,
    },
  },
};
