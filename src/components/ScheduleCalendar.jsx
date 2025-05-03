// /components/ScheduleCalendar.jsx
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo } from 'react';
import { format, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

const localizer = momentLocalizer(require('moment'));

export default function ScheduleCalendar({ scheduleText }) {
  // Step 1: Parse the Gemini response into events
  const events = useMemo(() => {
    const lines = scheduleText.trim().split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.match(/^\d{4}-\d{2}-\d{2}:$/)) {
        const dateStr = line.replace(":", "").trim();
        const taskLine = lines[i + 1]?.trim().replace(/^"|"$/g, ''); // remove quotes
        result.push({
          title: taskLine,
          start: parseISO(dateStr),
          end: parseISO(dateStr),
          allDay: true
        });
        i++; // skip next line (already used)
      }
    }
    return result;
  }, [scheduleText]);

  return (
    <div style={{ height: '600px', margin: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'agenda']}
        defaultView="month"
        popup
      />
    </div>
  );
}
