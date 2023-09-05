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

interface IProps {
  data: Service;
  index: number;
}

const ServiceTableItem = ({ data, index }: IProps) => {
  const { isEdit } = useContext(EditContext);
  const saleT = useTranslations(NS_SALES);
  const { onAction } = useItemAction();

  return (
    <Draggable draggableId={data.id} index={index}>
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
                  zIndex: 9999,
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
                  <Input
                    defaultValue="name"
                    value="name"
                    sx={{
                      [`& .MuiInputBase-root`]: {
                        border: "1px solid #E0E0E0",
                      },
                    }}
                  />
                ) : (
                  <Text variant="body2">{data.name}</Text>
                )}
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{data.desc}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{`${data.estimate}h`}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{data.qty}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{data.price}</Text>
              </BodyCell>
              <BodyCell
                sx={{
                  ...defaultSx.item,
                }}
                align="left"
              >
                <Text variant="body2">{data.tolBudget}</Text>
              </BodyCell>

              {isEdit && (
                <BodyCell>
                  <ServiceItemAction
                    onChangeAction={onAction}
                    serviceId={data.id}
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
