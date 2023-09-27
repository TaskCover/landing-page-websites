"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  IBookingAllFitler,
  getBookingAll,
} from "store/resourcePlanning/action";
import {
  DEFAULT_BOOKING_ALL_FILTER,
  EXAMPLE_DATA,
  TAB_TYPE,
  weekdays,
} from "./hepler";
import dayjs from "dayjs";
import { isEmpty, includes } from "lodash";
import FilterHeader from "./FilterHeader";
import { Box } from "@mui/system";
import { Button, Tooltip } from "components/shared";
import { Grid, Stack, Typography } from "@mui/material";
import Avatar from "components/Avatar";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { ResourceInput } from "@fullcalendar/resource";
import BlueArrowIcon from "icons/BlueArrowIcon";
import RedArrowIcon from "icons/RedArrowIcon";
import GrayArrowIcon from "icons/GrayArrowIcon";
import Image from "next/image";
import PlusIcon from "icons/PlusIcon";
import TimeHeader from "./TimeHeader";
import {
  useBookingAll,
  useResourceDate,
} from "store/resourcePlanning/selector";
import { NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";
import CreateBooking from "./modals/CreateBooking";
import ArrowDownIcon from "icons/ArrowDownIcon";
import { useFetchBookingAll } from "./hooks/useBookingAll";
import { IBookingListItem } from "store/resourcePlanning/reducer";
import {
  RESOURCE_ALLOCATION_TYPE,
  RESOURCE_ALLOCATION_UNIT,
  RESOURCE_EVENT_TYPE,
} from "constant/enums";
import useGetOptions, { useFetchOptions } from "./hooks/useGetOptions";
import useGetMappingTime from "./hooks/useGetMappingTime";
import EditBooking from "./modals/EditBooking";
import {
  formatEstimateTime,
  formatNumber,
  formatNumberHourToTime,
} from "utils/index";

const AllPeopleTab = () => {
  const resourceT = useTranslations<string>(NS_RESOURCE_PLANNING);
  const [filters, setFilters] = React.useState<IBookingAllFitler>(
    DEFAULT_BOOKING_ALL_FILTER,
  );
  const prevFilters = React.useRef<IBookingAllFitler>(
    DEFAULT_BOOKING_ALL_FILTER,
  );
  prevFilters.current = filters;

  const { mappedTimeSymbol } = useGetMappingTime();
  const { bookingAll, bookingAllFilter } = useBookingAll();
  const { selectedDate, updateDate } = useResourceDate();
  const [resources, setResources] = React.useState<IBookingListItem[]>([]);
  const calendarRef = React.useRef<FullCalendar>(null);
  const [selectedResource, setSelectedResource] = React.useState<string[]>([]);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState({
    isOpen: false,
    bookingId: "",
    isProject: true,
  });
  const generateDateRange = () => {
    const start_date = dayjs(filters?.start_date);
    const result: Array<Date> = [];
    let currentDate = start_date?.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
    const endOfWeek = start_date?.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

    while (
      currentDate.isBefore(endOfWeek) ||
      currentDate.isSame(endOfWeek, "day")
    ) {
      result.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }

    updateDate({
      dateRange: result,
      selectedDate,
    });
  };
  useFetchOptions();
  useFetchBookingAll();

  React.useEffect(() => {
    if (bookingAll) setResources(bookingAll);
  }, [bookingAll]);

  React.useEffect(() => {
    if (
      !isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
    }
  }, [filters?.start_date, filters?.end_date]);

  const totalhour = useMemo(() => {
    return resources.reduce((total, item) => {
      return total + item.total_hour;
    }, 0);
  }, [JSON.stringify(resources)]);

  const handleEventChange =
    (calendarRef: React.RefObject<FullCalendar>, isResize: boolean) =>
    ({ event, revert }) => {
      const { type } = event.extendedProps;
      if (isResize && type === "campaign") return revert();
      if (type === "campaign") {
        // Campaign has been moved, compute diff and update each steps
        if (!calendarRef.current) return null;
      } else if (type === "step") {
        // Step has been resized or move, update the campaign dates
        if (!calendarRef.current) return null;
        2;
      }
    };

  const handleCollapseToggle = (itemId: string) => {
    if (selectedResource.includes(itemId)) {
      setSelectedResource(selectedResource.filter((id) => id !== itemId));
    } else {
      setSelectedResource([...selectedResource, itemId]);
    }
    const collapseButton = document.querySelectorAll(
      `td[data-resource-id="${itemId}"][role="gridcell"] > div > div > span.fc-datagrid-expander`,
    ) as NodeListOf<HTMLElement>;
    if (collapseButton[0]) collapseButton[0].click();
  };

  const checkEventType = (value) => {
    switch (value) {
      case RESOURCE_EVENT_TYPE.PROJECT_BOOKING:
        return {
          icon: <BlueArrowIcon width={16} height={16} />,
          color: "#3699FFCC",
          background: "#EBF5FF",
        };
      case RESOURCE_EVENT_TYPE.TIME_OF_BOOKING:
        return {
          icon: <RedArrowIcon width={16} height={16} />,
          color: "rgba(246, 78, 96, 0.80);",
          background: "#FEEDED",
        };
      default:
        return {
          icon: <GrayArrowIcon width={16} height={16} />,
          color: "#BABCC6",
          background: "none",
        };
    }
  };
  const getEvents = () =>
    resources
      ?.map(
        ({ id, bookings, fullname }) =>
          bookings.map((props) => {
            const {
              id: eventId,
              start_date: from,
              end_date: to,
              booking_type,
              allocation,
              position,
              allocation_type,
              total_hour,
            } = props;

            return {
              resourceId: eventId.toString(),
              start: dayjs(from).toDate(),
              end: dayjs(to).toDate(),
              allDay: true,
              type: "step",
              campaignId: id,
              position,
              name: fullname,
              allocation,
              allocation_type,
              total_hour,
              eventType: booking_type,
              eventId,
            };
          }),
        // .concat([
        //   {
        //     resourceId: id,
        //     start: dayjs(filters?.start_date).toDate(),
        //     end: dayjs(filters?.end_date).toDate(),
        //     allDay: true,
        //     type: "campaign",
        //     campaignId: id,
        //     name: fullname,
        //     position: {},
        //     allocation: 0,
        //     allocation_type: "",
        //     total_hour: 0,
        //     eventType: RESOURCE_EVENT_TYPE.PROJECT_BOOKING,
        //     eventId: id,
        //   },
        // ]),
      )
      .flat();

  const getResources = () =>
    resources?.map((resource) => ({
      ...resource,
      children: resource?.bookings.map((booking) => ({
        id: booking?.id,
        name: booking?.project?.name,
        type: "step",
        eventType: booking?.booking_type,
        note: booking?.note,
        position: booking?.position,
      })),
    }));

  const mappedResources = getResources();
  const mappedEvents = getEvents();

  useGetOptions();
  return (
    <Stack direction="column" rowGap={2}>
      <FilterHeader type={TAB_TYPE.ALL} />
      <TimeHeader
        filters={filters}
        setFilters={setFilters}
        calendarRef={calendarRef}
      />
      <Box
        overflow="scroll"
        sx={{
          "& .custom-header": {
            "& .fc-scrollgrid-sync-inner": {
              width: "100%!important",
            },
          },
          "& .fc-datagrid-cell-cushion": { padding: "0!important" },
          "& .fc-datagrid-cell": {},
          "& .fc-event-resizable": {
            background: "none!important",
            border: "none!important",
          },
          "& .fc-datagrid-cell-frame": {
            // height: 'auto!important',
          },
          "& .fc-icon, & .fc-datagrid-expander-placeholder, & .fc-datagrid-expander":
            {
              display: "none!important",
            },
          "& td.fc-day-sun, & td.fc-day-sat": {
            borderBottom: "none!important",
            background: "#FAFAFA!important",
          },
          "& th.fc-day-sun, & th.fc-day-sat": {
            background: "#FAFAFA!important",
          },
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimeline"
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          resourceAreaWidth={660}
          resourceOrder="from"
          weekends={true}
          editable={true}
          eventResourceEditable={true}
          headerToolbar={false}
          duration={{ weeks: 1 }}
          slotDuration={{
            days: 1,
          }}
          resources={mappedResources as ResourceInput}
          events={mappedEvents as ResourceInput}
          slotLabelContent={(arg) => {
            const date = dayjs(arg?.date);
            const weekday = weekdays[date.day()];
            const isSelected = dayjs(date.format("YYYY-MM-DDDD")).isSame(
              dayjs().format("YYYY-MM-DDDD"),
            );
            // const isWeekend = date.get('d') === 1 || date.get('d') === 5;
            return (
              <Stack direction="column">
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    fontWeight: 400,
                    textAlign: "left",
                    color: isSelected ? "#1BC5BD" : "#212121",
                  }}
                >
                  {weekday}
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "14px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: isSelected ? "#1BC5BD" : "#212121",
                  }}
                >
                  {date.isValid() && date.format("DD")}
                </Typography>
              </Stack>
            );
          }}
          resourceAreaHeaderClassNames="custom-header"
          resourceAreaHeaderContent={(resrouce) => {
            return (
              <Grid
                container
                gap={{
                  xs: 3,
                  md: 1,
                }}
                sx={{ width: 1 }}
              >
                <Grid item xs={3} md={5} />
                <Grid item xs={1} md={2}>
                  <Typography sx={{ ...textHeadStyle, color: "#666" }}>
                    {resourceT("schedule.resourceHeader.available")}
                  </Typography>
                  <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>
                    160 h
                  </Typography>
                </Grid>
                <Grid item xs={1} md={2}>
                  <Typography sx={{ ...textHeadStyle, color: "#666" }}>
                    {resourceT("schedule.resourceHeader.schedule")}
                  </Typography>
                  <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>
                    {formatNumberHourToTime(totalhour)}
                    {/* {formatNumber(totalhour, { numberOfFixed: 2 })}h */}
                  </Typography>
                </Grid>
                <Grid item xs={1} md={2}>
                  <Typography sx={{ ...textHeadStyle, color: "#666" }}>
                    {`${resourceT(
                      "schedule.resourceHeader.schedule",
                    )}/${resourceT("schedule.resourceHeader.available")}`}
                  </Typography>
                  <Typography sx={{ ...textHeadStyle, fontWeight: 600 }}>
                    0 %
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
          resourceLabelContent={({ resource }) => {
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

            const isActive = includes(selectedResource, resource._resource.id);

            const parentResource = resources.find(
              (item) => item.id === resource._resource.parentId,
            );
            const bookings = parentResource
              ? [...parentResource?.bookings]
              : [];

            const isLastItem =
              bookings.pop()?.id === resource._resource.id ||
              bookings.length === 0;

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
                      <Typography
                        sx={{ fontSize: 14, lineBreak: "auto", width: 1 }}
                      >
                        {eventType === RESOURCE_EVENT_TYPE.PROJECT_BOOKING
                          ? name
                          : note}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12, lineBreak: "auto", width: 1 }}
                      >
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
                      onClick={() => setIsOpenCreate(true)}
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
                      xs: 3,
                      md: 1,
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      md={5}
                      sx={{
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        columnGap: 1,
                      }}
                    >
                      <Avatar size={32} />
                      <Box>
                        <Typography sx={{ fontSize: 14 }}>
                          {fullname}
                        </Typography>
                        <Typography sx={{ color: "#666666", fontSize: 14 }}>
                          {company}
                        </Typography>
                      </Box>
                      <ArrowDownIcon
                        sx={{
                          width: "20px",
                          ml: 2,
                          transform: isActive
                            ? "rotate(-90deg)"
                            : "rotate(90deg)",
                          transitionDelay: "all ease 0.25s",
                        }}
                      />
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
                      onClick={() => setIsOpenCreate(true)}
                    >
                      {resourceT("schedule.action.addBooking")}
                    </Button>
                  )}
                </Grid>
              </Grid>
            );
          }}
          eventContent={({ event }) => {
            const { eventType, allocation_type, allocation, eventId } =
              event.extendedProps;

            const checkedEventType = checkEventType(eventType);
            const day = dayjs(event.end).diff(dayjs(event.start), "days");

            let unit;
            switch (allocation_type) {
              case RESOURCE_ALLOCATION_UNIT.HOUR_PER_DAY:
                unit = mappedTimeSymbol[RESOURCE_ALLOCATION_TYPE.HOUR_PER_DAY];
                break;
              case RESOURCE_ALLOCATION_UNIT.HOUR:
                unit = " " + mappedTimeSymbol[RESOURCE_ALLOCATION_TYPE.HOUR];
                break;
              default:
                unit = mappedTimeSymbol[RESOURCE_ALLOCATION_TYPE.PERCENTAGE];
                break;
            }
            return (
              <Stack
                className="fc-event-title fc-sticky"
                direction="row"
                sx={{
                  border: `1px solid ${checkedEventType.color}`,
                  display: "flex!important",
                  width: 1,
                  borderRadius: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: checkedEventType.background,
                }}
                onClick={() =>
                  setIsOpenEdit({
                    isOpen: true,
                    isProject:
                      eventType === RESOURCE_EVENT_TYPE.PROJECT_BOOKING,
                    bookingId: eventId,
                  })
                }
              >
                {checkedEventType.icon}
                <Tooltip
                  title={resourceT("schedule.time.eventTime", {
                    day,
                    allocation,
                    unit,
                  })}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#BABCC6",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      px: 1,
                      mr: "auto",
                    }}
                  >
                    {resourceT("schedule.time.eventTime", {
                      day,
                      allocation,
                      unit,
                    })}
                  </Typography>
                </Tooltip>

                <Stack
                  sx={{
                    transform: "rotate(180deg)",
                  }}
                >
                  {checkedEventType.icon}
                </Stack>
              </Stack>
            );
          }}
          eventResize={handleEventChange(calendarRef, true)}
          // eventDrop={handleEventChange(calendarRef, false)}
        />
      </Box>
      <CreateBooking
        onClose={() => setIsOpenCreate(false)}
        open={isOpenCreate}
      />
      {/* <EditBooking
        isProject={isOpenEdit.isProject}
        bookingId={isOpenEdit.bookingId}
        onClose={() =>
          setIsOpenEdit({
            isOpen: false,
            isProject: true,
            bookingId: "",
          })
        }
        open={isOpenEdit.isOpen}
      /> */}
    </Stack>
  );
};

const textHeadStyle = {
  fontSize: "14px",
  fontWeight: 400,
};

export default AllPeopleTab;
