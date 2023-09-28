"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { IBookingAllFitler } from "store/resourcePlanning/action";
import {
  DEFAULT_BOOKING_ALL_FILTER,
  EXAMPLE_DATA,
  TAB_TYPE,
  weekdays,
} from "./hepler";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import FilterHeader from "./FilterHeader";
import { Box } from "@mui/system";
import { Grid, Stack, Typography } from "@mui/material";
import Avatar from "components/Avatar";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { ResourceInput } from "@fullcalendar/resource";
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
import { useFetchBookingAll } from "./hooks/useBookingAll";
import useGetOptions, { useFetchOptions } from "./hooks/useGetOptions";
import useGetMappingTime from "./hooks/useGetMappingTime";
import EditBooking from "./modals/EditBooking";
import {
  formatEstimateTime,
  formatNumber,
  formatNumberHourToTime,
} from "utils/index";
import ResourceLabel from "./components/ResourceLabel";
import EventContents from "./components/EventContents";
import { IBookingListItem } from "store/resourcePlanning/reducer";

export interface IEditState {
  isOpen: boolean;
  bookingId: string;
  isProject: boolean;
}

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
  const [isOpenEdit, setIsOpenEdit] = React.useState<IEditState>({
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

  // Toggle the resource
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

  // Convert resource bookings to event content for render
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
        // TODO: remove if the label has no info
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

  // convert the resource to resource content for render
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
            // Content label for each slot on calendar
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
            // Header content on the resource table
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
            const parentResource = resources.find(
              (item) => item.id === resource._resource.parentId,
            );
            const bookings = parentResource
              ? [...parentResource?.bookings]
              : [];
            const isLastItem =
              bookings.pop()?.id === resource._resource.id ||
              bookings.length === 0;

            // Content on the resource as a label
            return (
              <ResourceLabel
                handleCollapseToggle={handleCollapseToggle}
                resource={resource}
                resources={resources}
                isLastItem={isLastItem}
                selectedResource={selectedResource}
                totalhour={totalhour}
                setIsOpenCreate={setIsOpenCreate}
              />
            );
          }}
          eventContent={({ event }) => {
            // Content on calendar
            return (
              <EventContents event={event} setIsOpenEdit={setIsOpenEdit} />
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

      {/* TODO: wait for confirm the edit function */}
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
