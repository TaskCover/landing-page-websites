import { ResourceApi } from "@fullcalendar/resource";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Avatar from "components/Avatar";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import ArrowDownIcon from "icons/ArrowDownIcon";
import PlusIcon from "icons/PlusIcon";
import React from "react";
import { formatNumber } from "utils/index";
import { isEmpty, includes } from "lodash";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import { IBookingItem, IBookingListItem } from "store/resourcePlanning/reducer";

interface IResourceLabelProps {
  resource: ResourceApi;
  resources: IBookingListItem[] | IBookingItem[];
  setIsOpenCreate: (value: boolean) => void;
  selectedResource: string[];
  totalhour: number;
  isLastItem: boolean;
  setParentResource: (value: string) => void;
  handleCollapseToggle: (id: string) => void;
}
const ResourceLabel = ({
  resource,
  resources,
  setIsOpenCreate,
  setParentResource,
  isLastItem,
  handleCollapseToggle,
  totalhour,
  selectedResource,
}: IResourceLabelProps) => {
  const {
    name,
    company,
    type,
    fullname,
    position,
    eventType,
    note,
    bookings: parentBookings,
  } = resource.extendedProps;
  const commonT = useTranslations(NS_COMMON);
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const isActive = includes(selectedResource, resource._resource.id);
  const handleOpenCreate = () => {
    setIsOpenCreate(true);
    setParentResource(resource._resource.parentId);
  };
  if (type === "step") {
    return (
      <Grid
        container
        direction="column"
        gap={1}
        alignItems="flex-start"
        sx={{
          width: 1,
          py: 2,
          "&:hover": {
            background: "#E1F0FFB2",
          },
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            px: 1,
            display: "flex",
            alignItems: "center",
            columnGap: 1,
          }}
        >
          <Avatar size={36} />
          <Stack direction={"column"}>
            <Typography sx={{ fontSize: 14, lineBreak: "auto", width: 1 }}>
              {eventType === RESOURCE_EVENT_TYPE.PROJECT_BOOKING ? name : note}
            </Typography>
            <Typography sx={{ fontSize: 12, lineBreak: "auto", width: 1 }}>
              {position?.name}
            </Typography>
          </Stack>
        </Grid>
        {isLastItem && (
          <Button
            variant="text"
            startIcon={<PlusIcon />}
            sx={{
              color: "success.main",
            }}
            // startIcon={<AddIcon />}
            onClick={() => handleOpenCreate()}
          >
            {resourceT("schedule.action.addBooking")}
          </Button>
        )}
        <Grid item xs={5} />
      </Grid>
    );
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          width: 1,
          py: 2,
          cursor: "pointer",
          "&:hover": {
            background: "#E1F0FFB2",
          },
        }}
        onClick={() => handleCollapseToggle(resource._resource.id)}
      >
        <Grid
          container
          gap={{
            xs: 2,
            md: 1,
          }}
        >
          <Grid
            item
            xs={4}
            md={5}
            sx={{
              px: 1,
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Stack
              direction={"row"}
              gap={{
                xs: 1,
              }}
            >
              <Avatar size={32} />
              <Box>
                <Typography sx={{ fontSize: 14 }}>{fullname}</Typography>
                <Typography sx={{ color: "#666666", fontSize: 14 }}>
                  {company}
                </Typography>
              </Box>
              <ArrowDownIcon
                sx={{
                  width: "20px",
                  ml: {
                    xs: 1,
                    md: 0,
                  },
                  transform: isActive ? "rotate(-90deg)" : "rotate(90deg)",
                  transitionDelay: "all ease 0.25s",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={1} md={2}>
            <Typography
              sx={{
                ...textHeadStyle,
                textAlign: "center",
              }}
            >
              160 h
            </Typography>
          </Grid>
          <Grid item xs={1} md={2}>
            <Typography
              sx={{
                ...textHeadStyle,
                textAlign: "center",
              }}
            >
              {formatNumber(totalhour, { numberOfFixed: 2 })}h
            </Typography>
          </Grid>
          <Grid item xs={1} md={2}>
            <Typography
              sx={{
                ...textHeadStyle,
                textAlign: "center",
              }}
            >
              0 %
            </Typography>
          </Grid>
        </Grid>
        {parentBookings?.length === 0 && (
          <Button
            variant="text"
            startIcon={<PlusIcon />}
            sx={{
              color: "success.main",
            }}
            // startIcon={<AddIcon />}
            onClick={() => handleOpenCreate()}
          >
            {resourceT("schedule.action.addBooking")}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

const textHeadStyle = {
  fontSize: "14px",
  fontWeight: 400,
};

export default ResourceLabel;
