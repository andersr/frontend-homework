export const isPastDue = (dueDate: string) => {
  const now = new Date();
  const pastDueTime = new Date(dueDate).getTime();
  
  return pastDueTime < now.getTime();
}