const monthNames: Map<number, string> = new Map();
monthNames.set(0, "January");
monthNames.set(1, "February");
monthNames.set(2, "March");
monthNames.set(3, "April");
monthNames.set(4, "May");
monthNames.set(5, "June");
monthNames.set(6, "July");
monthNames.set(7, "August");
monthNames.set(8, "September");
monthNames.set(9, "October");
monthNames.set(10, "November");
monthNames.set(11, "December");

export function addDaysToDate(startDate: Date, lifespanInDays: number): Date {
  const endDate = new Date(startDate.getTime());
  endDate.setDate(endDate.getDate() + lifespanInDays);
  return endDate;
}

export function getDateDDMMYYYY(date: Date, verbose: boolean) {
  const paddedDate: string =
    date.getDate() < 10 ? "0" + date.getDate() : `${date.getDate()}`;
  const paddedMonth: string =
    date.getMonth() < 10 ? "0" + date.getMonth() : `${date.getMonth()}`;
  if (verbose) {
    return `${paddedDate} ${monthNames
      .get(date.getMonth())
      ?.substring(0, 3)} ${date.getFullYear()}`;
  } else {
    return `${paddedDate}-${paddedMonth}-${date.getFullYear()}`;
  }
}
export function getDateYYYYMMDD(date: Date) {
  return date.toISOString().split("T")[0];
}

export function formatDateToReadable(lifespanInDays: number) {
  if (lifespanInDays > 60) {
    return Math.round(lifespanInDays / 30) + " months";
  } else {
    return lifespanInDays + " days";
  }
}

export function getDaysLeftUntilDate(targetDate: Date) {
  const daysLeft = Math.ceil(
    (targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysLeft;
}

// export function getRemainingTime(expirationDate: Date): [number, string] {
//   const daysLeft = getDaysLeftUntilDate(expirationDate);
//   if (daysLeft > 60) {
//     return [daysLeft, Math.round(daysLeft / 30) + " months"];
//   } else {
//     return [daysLeft, daysLeft + " days"];
//   }
// }
