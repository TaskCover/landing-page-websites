"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import { useProjectTypes } from "store/company/selectors";
import Form from "./Form";
import { Refresh } from "components/Filters";
import { NS_COMMON, NS_COMPANY } from "constant/index";
import { useTranslations } from "next-intl";
import useBreakpoint from "hooks/useBreakpoint";

const Actions = () => {
  const commonT = useTranslations(NS_COMMON);
  const companyT = useTranslations(NS_COMPANY);

  const { isMdSmaller } = useBreakpoint();

  const [isShow, onShow, onHide] = useToggle();
  const { onCreateProjectType, onGetProjectTypes, pageSize, pageIndex } =
    useProjectTypes();

  const onRefresh = () => {
    onGetProjectTypes({ pageSize, pageIndex });
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={{ xs: 2, md: 0 }}
        px={{ md: 3 }}
        pt={{ md: 1.5 }}
        pb={1.5}
      >
        <Text variant="h4" display={{ md: "none" }}>
          {companyT("projectTypes.title")}
        </Text>
        <Button
          onClick={onShow}
          startIcon={<PlusIcon />}
          size={isMdSmaller ? "extraSmall" : "small"}
          variant="primary"
          sx={{ height: { xs: 32, md: 40 } }}
        >
          {commonT("createNew")}
        </Button>
        {/* <Refresh onClick={onRefresh} /> */}
      </Stack>
      {isShow && (
        <Form
          open={isShow}
          onClose={onHide}
          type={DataAction.CREATE}
          initialValues={INITIAL_VALUES}
          onSubmit={onCreateProjectType}
        />
      )}
    </>
  );
};

export default memo(Actions);

const INITIAL_VALUES = {
  name: "",
};
