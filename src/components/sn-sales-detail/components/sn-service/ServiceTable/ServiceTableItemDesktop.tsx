import { Stack, TableRow } from "@mui/material";
import { BodyCell, StatusCell } from "components/Table";
import { Button, IconButton, Input, Select, Text } from "components/shared";
import React, {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { EditContext } from "../context/EditContext";
import { Draggable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import ServiceItemAction from "./ServiceItemAction";
import { Service } from "store/sales/reducer";
import { formatEstimateTime, formatNumber } from "utils/index";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { ServiceColumn } from "components/sn-sales-detail/hooks/useGetHeaderColumn";
import { Action } from "../../TodoList/SubItem";
import { UNIT_OPTIONS } from "components/sn-sales/Modals/AddDealsModal";
import { useSalesService } from "store/sales/selectors";
import LockIcon from "icons/LockIcon";
import UnlockIcon from "icons/UnlockIcon";
import { CURRENCY_CODE, SALE_BILL_TYPE } from "constant/enums";
import {
  COLOR_BILL_TYPE,
  SALE_BILL_TYPE_LABEL,
} from "components/sn-sales-detail/helpers";
import { Option } from "constant/types";
import { useGetBillTypeOptions } from "components/sn-sales-detail/hooks/useGetBillTypeOptions";
import { NS_SALES } from "constant/index";
import CustomLabelSelect from "../../CustomLabelSelect";
import CustomInput from "../../CustomInput/CustomInput";
import CustomDesktopInput from "../../CustomInput/CustomDesktopInput";

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
  const { register, control, getValues, setValue } = useFormContext();
  const { sectionColumns } = useSalesService();
  const [isLocked, setIsLocked] = React.useState(false);
  const { billTypeOptions } = useGetBillTypeOptions();
  const currency = useWatch({
    control,
    name: `${sectionKey}.${index}.unit`,
  });
  const billType = useWatch({
    control,
    name: `${sectionKey}.${index}.billType`,
  });

  const isShowCols = useCallback(
    (cols: ServiceColumn) => {
      if (!sectionColumns[sectionIndex]) return true;
      return sectionColumns[sectionIndex].columns.includes(cols);
    },
    [sectionColumns],
  );

  const defaultBillType = useMemo(() => {
    if (!service.billType) return SALE_BILL_TYPE.FIX;

    return service.billType;
  }, [service.billType]);

  const tolBuget = useMemo(() => {
    if (typeof service.tolBudget !== "number") {
      return parseFloat(service.tolBudget);
    }
    return service.tolBudget;
  }, [service.tolBudget]);

  useEffect(() => {
    setValue(
      `${sectionKey}.${index}.unit`,
      service.unit ?? UNIT_OPTIONS[0].value,
    );
  }, [index, sectionKey]);

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
                <CustomDesktopInput
                  name={`${sectionKey}.${index}.name`}
                  control={control}
                  disabled={isLocked}
                  isEdit={isEdit}
                  value={service.name}
                />
              </BodyCell>
              {isShowCols(ServiceColumn.DESCRIPTION) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                    height: "auto",
                  }}
                  align="left"
                >
                  <CustomDesktopInput
                    name={`${sectionKey}.${index}.desc`}
                    control={control}
                    disabled={isLocked}
                    isEdit={isEdit}
                    value={service.desc}
                  />
                </BodyCell>
              )}
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <CustomDesktopInput
                  name={`${sectionKey}.${index}.serviceType`}
                  control={control}
                  disabled={isLocked}
                  isEdit={isEdit}
                  value={service.serviceType}
                />
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
                    defaultValue={{
                      value: defaultBillType,
                    }}
                    render={({ field }) => (
                      <CustomLabelSelect
                        {...field}
                        defaultValue={defaultBillType}
                        options={billTypeOptions as Option[]}
                        disabled={isLocked}
                      />
                    )}
                  />
                ) : (
                  <StatusCell
                    sx={{
                      [`&.MuiTableCell-body`]: {
                        borderBottom: "none",
                        height: "fit-content",
                      },
                      [`&.MuiTableCell-root`]: {
                        display: "flex",
                        borderBottom: "none",
                        alignItems: "center",
                        justifyContent: "start",
                        padding: 0,
                      },

                      [`&.MuiSvgIcon-root`]: {
                        display: "none",
                      },
                    }}
                    text={SALE_BILL_TYPE_LABEL[service.billType]}
                    color={COLOR_BILL_TYPE[service.billType]}
                    namespace={NS_SALES}
                  />
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
                    {...register(`${sectionKey}.${index}.unit`)}
                    render={({ field }) => {
                      return (
                        <Select
                          defaultValue={currency}
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
                  <Text variant="body2">{currency as string}</Text>
                )}
              </BodyCell>

              {isShowCols(ServiceColumn.ESTIMATE) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  <CustomDesktopInput
                    name={`${sectionKey}.${index}.estimate`}
                    control={control}
                    disabled={isLocked || billType === SALE_BILL_TYPE.ACTUAL}
                    isEdit={isEdit}
                    helperText="h"
                    type="number"
                    value={`${service.estimate || 0}h`}
                  />
                </BodyCell>
              )}

              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <CustomDesktopInput
                  name={`${sectionKey}.${index}.qty`}
                  control={control}
                  disabled={
                    isLocked || billType === SALE_BILL_TYPE.NON_BILLABLE
                  }
                  isEdit={isEdit}
                  helperText="pcs"
                  type="number"
                  inputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  value={formatNumber(service.qty, { suffix: "pcs" })}
                />
              </BodyCell>
              {isShowCols(ServiceColumn.PRICE) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  <CustomDesktopInput
                    name={`${sectionKey}.${index}.price`}
                    control={control}
                    disabled={
                      isLocked || billType === SALE_BILL_TYPE.NON_BILLABLE
                    }
                    isEdit={isEdit}
                    value={formatNumber(service.price, {
                      prefix: CURRENCY_SYMBOL[currency as CURRENCY_CODE],
                      suffix: "/pc",
                      numberOfFixed: 2,
                    })}
                    type="number"
                    inputProps={{
                      type: "number",
                      inputProps: {
                        min: 0,
                      },
                    }}
                    helperText={`${
                      CURRENCY_SYMBOL[currency as CURRENCY_CODE]
                    }/pc`}
                  />
                </BodyCell>
              )}
              {isShowCols(ServiceColumn.DISCOUNT) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  <CustomDesktopInput
                    name={`${sectionKey}.${index}.discount`}
                    control={control}
                    disabled={isLocked}
                    isEdit={isEdit}
                    value={formatNumber(service.discount, { suffix: "%" })}
                    type="number"
                    helperText="%"
                  />
                </BodyCell>
              )}

              {isShowCols(ServiceColumn.MARK_UP) && (
                <BodyCell
                  sx={{
                    ...defaultSx.item,
                  }}
                  align="left"
                >
                  <CustomDesktopInput
                    name={`${sectionKey}.${index}.markUp`}
                    control={control}
                    disabled={isLocked}
                    isEdit={isEdit}
                    value={formatNumber(service.markUp, { suffix: "%" })}
                    type="number"
                    helperText="%"
                  />
                </BodyCell>
              )}
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <CustomDesktopInput
                  name={`${sectionKey}.${index}.tolBudget`}
                  control={control}
                  disabled={isLocked}
                  isEdit={isEdit}
                  value={formatNumber(tolBuget, {
                    numberOfFixed: 2,
                    prefix: CURRENCY_SYMBOL[currency as CURRENCY_CODE],
                  })}
                  helperText={CURRENCY_SYMBOL[currency as CURRENCY_CODE]}
                  type="number"
                />
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
