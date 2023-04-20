const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export function getGreeting(): string {
  const day = new Date();
  const hr = day.getHours();
  if (hr >= 0 && hr < 12) {
    return "Morning";
  } else if (hr == 12) {
    return "Noon";
  } else if (hr >= 12 && hr <= 17) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

export function getCurrentDate(): string {
  const date = new Date();
  return date.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCurrentWeekDay(): string {
  const date = new Date();
  return date.toLocaleString("default", { weekday: "long" });
}

export function getCurrentTime(): string {
  const date = new Date();
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function getDateDisplayFormat(rawDate: string): string {
  const date = new Date(rawDate);

  return date.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const getDateTime = (dateTime: string | null): string => {
  if (!dateTime) {
    return "-";
  }
  const dateObject = new Date(dateTime);
  const date = dateObject.toLocaleString("default", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = dateObject.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${time}, ${date}`;
};

function tConvert(time: any) {
  // Check correct time format and split into components

  return time.join(''); // return adjusted time or original string
}

export const getDateTimeUTC = (dateTime: string | null): string => {
  if (!dateTime) {
    return "-";
  }
  const dateObject = new Date(dateTime);
  var month = dateObject.getUTCMonth();
  var day = dateObject.getUTCDate();
  var year = dateObject.getUTCFullYear();
  const date: any = `${monthNames[month]} ${day}, ${year}`;

  const utcTimeHour = dateObject.getUTCHours();
  const utcTimeMinutes = dateObject.getUTCMinutes();
  const hours = (utcTimeHour % 12) || 12;
  var AmOrPm = utcTimeHour >= 12 ? 'PM' : 'AM';
  var time = hours + ":" + (utcTimeMinutes < 10 ? `0${utcTimeMinutes}` : utcTimeMinutes) + " " + AmOrPm;
  return `${time}, ${date}`;
};

export function getDuration(time: number) {
  if (time < 60) {
    return Math.round(time) + "m";
  }
  let hours = time / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + " mins";
}

export function getDurationFromSeconds(totalSeconds: number) {
  if (totalSeconds < 60) {
    return "1 mins";
  }
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours + " h " + minutes + " mins";
}


export function getHoursFromSeconds(time: any) {
  if (isNaN(time)) {
    return time;
  }
  return Math.round(Number(time) / 3600).toFixed(1);
}