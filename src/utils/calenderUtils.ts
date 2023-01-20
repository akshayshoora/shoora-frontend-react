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


export function getHoursFromSeconds(time: any) {
  if (isNaN(time)) {
    return time;
  }
  return Math.round(Number(time) / 3600).toFixed(1);
}