import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { IBookingAllFitler } from "store/resourcePlanning/action";
import {
  DEFAULT_BOOKING_ALL_FILTER,
  EXAMPLE_DATA,
  TAB_TYPE,
  weekdays,
} from "./helper";
import dayjs from "dayjs";
import { isEmpty, includes } from "lodash";
import { Box } from "@mui/system";
import { Grid, Stack, Typography } from "@mui/material";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { ResourceInput } from "@fullcalendar/resource";
import BlueArrowIcon from "icons/BlueArrowIcon";
import RedArrowIcon from "icons/RedArrowIcon";
import GrayArrowIcon from "icons/GrayArrowIcon";
import PlusIcon from "icons/PlusIcon";
import TimeHeader from "./components/TimeHeader";
import {
  useBookingAll,
  useMyBooking,
  useResourceDate,
} from "store/resourcePlanning/selector";
import { NS_RESOURCE_PLANNING } from "constant/index";
import { useTranslations } from "next-intl";
import CreateBooking from "./modals/CreateBooking";
import { IBookingItem, IBookingListItem } from "store/resourcePlanning/reducer";
import { useFetchBookingAll, useFetchMyBooking } from "./hooks/useBookingAll";
import useGetMappingTime from "./hooks/useGetMappingTime";
import { formatEstimateTime, formatNumber } from "utils/index";
import EditBooking from "./modals/EditBooking";
import ResourceLabel from "./components/ResourceLabel";
import EventContents from "./components/EventContents";
import { useAuth } from "store/app/selectors";
import { RESOURCE_EVENT_TYPE } from "constant/enums";
import useGetOptions from "./hooks/useGetOptions";
import FilterHeader from "./components/FilterHeader";
import SlotLabelContent from "./components/SlotLabelContent";
import ResourceHeaderContent from "./components/ResourceHeaderContent";
import useTheme from "hooks/useTheme";
import { TIME_OFF_TYPE } from "components/sn-sales/helpers";
import { Button } from "components/shared";

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
  const { user } = useAuth();
  const { getMyBooking, myBooking, setMyBookingFilter } = useMyBooking();
  const [resources, setResources] = React.useState<IBookingItem[]>([]);
  const calendarRef = React.useRef<FullCalendar>(null);
  const [selectedResource, setSelectedResource] = React.useState<string[]>([]);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const { palette } = useTheme();
  const [parentResource, setParentResource] = React.useState<string>("");
  const { updateBooking } = useBookingAll();
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

  useFetchMyBooking();

  useEffect(() => {
    if (filters) {
      setMyBookingFilter(filters);
      setSelectedResource([]);
    }
  }, [filters]);

  React.useEffect(() => {
    if (myBooking) {
      setResources(myBooking);
      setSelectedResource([user?.id as string]);
    }
  }, [myBooking]);

  React.useEffect(() => {
    if (
      !isEmpty(filters) &&
      dayjs(filters?.start_date).isValid() &&
      dayjs(filters?.end_date).isValid()
    ) {
      generateDateRange();
    }
  }, [filters?.start_date, filters?.end_date]);

  const handleEventChange =
    (calendarRef: React.RefObject<FullCalendar>, isResize: boolean) =>
    ({ event, revert }) => {
      const { type, saleId, ...restData } = event.extendedProps;
      if (isResize && type === "campaign") return revert();
      if (type === "campaign") {
        // Campaign has been moved, compute diff and update each steps
        if (!calendarRef.current) return null;
      } else if (type === "step") {
        // Step has been resized or move, update the campaign dates
        if (!calendarRef.current) return null;
        const dateRange = event._instance.range;

        updateBooking(
          {
            ...restData,
            end_date: dayjs(dateRange.end).format("YYYY-MM-DD"),
            start_date: dayjs(dateRange.start).format("YYYY-MM-DD"),
            booking_type: restData.eventType,
            time_off_type: restData.time_off_type,
            sale_id: saleId,
            user_id: user?.id,
          },
          restData.eventId,
        );
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

  const getEvents = useCallback(
    () =>
      resources.map((props: IBookingItem) => {
        const {
          id: eventId,
          start_date: from,
          end_date: to,
          booking_type,
          allocation,
          position,
          allocation_type,
          sale_id,
          project_id,
          project,
          time_off_type,
          total_hour,
        } = props;

        return {
          resourceId: (project_id && `${user?.id}.${project_id}`) || eventId,
          start: dayjs(from).toDate(),
          end: dayjs(to).toDate(),
          allDay: true,
          type: "step",
          position,
          allocation,
          allocation_type,
          total_hour,
          eventType: booking_type,
          name: project?.name,
          saleId: sale_id,
          time_off_type,
          eventId,
        };
      }) as ResourceInput,
    [JSON.stringify(resources)],
  );
  // TODO: remove if label has no content
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
  //     eventType: RESOURCE_EVENT_TYPE.PROJECT_BOOKING,
  //     eventId: id,
  //   },
  // ]),

  const getResources = useCallback(() => {
    const result =
      resources?.map((resource: IBookingItem) => ({
        ...resource,
        name: resource?.project?.name,
        id:
          (resource?.project_id &&
            `${resource.user_id}.${resource?.project_id}`) ||
          resource?.id,
        type: "step",
        eventType: resource?.booking_type,
        // children: resource?.bookings?.map((booking) => ({
        //   id: booking?.id,
        //   name: booking?.project?.name,
        //   type: "step",
        //   eventType: booking?.booking_type,
        //   note: booking?.note,
        //   position: booking?.position,
        // })),
      })) || [];
    if (resources?.length > 0) {
      result.push({
        id: "end",
        name: "",
        allocation: 0,
        allocation_type: "percent",
        booking_type: "project",
        created_time: "",
        note: "",
        eventType: "end",
        end_date: "",
        position: {},
        user_id: "",
        project: {},
        project_id: "",
        sale_id: "",
        start_date: "",
        time_off_type: TIME_OFF_TYPE.OTHER,
        type: "step",
        total_hour: 160,
      });
    }
    return [
      {
        id: user?.id,
        fullname: user?.fullname,
        company: user?.company,
        total_hour: 160,
        bookings: result,
        children: result,
      },
    ];
  }, [JSON.stringify(resources)]);

  const totalhour = useMemo(() => {
    return resources.reduce((total, item) => {
      return total + item.total_hour;
    }, 0);
  }, [JSON.stringify(resources)]);

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
      maxHeight: "70vh!important",
    },
    "& .fc-datagrid-cell-cushion": { padding: "0!important" },
    "& .fc-datagrid-cell": {},
    "& .fc-event-resizable": {
      background: "none!important",
      border: "none!important",
    },
    "& .fc-datagrid-cell-frame": {
      // height: "auto!important",
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
      <FilterHeader type={TAB_TYPE.MY} />
      <TimeHeader
        filters={filters}
        setFilters={setFilters}
        calendarRef={calendarRef}
      />
      <Box overflow="scroll" sx={{ ...defaultStyle }}>
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
            return <SlotLabelContent arg={arg} />;
          }}
          resourceAreaHeaderClassNames="custom-header"
          resourceAreaHeaderContent={(resource) => {
            return (
              <ResourceHeaderContent
                totalhour={totalhour}
                resource={resource}
              />
            );
          }}
          resourceLabelContent={({ resource }) => {
            // const bookings = parentResource?.bookings || [];
            const isLastItem =
              resources[resources.length - 1]?.id === resource._resource.id;
            if (resource._resource.id === "end") {
              return (
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
              );
            }

            return (
              <ResourceLabel
                setParentResource={setParentResource}
                handleCollapseToggle={handleCollapseToggle}
                isLastItem={isLastItem}
                resource={resource}
                resources={resources}
                isMybooking={true}
                selectedResource={selectedResource}
                setIsOpenCreate={setIsOpenCreate}
                totalhour={totalhour}
              />
            );
          }}
          eventContent={({ event }) => {
            return (
              <EventContents event={event} setIsOpenEdit={setIsOpenEdit} />
            );
          }}
          eventResize={handleEventChange(calendarRef, true)}
          eventDrop={handleEventChange(calendarRef, false)}
        />
      </Box>
      <CreateBooking
        resourceId={parentResource}
        onClose={() => setIsOpenCreate(false)}
        open={isOpenCreate}
      />
      {/* Wait for the edit funcion is confirmed */}
      <EditBooking
        open={isOpenEdit.isOpen}
        bookingId={isOpenEdit.bookingId}
        isProject={isOpenEdit.isProject}
        onClose={() =>
          setIsOpenEdit({
            isOpen: false,
            isProject: true,
            bookingId: "",
          })
        }
      />
    </Stack>
  );
};

export default MyScheduleTab;
