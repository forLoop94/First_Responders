import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import type { Event as RBCEvent } from "react-big-calendar";
import axios from "axios";
import { growl } from "../utils/growl";

const locales = {
  "en-US": enUS,
};

type VisitEvent = RBCEvent & {
  type: "doctor" | "nurse";
  tooltip: string;
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enUS }),
  getDay,
  locales,
});

const primaryColor =
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-primary"
  ) || "#3b82f6";

const secondaryColor =
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-secondary"
  ) || "#3b82f6";

const secondaryText =
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-secondary-content"
  ) || "#3b82f6";

const primaryText =
  getComputedStyle(document.documentElement).getPropertyValue(
    "--color-primary-content"
  ) || "#3b82f6";

function CustomToolbar(props: {
  onNavigate: (action: "PREV" | "NEXT" | "TODAY" | Date) => void;
  onView: (view: View) => void;
  label: string;
}) {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button className="btn btn-sm" onClick={() => props.onNavigate("PREV")}>
          Back
        </button>
        <button type="button" onClick={() => props.onNavigate("TODAY")}>
          Today
        </button>
        <button type="button" onClick={() => props.onNavigate("NEXT")}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{props.label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => props.onView("month")}>
          Month
        </button>
        <button type="button" onClick={() => props.onView("week")}>
          Week
        </button>
        <button type="button" onClick={() => props.onView("day")}>
          Day
        </button>
        <button type="button" onClick={() => props.onView("agenda")}>
          Agenda
        </button>
      </span>
    </div>
  );
}

const VisitCalendar = () => {
  const [events, setEvents] = useState<VisitEvent[]>();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  const eventStyleGetter = (event: VisitEvent) => {
    const backgroundColor =
      event.type === "doctor" ? primaryColor : secondaryColor;
    const color = event.type === "doctor" ? primaryText : secondaryText;
    return {
      style: {
        backgroundColor,
        color,
        border: "none",
        padding: "4px",
      },
    };
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/appointments",
        {
          withCredentials: true,
        }
      );

      const result = response.data;

      if (result.success) {
        const parsed = result.data.map((e: any) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
          type: e.type.toLowerCase(),
        }));
        setEvents(parsed);
        console.log("user fetch response:", events);
        growl(result.message, "success");
      } else {
        growl(result.message, "error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onNavigate = (newDate: Date | "PREV" | "NEXT" | "TODAY") => {
    if (newDate instanceof Date) {
      setDate(newDate);
    } else {
      // Handle PREV, NEXT, TODAY actions
      const currentDate = new Date(date);
      if (newDate === "PREV") {
        if (view === "month") {
          currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (view === "week") {
          currentDate.setDate(currentDate.getDate() - 7);
        } else {
          currentDate.setDate(currentDate.getDate() - 1);
        }
      } else if (newDate === "NEXT") {
        if (view === "month") {
          currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (view === "week") {
          currentDate.setDate(currentDate.getDate() + 7);
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else if (newDate === "TODAY") {
        currentDate.setTime(Date.now());
      }
      setDate(currentDate);
    }
  };

  const onView = (newView: View) => {
    setView(newView);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={view}
        onView={onView}
        date={date}
        onNavigate={onNavigate}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
          event: ({ event }) => {
            const tooltipId = `tooltip-${
              event.title
            }-${event.start?.getTime()}`;
            return (
              <>
                <div
                  data-tooltip-id={tooltipId}
                  data-tooltip-content={event.tooltip}
                >
                  {event.title}
                </div>
                <Tooltip id={tooltipId} place="top" />
              </>
            );
          },
        }}
        views={{
          month: true,
          week: true,
          day: true,
          agenda: true,
        }}
      />
    </div>
  );
};

export default VisitCalendar;
