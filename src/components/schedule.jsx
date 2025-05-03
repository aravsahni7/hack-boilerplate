import { useLocation } from 'react-router-dom';
import ScheduleCalendar from './ScheduleCalendar';

export default function SchedulePage() {
  const location = useLocation();
  const schoolInfo = location.state?.schoolInformation;

  const mockResponse = 
"2025-05-10:"
"Read Chapter 1 of Physics"

"2025-05-12:"
"Complete Math Assignment 1"
;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Study Schedule</h1>
      <p className="mb-4 text-gray-400">You submitted: <strong>{schoolInfo}</strong></p>
      {/* Replace mockResponse with actual API call later */}
      <ScheduleCalendar scheduleText={mockResponse} />
    </div>
  );
}