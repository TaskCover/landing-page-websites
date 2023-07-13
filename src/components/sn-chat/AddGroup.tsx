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
import SelectItem from "./components/SelectItem";
import { useAuth } from "store/app/selectors";

const AddGroup = () => {
  const [textSearch, setTextSearch] = useState("");
  const [employeeSelected, setEmployeeSelected] = useState({});

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

  const { prevStep, onSetStep } = useChat();

  const commonT = useTranslations(NS_COMMON);

  useEffect(() => {
    onGetEmployees(user?.company ?? "", { pageIndex: 0, pageSize: 20 });
  }, [onGetEmployees, textSearch, user?.company]);

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
          // onClick={onClose}
        >
          {commonT("form.cancel")}
        </Button>
        <Button
          variant="primary"
          sx={defaultSx.button}
          type="button"
          size="small"
          // onClick={onSubmit}
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
  root: {
    minWidth: { sm: 500 },
    minHeight: 230,
    px: 3,
  },
  bottom: {
    p: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    borderBottom: "1px solid",
    borderColor: "grey.100",
    pb: 3,
    mx: 0,
    "& > p": {
      textAlign: "center",
    },
    "& > button": {
      top: 0,
      transform: "unset",
    },
  },
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};
