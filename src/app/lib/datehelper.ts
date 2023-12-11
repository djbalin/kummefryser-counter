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

export function getDateDDMMYYYY(date: Date, verbose: boolean) {
  console.log(date);
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

export function formatLifespan(lifespan: number) {
  if (lifespan > 60) {
    return Math.round(lifespan / 30) + " months";
  } else {
    return lifespan + " days";
  }
}

export function getRemainingTime(expirationDate: Date): [number, string] {
  const daysLeft = Math.ceil(
    (expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysLeft > 60) {
    return [daysLeft, Math.round(daysLeft / 30) + " months"];
  } else {
    return [daysLeft, daysLeft + " days"];
  }
}
