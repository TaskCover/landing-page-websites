"use client";

import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useMemo } from "react";
import {
  IBookingAllFitler,
  updateBookingResource,
} from "store/resourcePlanning/action";
import { DEFAULT_BOOKING_ALL_FILTER, TAB_TYPE } from "./hepler";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { Box } from "@mui/system";
import { Grid, Stack, Typography } from "@mui/material";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { ResourceInput } from "@fullcalendar/resource";
import TimeHeader from "./components/TimeHeader";
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
import ResourceLabel from "./components/ResourceLabel";
import EventContents from "./components/EventContents";
import { IBookingListItem } from "store/resourcePlanning/reducer";
import FilterHeader from "./components/FilterHeader";
import ResourceHeaderContent from "./components/ResourceHeaderContent";
import SlotLabelContent from "./components/SlotLabelContent";
import useTheme from "hooks/useTheme";
import EditBooking from "./modals/EditBooking";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import { useGetTotalScheduleTime } from "./hooks/useCalculateDetail";

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

  const { bookingAll, bookingAllFilter } = useBookingAll();
  const { selectedDate, updateDate } = useResourceDate();
  const [resources, setResources] = React.useState<IBookingListItem[]>([]);
  const calendarRef = React.useRef<FullCalendar>(null);
  const [selectedResource, setSelectedResource] = React.useState<string[]>([]);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const { palette, isDarkMode } = useTheme();
  const [parentResource, setParentResource] = React.useState<string>("");
  const { updateBooking } = useBookingAll();

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
    async ({ event, revert }) => {
      const { type, campaignId, saleId, ...restData } = event.extendedProps;
      if (isResize && type === "campaign") return revert();
      if (type === "campaign") {
        // Campaign has been moved, compute diff and update each steps
        if (!calendarRef.current) return null;
      } else if (type === "step") {
        // Step has been resized or move, update the campaign date
        if (!calendarRef.current) return null;
        const dateRange = event._instance.range;
        await updateBooking(
          {
            ...restData,
            user_id: campaignId,
            end_date: dayjs(dateRange.end).format("YYYY-MM-DD"),
            start_date: dayjs(dateRange.start).format("YYYY-MM-DD"),
            booking_type: restData.eventType,
            time_off_type: restData.time_off_type,
            sale_id: saleId,
          },
          restData.eventId,
        ).catch(() => revert());
        return null;
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
  const getEvents = useCallback(
    () =>
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
                time_off_type,
                user_id,
                sale_id,
                project_id,
              } = props;
              return {
                resourceId:
                  (project_id && `${user_id}.${project_id}`) || eventId,
                start: dayjs(from).toDate(),
                end: dayjs(to).toDate(),
                allDay: true,
                type: "step",
                campaignId: id,
                position,
                name: fullname,
                allocation,
                user_id,
                allocation_type,
                total_hour,
                time_off_type,
                saleId: sale_id,
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
        .flat(),
    [resources],
  );

  // convert the resource to resource content for render
  const getResources = useCallback(
    () =>
      resources?.map((resource) => ({
        ...resource,
        children: resource?.bookings.map((booking) => ({
          id:
            (booking?.project_id &&
              `${booking.user_id}.${booking?.project_id}`) ||
            booking?.id,
          name: booking?.project?.name,
          type: "step",
          eventType: booking?.booking_type,
          note: booking?.note,
          position: booking?.position,
          allocation: booking?.allocation,
          allocation_type: booking?.allocation_type,
          total_hour: booking?.total_hour,
          user_id: booking?.user_id,
          saleId: booking?.sale_id,
        })),
      })),
    [resources],
  );

  const mappedResources = getResources();

  const mappedEvents = getEvents();

  useGetOptions();

  const defaultStyle = {
    "& .custom-header": {
      "& .fc-scrollgrid-sync-inner": {
        width: "100%!important",
      },
    },
    "& .fc-media-screen": {
      maxHeight: "65vh!important",
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
      background: palette.grey[50],
    },
    "& th.fc-day-sun, & th.fc-day-sat": {
      background: palette.grey[50],
    },
  };
  return (
    <Stack direction="column" rowGap={2}>
      <FilterHeader type={TAB_TYPE.ALL} />
      <TimeHeader
        filters={filters}
        setFilters={setFilters}
        calendarRef={calendarRef}
      />
      <Box sx={{ ...defaultStyle, overflowX: "scroll" }}>
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
          eventDurationEditable={true}
          headerToolbar={false}
          selectable={true}
          selectMirror={true}
          eventDragStart={(arg) => {
            const { event } = arg;
            if (event.extendedProps.type === "campaign") {
              return false;
            }
          }}
          duration={{ weeks: 1 }}
          select={(arg) => {
            const { start, end } = arg;
            const start_date = dayjs(start).format("YYYY-MM-DD");
            const end_date = dayjs(end).format("YYYY-MM-DD");
            const resource = resources.find(
              (item) => item.id === selectedResource[0],
            );
            // if (!resource) return;
            // const { id, fullname } = resource;
            // updateBookingResource({
            //   id,
            //   start_date,
            //   end_date,
            // });
            setIsOpenCreate(true);
          }}
          slotDuration={{
            days: 1,
          }}
          resources={mappedResources as ResourceInput}
          events={mappedEvents as ResourceInput}
          slotLabelContent={(arg) => {
            // Content label for each slot on calendar
            return <SlotLabelContent arg={arg} />;
          }}
          resourceAreaHeaderClassNames="custom-header"
          resourceAreaHeaderContent={(resrouce) => {
            return (
              <ResourceHeaderContent
                resource={resrouce}
                totalhour={totalhour}
              />
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

            let totalBookingHours = 0;
            if (!resource._resource.parentId) {
              totalBookingHours =
                resources.find((item) => item.id === resource._resource.id)
                  ?.total_hour || 0;
            }
            // Content on the resource as a label
            return (
              <ResourceLabel
                handleCollapseToggle={handleCollapseToggle}
                resource={resource}
                resources={resources}
                isLastItem={isLastItem}
                selectedResource={selectedResource}
                totalhour={totalBookingHours}
                setParentResource={setParentResource}
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
          eventDrop={handleEventChange(calendarRef, false)}
        />
      </Box>
      <CreateBooking
        onClose={() => setIsOpenCreate(false)}
        open={isOpenCreate}
        resourceId={parentResource}
      />

      {/* TODO: wait for confirm the edit function */}
      <EditBooking
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
      />
    </Stack>
  );
};

export default AllPeopleTab;
