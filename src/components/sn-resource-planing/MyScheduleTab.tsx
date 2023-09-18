import FullCalendar from "@fullcalendar/react";
import React from "react";
import { IBookingAllFitler } from "store/resourcePlanning/action";
import { DEFAULT_BOOKING_ALL_FILTER, EXAMPLE_DATA, weekdays } from "./hepler";
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
import PlusIcon from "icons/PlusIcon";
import TimeHeader from "./TimeHeader";
import { useResourceDate } from "store/resourcePlanning/selector";
import { NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";

const MyScheduleTab = () => {
  const resourceT = useTranslations<string>(NS_RESOURCE_PLANNING);
  const [filters, setFilters] = React.useState<IBookingAllFitler>(
    DEFAULT_BOOKING_ALL_FILTER,
  );
  const prevFilters = React.useRef<IBookingAllFitler>(
    DEFAULT_BOOKING_ALL_FILTER,
  );

  prevFilters.current = filters;

  const { selectedDate, updateDate } = useResourceDate();
  const [resources, setResources] = React.useState<typeof EXAMPLE_DATA>([]);
  const calendarRef = React.useRef<FullCalendar>(null);
  const [selectedResource, setSelectedResource] = React.useState<string[]>([]);

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

  React.useEffect(() => {
    setResources(EXAMPLE_DATA);
  }, []);

  React.useEffect(() => {
    if (
      !isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
      // dispatch(getMyTimeTracking(filters));
    }
  }, [filters?.start_date, filters?.end_date]);

  const handleEventChange =
    (calendarRef: React.RefObject<FullCalendar>, isResize: boolean) =>
    ({ event, revert }) => {
      const { type } = event.extendedProps;
      if (isResize && type === "campaign") return revert();
      if (type === "campaign") {
        // Campaign has been moved, compute diff and update each steps
        if (!calendarRef.current) return null;
        // const diff = event.start.getTime() - oldEvent.start.getTime();
        // calendarRef.current
        //   .getApi()
        //   .getEvents()
        //   .filter(
        //     (currentEvent: {
        //       extendedProps: { type: any; campaignId: any };
        //     }) => {
        //       const { type: currEventType, campaignId: currEventCampaignId } =
        //         currentEvent.extendedProps;
        //       return (
        //         currEventType === 'step' && currEventCampaignId === campaignId
        //       );
        //     }
        //   )
        //   .forEach(
        //     (campaignEvent: {
        //       start: any;
        //       end: any;
        //       setDates: (arg0: Date, arg1: Date) => void;
        //     }) => {
        //       const start = campaignEvent.start;
        //       const end = campaignEvent.end;
        //       campaignEvent.setDates(
        //         new Date(start.getTime() + diff),
        //         new Date(end.getTime() + diff)
        //       );
        //     }
        //   );
      } else if (type === "step") {
        // Step has been resized or move, update the campaign dates
        if (!calendarRef.current) return null;
        // const campaignEvent = calendarRef.current
        //   .getApi()
        //   .getEvents()
        //   .find(
        //     ({ extendedProps: evt }) =>
        //       evt.type === 'campaign' && evt.campaignId === campaignId
        //   );
        // const { first, last } = calendarRef.current
        //   .getApi()
        //   .getEvents()
        //   .filter(
        //     (currentEvent: {
        //       extendedProps: { type: any; campaignId: any };
        //     }) => {
        //       const { type: currEventType, campaignId: currEventCampaignId } =
        //         currentEvent.extendedProps;
        //       return (
        //         currEventType === 'step' && currEventCampaignId === campaignId
        //       );
        //     }
        //   )
        //   .reduce(
        //     (
        //       acc: {
        //         first: { start: { getTime: () => number } } | null;
        //         last: { end: { getTime: () => number } } | null;
        //       },
        //       evt: {
        //         start: { getTime: () => number };
        //         end: { getTime: () => number };
        //       }
        //     ) => {
        //       return {
        //         first:
        //           acc.first === null ||
        //           acc.first.start.getTime() > evt.start.getTime()
        //             ? evt
        //             : acc.first,
        //         last:
        //           acc.last === null ||
        //           acc.last.end.getTime() < evt.end.getTime()
        //             ? evt
        //             : acc.last,
        //       };
        //     },
        //     { first: null, last: null }
        //   );
        // if (campaignEvent) campaignEvent.setDates(first.start, last.end);
      }
    };
  const checkEventType = (value) => {
    switch (value) {
      case "PROJECT_BOOKING":
        return {
          icon: <BlueArrowIcon width={16} height={16} />,
          color: "rgba(54, 153, 255, 0.80)",
          background: "rgba(225, 240, 255, 0.70)",
        };
      case "OFF_TIME":
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
      .map(
        ({
          id,
          name: campaignName,
          from: campaignFrom,
          to: campaignTo,
          steps,
        }) =>
          steps
            .map(({ id: eventId, name, from, to, eventType }) => ({
              resourceId: eventId.toString(),
              start: from,
              end: to,
              allDay: true,
              type: "step",
              campaignId: id,
              name,
              eventType,
              eventId,
            }))
            .concat([
              {
                resourceId: id,
                start: campaignFrom,
                end: campaignTo,
                allDay: true,
                type: "campaign",
                name: campaignName,
                campaignId: id,
                eventId: 1,
                eventType: "",
              },
            ]),
      )
      .flat();

  const getResources = () =>
    resources.map((resource) => ({
      ...resource,
      name: resource?.name,
      children: resource?.steps.map((step) => ({
        id: step?.id,
        name: step?.name,
        type: "step",
        eventType: step?.eventType,
      })),
    }));

  const mappedResources = getResources();
  const mappedEvents = getEvents();
  return (
    <Stack direction="column" rowGap={2}>
      <FilterHeader />
      <TimeHeader
        filters={filters}
        setFilters={setFilters}
        calendarRef={calendarRef}
      />
      <Box
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
          resourcesInitiallyExpanded={true}
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
          resourceAreaHeaderContent={() => {
            return (
              <Grid
                container
                gap={{
                  xs: 3,
                  md: 1,
                }}
                sx={{ width: 1 }}
              >
                <Grid item xs={2} md={5} />
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
                    40 h
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
            const { name, type, fullname } = resource.extendedProps;

            const isActive = includes(selectedResource, resource._resource.id);
            if (type === "step")
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
                    <Typography
                      sx={{ fontSize: 14, lineBreak: "auto", width: 1 }}
                    >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} />
                  <Button
                    variant="text"
                    startIcon={<PlusIcon />}
                    sx={{
                      color: "success.main",
                    }}
                    // startIcon={<AddIcon />}
                    // onClick={() => setIsOpenCreate(true)}
                  >
                    {resourceT("schedule.action.addBooking")}
                  </Button>
                </Grid>
              );
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
                  // onClick={() => handleCollapseToggle(resource._resource.id)}
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
                      xs={2}
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
                          UI/UX
                        </Typography>
                      </Box>
                      <Box
                        component="img"
                        sx={{
                          width: "20px",
                          ml: 2,
                          transform: isActive
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
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
                        40 h
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
                </Grid>
              </Grid>
            );
          }}
          eventContent={({ event }) => {
            const { eventType } = event.extendedProps;
            const checkedEventType = checkEventType(eventType);
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
              >
                {checkedEventType.icon}
                <Tooltip
                  title={resourceT("schedule.time.eventTime", {
                    day: dayjs(event.end).diff(dayjs(event.start), "days"),
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
                      day: dayjs(event.end).diff(dayjs(event.start), "days"),
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
    </Stack>
  );
};

const textHeadStyle = {
  fontSize: "14px",
  fontWeight: 400,
};

export default MyScheduleTab;
