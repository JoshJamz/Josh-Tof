import { useState } from 'react';

interface GoogleCalendarButtonProps {
  title: string;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM
  endTime: string; // Format: HH:MM
  description: string;
  location: string;
}

export default function GoogleCalendarButton({
  title,
  date,
  startTime,
  endTime,
  description,
  location,
}: GoogleCalendarButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Detect if user is on iOS (iPhone/iPad)
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  // Format date/time for iOS Calendar (.ics format)
  const formatDateTimeForICS = (date: string, time: string) => {
    const dateOnly = date.replace(/-/g, '');
    const timeOnly = time.replace(/:/g, '') + '00';
    return `${dateOnly}T${timeOnly}`;
  };

  // Generate .ics file content for iOS Calendar
  const generateICSFile = () => {
    const startDateTime = formatDateTimeForICS(date, startTime);
    const endDateTime = formatDateTimeForICS(date, endTime);
    const now = new Date();
    const dtstamp = formatDateTimeForICS(
      now.toISOString().split('T')[0], 
      now.toTimeString().split(' ')[0].substring(0, 5)
    );
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Movie Date Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@moviedate.com`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
  };

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    const formatDateTime = (date: string, time: string) => {
      const dateOnly = date.replace(/-/g, '');
      const timeOnly = time.replace(/:/g, '') + '00';
      return `${dateOnly}T${timeOnly}`;
    };

    const startDateTime = formatDateTime(date, startTime);
    const endDateTime = formatDateTime(date, endTime);

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startDateTime}/${endDateTime}`,
      details: description,
      location: location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleClick = () => {
    setIsAnimating(true);

    // Show animation for 1.5 seconds before opening calendar
    setTimeout(() => {
      if (isIOS()) {
        // For iOS devices - download .ics file to open in iOS Calendar
        const icsContent = generateICSFile();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'movie-date.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } else {
        // For other devices - open Google Calendar
        const calendarUrl = generateGoogleCalendarUrl();
        window.open(calendarUrl, '_blank', 'noopener,noreferrer');
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isAnimating}
        className="neo-calendar-button group relative bg-pink-500 px-10 py-5 text-xl font-black uppercase text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-70"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <span className="relative z-10">
          {isAnimating ? 'Saving Our Plan... 💕' : 'Add To Google Calendar 💗'}
        </span>
      </button>

      {/* Animation Overlay */}
      {isAnimating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-12 text-center">
            <div className="mb-6 text-6xl">📅</div>
            <p className="animate-pulse text-3xl font-bold text-pink-600">
              Saving our little plan 💕
            </p>
            
            {/* Floating Hearts Animation */}
            <div className="relative mt-8 h-20">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 animate-float-heart text-4xl"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    left: `${50 + (i - 2) * 10}%`,
                  }}
                >
                  💕
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
