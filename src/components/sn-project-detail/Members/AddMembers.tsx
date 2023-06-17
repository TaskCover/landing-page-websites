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
import { useEmployeeOptions, usePositions } from "store/company/selectors";
import { useMembersOfProject, useProjects } from "store/project/selectors";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";

type MemberData = {
  id: string;
  position: string;
  fullname: string;
};

const AddMembers = () => {
  const [isShow, onShow, onHide] = useToggle();

  return (
    <>
      <Button
        onClick={onShow}
        startIcon={<PlusIcon />}
        size="small"
        variant="primary"
      >
        Thêm mới
      </Button>
      {isShow && <Form open onClose={onHide} />}
    </>
  );
};

export default memo(AddMembers);

const Form = (props: Omit<DialogLayoutProps, "children" | "onSubmit">) => {
  const { ...rest } = props;
  const { items, onGetOptions } = useEmployeeOptions();
  const { items: members, id } = useMembersOfProject();
  const { onUpdateProject } = useProjects();
  const { onAddSnackbar } = useSnackbar();
  const { options, onGetPositions } = usePositions();

  const [newMembers, setNewMembers] = useState<MemberData[]>([]);

  const onChangeMembers = (id: string, position: string, fullname: string) => {
    const indexSelected = members.findIndex((item) => item.id === id);

    const newData = [...newMembers];

    if (indexSelected === -1) {
      newData.push({ id, position, fullname });
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
        onAddSnackbar("Cập nhật thành viên thành công!", "success");
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  useEffect(() => {
    if (options.length) return;
    onGetPositions();
  }, [onGetPositions, options.length]);

  useEffect(() => {
    setNewMembers(
      members.map((member) => ({
        id: member.id,
        position: member.position_project.id,
        fullname: member.fullname,
      })),
    );
  }, [members]);

  return (
    <FormLayout
      label=""
      renderHeader={<HeaderForm />}
      onSubmit={onSubmit}
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
  return (
    <Stack spacing={2}>
      <Text textTransform="capitalize" fontWeight={600}>
        Thêm thành viên vào dự án
      </Text>
      <Search
        name="email"
        placeholder="Tìm kiếm theo email"
        sx={{ maxWidth: 300 }}
      />
    </Stack>
  );
};
