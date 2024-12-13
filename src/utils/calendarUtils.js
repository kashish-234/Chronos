export function getMonthData(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
  
    const monthData = [];
    let currentWeek = [];
  
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -i);
      currentWeek.unshift({
        date: prevMonthDay,
        isCurrentMonth: false,
        isToday: isSameDay(prevMonthDay, new Date())
      });
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentWeek.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: isSameDay(currentDate, new Date())
      });
  
      if (currentWeek.length === 7) {
        monthData.push(currentWeek);
        currentWeek = [];
      }
    }
  
    if (currentWeek.length > 0) {
      const daysToAdd = 7 - currentWeek.length;
      for (let i = 1; i <= daysToAdd; i++) {
        const nextMonthDay = new Date(year, month + 1, i);
        currentWeek.push({
          date: nextMonthDay,
          isCurrentMonth: false,
          isToday: isSameDay(nextMonthDay, new Date())
        });
      }
      monthData.push(currentWeek);
    }
  
    return monthData;
  }
  
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  
  export function exportEvents(events, currentDate, format) {
    const eventsArray = Object.entries(events).map(([date, eventList]) => ({
      date,
      events: eventList
    }));
  
    let content;
    let mimeType;
    let fileExtension;
  
    if (format === 'json') {
      content = JSON.stringify(eventsArray, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
    } else if (format === 'csv') {
      content = convertToCSV(eventsArray);
      mimeType = 'text/csv';
      fileExtension = 'csv';
    } else {
      throw new Error('Unsupported export format');
    }
  
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `events_${currentDate.getFullYear()}_${currentDate.getMonth() + 1}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function convertToCSV(eventsArray) {
    const header = 'Date,Event Name,Start Time,End Time,Description,Color\n';
    const rows = eventsArray.flatMap(({ date, events }) =>
      events.map(event =>
        `${date},${event.eventName},${event.startTime},${event.endTime},${event.description},${event.color}`
      )
    );
    return header + rows.join('\n');
  }
   