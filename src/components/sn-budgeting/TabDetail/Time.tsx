import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  popoverClasses,
  Popper,
  Stack,
  TableRow,
  Typography
} from "@mui/material";
import Avatar from "components/Avatar";
import { IconButton, Text } from "components/shared";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import EditIcon from "icons/EditIcon";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  useBudgetGetTimeRangeQuery,
  useBudgetTimeRemove
} from "queries/budgeting/time-range";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import MoreDotIcon from "../../../icons/MoreDotIcon";
import TrashIcon from "../../../icons/TrashIcon";

type TTemplate = {
  date: string;
  service: string;
  person: string;
  notes: string;
  time: string;
  billable: string;
};

const TemplateData: TTemplate[] = [
  {
    date: "2023-12-04T16:21:21.156Z",
    service: "Service",
    person: "Persion",
    notes: "Notes",
    time: "13:14 / 13:14",
    billable: "",
  },
  {
    date: "2023-12-04T16:21:21.156Z",
    service: "Service",
    person: "Persion",
    notes: "Notes",
    time: "13:14 / 13:14",
    billable: "",
  },
];

export type TTimeRanges = {
  _id: string;
  createdAt: string;
  name: string;
  person: {
    fullname: string;
    avatar: string;
  };
  note: string;
  timeRanges: number;
  billableTime: number;
};

export type TForm = {
  times: TTimeRanges[];
};

export const Time = () => {
  const budgetT = useTranslations(NS_BUDGETING);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { id: budgetId } = useParams();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const serviceQuery = useBudgetGetTimeRangeQuery(String(budgetId));
  const removeTimeRange = useBudgetTimeRemove();

  const { control, setValue, handleSubmit, getValues } = useForm<TForm>();
  const { fields, append, remove } = useFieldArray({
    name: "times",
    control,
  });
  const headerList: CellProps[] = [
    { value: "", align: "center" },
    { value: budgetT("tabTime.service"), align: "center" },
    { value: budgetT("tabTime.person"), align: "center" },
    { value: budgetT("tabTime.notes"), align: "center" },
    { value: budgetT("tabTime.time"), data: "105:00", align: "center" },
    { value: budgetT("tabTime.billable"), data: "105:00", align: "center" },
    { value: "", align: "center", width: "5%" },
  ];

  const refClickOutSide = useOnClickOutside(() => setAnchorEl(null));

  const handleRemoveTimeRange = async (id: string, index: number) => {
    removeTimeRange.mutate(id, {
      onSuccess() {
        onAddSnackbar("Success", "success");
        remove(index);
      },
      onError(error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      },
    });
  };
  useEffect(() => {
    if (!serviceQuery || !serviceQuery.data?.docs) return;
    const sectionData = serviceQuery.data.docs;
    setValue(
      "times",
      sectionData.map((doc) => ({
        _id: doc.id,
        createdAt: doc.createdAt,
        note: doc.note,
        timeRanges: doc.timeRanges,
        billableTime: doc.billableTime,
        name: doc.services?.name,
        person: {
          avatar: doc.created_by?.avatar?.link,
          fullname: doc.created_by?.fullname,
        },
      })),
    );
  }, [serviceQuery, setValue]);

  return (
    <>
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {fields.map((data, index) => {
          return (
            <TableRow key={`budget-time-${index}`}>
              <BodyCell>
                {`${moment(data.createdAt).format("DD MMM")}`}
                <br></br>
                {`${moment(data.createdAt).format("hh:mm")}`}
              </BodyCell>
              <BodyCell>{data.name}</BodyCell>
              <BodyCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar src={data.person.avatar} size={20} />
                <Typography ml={1}>{data.person.fullname}</Typography>
              </BodyCell>
              <BodyCell>{data.note}</BodyCell>
              <BodyCell>{data.timeRanges}</BodyCell>
              <BodyCell>{data.billableTime}</BodyCell>
              <BodyCell sx={{ p: 0 }}>
                <IconButton
                  noPadding
                  onClick={(e) => {
                    if (Boolean(anchorEl)) {
                      setAnchorEl(null);
                    } else {
                      setAnchorEl(e.currentTarget);
                    }
                  }}
                >
                  <MoreDotIcon fontSize="medium" sx={{ color: "grey.300" }} />
                </IconButton>
                <Popper
                  ref={refClickOutSide}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  sx={{
                    [`& .${popoverClasses.paper}`]: {
                      backgroundImage: "white",
                      minWidth: 150,
                      maxWidth: 250,
                    },
                    zIndex: 1000,
                  }}
                  transition
                  placement={"bottom-end"}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps} timeout={350}>
                      <Stack
                        py={2}
                        sx={{
                          boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.2)",
                          border: "1px solid",
                          borderTopWidth: 0,
                          borderColor: "grey.100",
                          borderRadius: 1,
                          bgcolor: "background.paper",
                        }}
                      >
                        <MenuList component={Box} sx={{ py: 0 }}>
                          <MenuItem
                            onClick={() => {}}
                            component={ButtonBase}
                            sx={{ width: "100%", py: 1, px: 2 }}
                          >
                            <EditIcon
                              sx={{ color: "grey.400" }}
                              fontSize="medium"
                            />
                            <Text ml={2} variant="body2" color="grey.400">
                              Edit
                            </Text>
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleRemoveTimeRange(data._id, index)
                            }
                            component={ButtonBase}
                            sx={{ width: "100%", py: 1, px: 2 }}
                          >
                            <TrashIcon color="error" fontSize="medium" />
                            <Text ml={2} variant="body2" color="error.main">
                              Delete
                            </Text>
                          </MenuItem>
                        </MenuList>
                      </Stack>
                    </Grow>
                  )}
                </Popper>
              </BodyCell>
            </TableRow>
          );
        })}
      </TableLayout>
    </>
  );
};
