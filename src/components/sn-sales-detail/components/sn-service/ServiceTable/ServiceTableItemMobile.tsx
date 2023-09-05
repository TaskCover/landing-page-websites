import { Stack, TableRow } from "@mui/material";
import { BodyCell } from "components/Table";
import { Button, IconButton, Input, Text } from "components/shared";
import React, { useContext, useMemo } from "react";
import { EditContext } from "../context/EditContext";
import { Draggable } from "react-beautiful-dnd";
import MoveDotIcon from "icons/MoveDotIcon";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";

interface IProps {
  data?: any;
  index: number;
}

const ServiceTableItemMobile = ({ data = {}, index }: IProps) => {
  const { isEdit } = useContext(EditContext);
  const saleT = useTranslations(NS_SALES);
  const draggableId = useMemo(() => {
    return `SERVICE-SECTION-${index}`;
  }, [index]);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}></div>
      )}
    </Draggable>
  );
};

export default ServiceTableItemMobile;

const defaultSx = {
  item: {
    "&.MuiTableCell-root": {
      py: 2,
    },
  },
};
