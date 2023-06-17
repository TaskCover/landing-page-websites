"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import { usePositions } from "store/company/selectors";
import Form from "./Form";
import { Refresh } from "components/Filters";

const Actions = () => {
  const [isShow, onShow, onHide] = useToggle();
  const { onCreatePosition, onGetPositions, pageSize, pageIndex } =
    usePositions();

  const onRefresh = () => {
    onGetPositions({ pageSize, pageIndex });
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={3}
        px={{ xs: 1, sm: 3 }}
        py={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={{ xs: 2, md: 0 }}
        >
          <Text variant="h4" display={{ md: "none" }}>
            Danh sách chức vụ
          </Text>
          <Button
            onClick={onShow}
            startIcon={<PlusIcon />}
            size="small"
            variant="primary"
          >
            Thêm mới
          </Button>
        </Stack>

        <Refresh onClick={onRefresh} />
      </Stack>
      {isShow && (
        <Form
          open={isShow}
          onClose={onHide}
          type={DataAction.CREATE}
          initialValues={INITIAL_VALUES}
          onSubmit={onCreatePosition}
        />
      )}
    </>
  );
};

export default memo(Actions);

const INITIAL_VALUES = {
  name: "",
};
