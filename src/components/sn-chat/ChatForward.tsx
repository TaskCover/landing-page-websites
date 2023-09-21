/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import SelectItem from "./components/SelectItem";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Skeleton, Typography } from "@mui/material";
import { Button } from "components/shared";
import { useChat } from "store/chat/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { useAuth, useSnackbar } from "store/app/selectors";
import { ChangeEvent, useEffect, useState } from "react";
import { Employee } from "store/company/reducer";
import { STEP } from "store/chat/type";

const ChatForward = () => {
  const [employeeIdSelected, setEmployeeIdSelected] = useState<any>({});
  const commonT = useTranslations(NS_COMMON);
  const { onAddSnackbar } = useSnackbar();
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    pageSize,
    pageIndex,
    totalPages,
    onGetEmployees,
    onApproveOrReject: onApproveOrRejectAction,
  } = useEmployeesOfCompany();
  const { user } = useAuth();

  const {
    prevStep,
    createGroupStatus,
    newGroupData,
    convention,
    dataTransfer,
    groupMembers,
    onSetRoomId,
    onGetAllConvention,
    onSetStep,
    onCreateDirectMessageGroup,
    onAddMembers2Group,
    onFetchGroupMembersMember,
    onForwardMessage
  } = useChat();

  useEffect(() => {
    onGetEmployees(user?.company ?? "", { pageIndex: 0, pageSize: 30 });
  }, []);

  const handleClickConversation = (
    employee: any,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmployeeIdSelected({
      ...employeeIdSelected,
      [employee?._id ?? ""]: event.target.checked,
    });
  };

  const handleForwardMessage = () => {   
    if (!Object.values(employeeIdSelected)?.filter((item)=>item)?.length) {
      onAddSnackbar('Please select at least one member!', 'error');
      return;
    }
    const fws = Object.keys(employeeIdSelected).filter((item) => employeeIdSelected[item]).map(async (item) => {
      return await onForwardMessage({ messageId: dataTransfer?.message?._id, roomId: item });
    })
    Promise.all(fws).then((values) => {
      onAddSnackbar('Forward message successfully!', 'success');
      onSetStep(STEP.CHAT_GROUP, dataTransfer);
    });
  }

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            height: "240px",
          }}
        >
          <Box
            overflow="auto"
            style={{
              height: '230px',
            }}
          >
            {isFetching || error ? (
              Array.from({ length: 5 }, (_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                  p={2}
                >
                  <Skeleton variant="rounded" width={40} height={40} />
                  <Box flex={1}>
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width="40%"
                    />
                  </Box>
                </Box>
              ))
            ) : (
              <>
                  {convention?.filter((item => item?.name))?.map((item, index) => (
                    <SelectItem
                      checkbox
                      onClick={(event) =>
                        handleClickConversation(item, event)
                      }
                      employee={({ avatar: { link: item?.avatar }, fullname: item?.name, email: '', _id: item?._id } as unknown as Employee)}
                      key={index}
                    />
                  ))
                  }
              </>
            )}
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "var(--gray-3, #999)",
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: "1rem",
                position: "absolute",
                left: 14,
                top: 10,
                backgroundColor: 'white'
              }}
            >
              Message
            </Typography>
            <div style={{
              resize: "vertical",
              width: "100%",
              padding: "28px 14px 14px",
              borderRadius: "0.25rem",
              background: "var(--gray-0, #F7F7FD)",
              border: "none",
              color: "var(--black, #212121)",
              fontFamily: "Open Sans",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              height: '70px',
              overflowY: 'auto',
              overflowX: 'hidden'

            }}>
              <div dangerouslySetInnerHTML={{ __html: dataTransfer?.message?.msg }}/>
            </div>
          </Box>
          <Typography
            sx={{
              color: "var(--gray-3, #999)",
              textAlign: "right",
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
            }}
          >
            0/2000
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            gap: 1,
            padding: 2,
          }}
        >
          <Button
            type="button"
            variant="primaryOutlined"
            size="small"
            sx={defaultSx.button}
            onClick={() => {
              onSetStep(STEP.CHAT_GROUP, dataTransfer);
            }}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            variant="primary"
            sx={defaultSx.button}
            type="button"
            size="small"
            onClick={handleForwardMessage}
          >
            {commonT("form.add")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChatForward;
const defaultSx = {
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};
