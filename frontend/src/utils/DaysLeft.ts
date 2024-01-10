export default function DaysLeft(allotmentDate: string, days: number): number {
  // Parse the input date string to a Date object
  const startDate = new Date(allotmentDate);
  
  // Calculate the end date by adding the specified number of days
  const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in days
  const timeDifference = endDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

  return daysLeft;
}
