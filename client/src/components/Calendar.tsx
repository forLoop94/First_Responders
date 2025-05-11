// // VisitCalendar.jsx
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format } from "date-fns/format";
// import { parse } from "date-fns/parse";
// import { startOfWeek } from "date-fns/startOfWeek";
// import { getDay } from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useEffect, useState } from "react";
// // import ReactTooltip from "react-tooltip";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";
// import { enUS } from "date-fns/locale/en-US";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// export default function VisitCalendar() {
//   const [events, setEvents] = useState([
//     {
//       title: "Doctor Visit",
//       start: new Date("2025-05-18"),
//       end: new Date("2025-05-20"),
//       type: "doctor",
//       tooltip: "Dr. James with patient Mike",
//     },
//     {
//       title: "Nurse Visit",
//       start: new Date("2025-05-23"),
//       end: new Date("2025-05-23"),
//       type: "nurse",
//       tooltip: "Nurse Dianne with patient Chris",
//     },
//   ]);

//   // useEffect(() => {
//   //   // Fetch visit schedule from your API
//   //   fetch('/api/visits')
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       const transformed = data.map((visit) => ({
//   //         title: visit.title,
//   //         start: new Date(visit.date), // or visit.startDate
//   //         end: new Date(visit.date),   // assuming one-day visits
//   //         type: visit.type,            // 'doctor' or 'nurse'
//   //         tooltip: visit.tooltip,      // visit summary or patient name
//   //       }))
//   //       setEvents(transformed)
//   //     })
//   // }, [])

//   const eventStyleGetter = (event: any) => {
//     const backgroundColor = event.type === "doctor" ? "#007bff" : "#e83e8c";
//     return {
//       style: {
//         backgroundColor,
//         borderRadius: "6px",
//         color: "white",
//         border: "none",
//         padding: "4px",
//       },
//     };
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         eventPropGetter={eventStyleGetter}
//         defaultView="month"
//         views={["month", "week", "day", "agenda"]}
//         defaultDate={new Date()}
//         toolbar={true}
//         tooltipAccessor={null} // We'll use custom tooltips
//         components={{
//           event: ({ event }) => (
//             // <div data-tip={event.tooltip}>
//             //   {event.title}
//             //   <ReactTooltip place="top" type="dark" effect="solid" />
//             // </div>
//             <>
//               <div
//                 data-tooltip-id={`tooltip-${event.title}`}
//                 data-tooltip-content={event.tooltip}
//               >
//                 {event.title}
//               </div>
//               <Tooltip id={`tooltip-${event.title}`} place="top" />
//             </>
//           ),
//         }}
//       />
//     </div>
//   );
// }

import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import type { Event as RBCEvent } from "react-big-calendar";

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

export default function VisitCalendar() {
  const [events] = useState<VisitEvent[]>([
    {
      title: "Doctor Visit",
      start: new Date("2025-05-18"),
      end: new Date("2025-05-20"),
      type: "doctor",
      tooltip: "Dr. James with patient Mike",
    },
    {
      title: "Nurse Visit",
      start: new Date("2025-05-23"),
      end: new Date("2025-05-23"),
      type: "nurse",
      tooltip: "Nurse Dianne with patient Chris",
    },
  ]);
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
}
