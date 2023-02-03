interface ITime {
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  dayMonthYear: string;
}

export function getTimeWeight(timeProps: ITime) {
  const time = timeProps.time;
  const dayMonthYear = timeProps.dayMonthYear.split(':');
  const day = Number(dayMonthYear[0]);
  const month = Number(dayMonthYear[1]) + 1;
  const year = Number(dayMonthYear[2]);

  const isLeap = year % 4 === 0 ? true : false;
  let days: number = 0;
  days += day;
  const monthsHave31 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let i = 0; i < year; i++) {
    if (i % 4 === 0) {
      days += 366;
    } else {
      days += 365;
    }
  }
  for (let i = 0; i < month - 1; i++) {
    if (!isLeap) {
      days += monthsHave31[i];
    } else {
      if (i === 1) {
        days += 29;
      }
    }
  }
  const timeWeight =
    days * 24 * 60 * 60 +
    Number(time.hours) * 60 * 60 +
    Number(time.minutes) * 60 +
    Number(time.seconds);
  return timeWeight;
}
export function getToday() {
  const date = new Date();
  const currentDate = `${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`;
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  return {
    time: {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    },
    dayMonthYear: currentDate,
  };
}
export function checkDate(timeProps: ITime) {
  const currentDate = getToday();
  const currentDayWeight =
    Number(currentDate.time.hours) * 60 * 60 +
    Number(currentDate.time.minutes) * 60 +
    Number(currentDate.time.seconds);
  const defaultDayWeight = 172800;
  const currentDateWeight = getTimeWeight(currentDate);
  const chatDateWeight = getTimeWeight(timeProps);

  let resultDate =
    currentDateWeight - chatDateWeight < currentDayWeight
      ? `${timeProps.time.hours}:${timeProps.time.minutes}`
      : `yesterday`;

  if (
    currentDateWeight - chatDateWeight >
    currentDayWeight + defaultDayWeight
  ) {
    const dateTemp = timeProps.dayMonthYear.split(':');
    const day = Number(dateTemp[0]) < 10 ? `0${dateTemp[0]}` : dateTemp[0];
    const month =
      Number(dateTemp[1]) < 10
        ? `0${Number(dateTemp[1]) + 1}`
        : Number(dateTemp[1]) + 1;
    resultDate = `${day}/${month}/${dateTemp[2]}`;
  }

  return resultDate;
}
