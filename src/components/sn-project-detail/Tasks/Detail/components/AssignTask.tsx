import { memo, useEffect } from "react";
import { MenuItem, MenuList, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import DialogLayout from "components/DialogLayout";
import useToggle from "hooks/useToggle";
import { Search } from "components/Filters";
import { useEmployeeOptions } from "store/company/selectors";
import Avatar from "components/Avatar";
import { useTaskDetail, useTasksOfProject } from "store/project/selectors";
import { useSnackbar } from "store/app/selectors";
import { TaskData } from "store/project/actions";
import { debounce, getMessageErrorByAPI } from "utils/index";

type AssignTaskProps = {};

const AssignTask = (props: AssignTaskProps) => {
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const {
    onGetOptions,
    options,
    pageIndex,
    pageSize,
    isFetching,
    totalPages,
    filters,
  } = useEmployeeOptions();
  const { task, taskListId, onUpdateTask } = useTaskDetail();
  const { onAddSnackbar } = useSnackbar();

  const [isShow, onShow, onHide] = useToggle();

  const onAssign = (owner: string) => {
    return async () => {
      if (!taskListId || !task?.id) return;
      try {
        const newData = await onUpdateTask(
          { owner } as Partial<TaskData>,
          taskListId,
          task.id,
        );
        if (newData) {
          onAddSnackbar(
            projectT("taskDetail.notification.assignSuccess"),
            "success",
          );
          onHide();
        }
      } catch (error) {
        onAddSnackbar(getMessageErrorByAPI(error), "error");
      }
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onScroll = debounce((event: any) => {
    if (isFetching || !totalPages || pageIndex >= totalPages) return;
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - WRONG_NUMBER) {
      onGetOptions({ pageIndex: pageIndex + 1, pageSize });
    }
  }, 250);

  const onChangeSearch = (name: string, newValue?: string) => {
    onGetOptions({ pageIndex: 1, pageSize: 20, [name]: newValue ?? "" });
  };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  return (
    <>
      <Button variant="secondary" size="small" onClick={onShow}>
        {projectT("taskDetail.assignTask")}
      </Button>

      <DialogLayout
        sx={{
          zIndex: 1201,
          minWidth: { xs: "calc(100vw - 24px)", sm: 600 },
          height: 600,
        }}
        renderHeader={projectT("taskDetail.assignTask")}
        contentProps={{
          sx: {
            overflow: "hidden",
          },
        }}
        open={isShow}
        onClose={onHide}
      >
        <Stack flex={1} p={3} height="100%" spacing={2} overflow="hidden">
          <Search
            name="email"
            placeholder={commonT("searchBy", { name: "email" })}
            onChange={onChangeSearch}
            value={filters?.email}
            emitWhenEnter
          />
          <Stack flex={1} overflow="hidden">
            <MenuList
              sx={{
                overflow: "auto",
              }}
              onScroll={onScroll}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  sx={sxConfig.item}
                  onClick={onAssign(option.value as string)}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={option?.avatar} size={24} />
                    <Stack>
                      <Text variant="body2">{option.label}</Text>
                      <Text variant="body2" className="sub">
                        {option.subText}
                      </Text>
                    </Stack>
                  </Stack>
                </MenuItem>
              ))}
            </MenuList>
          </Stack>
        </Stack>
      </DialogLayout>
    </>
  );
};

export default memo(AssignTask);

const sxConfig = {
  item: {
    fontSize: 14,
    color: "text.primary",
    lineHeight: "22px",
    "& > img": {
      mr: 1,
    },
    "&:hover": {
      backgroundColor: "primary.light",
      "& svg": {
        color: "common.white",
      },
    },
  },
};

const WRONG_NUMBER = 10;
