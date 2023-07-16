/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent, useEffect, useState } from "react";
import { useChat } from "store/chat/selectors";
import ArrowDownIcon from "icons/ArrowDownIcon";
import SearchIcon from "icons/SearchIcon";
import { Button } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { Employee } from "store/company/reducer";
import SelectItem from "../components/SelectItem";
import { useAuth, useSnackbar } from "store/app/selectors";
import { STEP } from "store/chat/type";
import { DataStatus } from "constant/enums";

const AddGroup = () => {
  const [textSearch, setTextSearch] = useState("");
  const [employeeSelected, setEmployeeSelected] = useState<any>({});
  const [employeeNameSelected, setEmployeeNameSelected] = useState<any>({});
  const [employeeIdSelected, setEmployeeIdSelected] = useState<any>({});

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

  const { prevStep, createGroupStatus, newGroupData,
    convention, dataTransfer, onGetAllConvention,
    onSetStep, onCreateDirectMessageGroup, onAddMembers2Group } = useChat();

  const commonT = useTranslations(NS_COMMON);
  const { onAddSnackbar } = useSnackbar();

  useEffect(() => {
    onGetEmployees(user?.company ?? "", { pageIndex: 0, pageSize: 30 });
    onGetAllConvention({
      type: "a",
      text: '',
      offset: 0,
      count: 1000,
    })
  }, [onGetAllConvention, onGetEmployees, textSearch, user?.company]);

  const handleSuccess = (result) => {
    if (result?.error) {
      onAddSnackbar(result?.error?.message, 'error');
      return;
    }
    onAddSnackbar('Successfully!', 'success');
    onSetStep(STEP.CHAT_ONE);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
    }
  };

  const handleClickConversation = (
    employee: Employee,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmployeeSelected({
      ...employeeSelected,
      [employee?.username ?? ""]: event.target.checked,
    });
    setEmployeeNameSelected({
      ...employeeNameSelected,
      [employee?.fullname ?? ""]: event.target.checked,
    });
    setEmployeeIdSelected({
      ...employeeIdSelected,
      [employee?.id_rocket ?? ""]: event.target.checked,
    });
  };

  const handleCreateGroup = async () => {    
    if (dataTransfer?.isNew) {
      const result =  await onCreateDirectMessageGroup({
        groupName: (() => {
          return Object
            .keys(employeeSelected)
            .filter((item) => employeeSelected[item] === true)
            ?.join('-')
            .slice(0, 10) + `...${Math.floor(Math.random() * (9999 - 1 + 1) + 1) }`
        })(),
        members: Object.keys(employeeSelected).filter((item) => employeeSelected[item] === true),
        type: 'd'
      });
      handleSuccess(result);
    } else {
      const users = Object.keys(employeeIdSelected).filter((item) => employeeIdSelected[item] === true);
      const tasks = users.map(async (userId_to_add) => (await onAddMembers2Group({
        roomId: dataTransfer?._id,
        userId_to_add,
      })))
      const result = await Promise.all(tasks);      
      handleSuccess(result.pop());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 2,
        }}
      >
        <IconButton
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            onSetStep(prevStep);
          }}
        >
          <ArrowDownIcon />
        </IconButton>
        <TextField
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            "& .MuiInputBase-root": {
              color: "black",
              borderRadius: "10px",
              border: "1px solid transparent",
            },
          }}
          placeholder="Search name"
          fullWidth
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#999999",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box overflow="auto" maxHeight="calc(550px - 85px - 15px)" minHeight="calc(550px - 85px - 15px)">
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
            {items?.length > 0
              ? items.map((item, index) => {
                  return (
                    <SelectItem
                      checkbox
                      employee={item}
                      key={index}
                      onClick={(event) => handleClickConversation(item, event)}
                    />
                  );
                })
              : null}
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: 2,
        }}
      >
        <Button
          type="button"
          variant="primaryOutlined"
          size="small"
          sx={defaultSx.button}
          onClick={()=>{onSetStep(prevStep)}}
        >
          {commonT("form.cancel")}
        </Button>
        <Button
          variant="primary"
          sx={defaultSx.button}
          type="button"
          size="small"
          onClick={handleCreateGroup}
          // pending={pending}
        >
          {commonT("form.add")}
        </Button>
      </Box>
    </Box>
  );
};

export default AddGroup;

const defaultSx = {
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};
