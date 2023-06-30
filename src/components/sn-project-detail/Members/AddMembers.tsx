"use client";

import { memo, useEffect, useState } from "react";
import FormLayout from "components/FormLayout";
import { Button, Text } from "components/shared";
import { DialogLayoutProps } from "components/DialogLayout";
import useToggle from "hooks/useToggle";
import PlusIcon from "icons/PlusIcon";
import { Search } from "components/Filters";
import { MenuList, Stack } from "@mui/material";
import MemberItem from "components/sn-projects/components/MemberItem";
import { useEmployeeOptions } from "store/company/selectors";
import { useMembersOfProject, useProjects } from "store/project/selectors";
import { AN_ERROR_TRY_AGAIN, NS_COMMON, NS_PROJECT } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI, getPath } from "utils/index";
import { usePositionOptions } from "store/global/selectors";
import { usePathname, useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

type MemberData = {
  id: string;
  position: string;
  fullname: string;
};

const AddMembers = () => {
  const [isShow, onShow, onHide] = useToggle();
  const projectT = useTranslations(NS_PROJECT);

  return (
    <>
      <Button
        onClick={onShow}
        startIcon={<PlusIcon />}
        size="small"
        variant="primary"
      >
        {projectT("detailMembers.addMember")}
      </Button>
      {isShow && <Form open onClose={onHide} />}
    </>
  );
};

export default memo(AddMembers);

const Form = (props: Omit<DialogLayoutProps, "children" | "onSubmit">) => {
  const { ...rest } = props;
  const { items, onGetOptions, isFetching } = useEmployeeOptions();
  const {
    items: members,
    id,
    onGetMembersOfProject,
    pageSize,
  } = useMembersOfProject();
  const { onUpdateProject } = useProjects();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const { options, onGetOptions: onGetPositionOptions } = usePositionOptions();
  const pathname = usePathname();
  const { push } = useRouter();
  const [newMembers, setNewMembers] = useState<MemberData[]>([]);

  const onChangeMembers = (
    id: string,
    position: string,
    fullname: string,
    isUpdatePosition?: boolean,
  ) => {
    const indexSelected = newMembers.findIndex((item) => item.id === id);

    const newData = [...newMembers];

    if (indexSelected === -1) {
      newData.push({ id, position, fullname });
    } else if (isUpdatePosition) {
      newData[indexSelected] = {
        ...newData[indexSelected],
        position,
      };
    } else {
      newData.splice(indexSelected, 1);
    }

    setNewMembers(newData);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!id) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateProject(id, { members: newMembers });
      if (newData) {
        onAddSnackbar(
          projectT("detailMembers.notification.updateSuccess"),
          "success",
        );
        props?.onClose();

        const newQueries = { pageIndex: 1, pageSize };
        const path = getPath(pathname, newQueries);
        push(path);
        onGetMembersOfProject(id, newQueries);
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  useEffect(() => {
    onGetPositionOptions({ pageIndex: 1, pageSize: 200000 });
  }, [onGetPositionOptions]);

  useEffect(() => {
    setNewMembers(
      members.map((member) => ({
        id: member.id,
        position: member.position.id,
        fullname: member.fullname,
      })),
    );
  }, [members]);

  return (
    <FormLayout
      label=""
      renderHeader={<HeaderForm />}
      onSubmit={onSubmit}
      pending={isFetching}
      {...rest}
    >
      <MenuList component={Stack} spacing={2}>
        {items.map((item) => {
          const isChecked = newMembers.some((member) => item.id === member.id);
          const positionOfProject = newMembers.find(
            (member) => item.id === member.id,
          )?.position;
          return (
            <MemberItem
              key={item.id}
              {...item}
              onChange={onChangeMembers}
              positionOfProject={positionOfProject}
              checked={isChecked}
            />
          );
        })}
      </MenuList>
    </FormLayout>
  );
};

const HeaderForm = () => {
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);

  return (
    <Stack spacing={2}>
      <Text textTransform="capitalize" fontWeight={600}>
        {projectT("detailMembers.addMembersToProject")}
      </Text>
      <Search
        name="email"
        placeholder={commonT("searchBy", { name: "email" })}
        sx={{ maxWidth: 300 }}
      />
    </Stack>
  );
};
