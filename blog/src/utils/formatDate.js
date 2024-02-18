export const formatDateDifference = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return "Just now";
  } else if (secondsDifference < 60 * 60) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < 60 * 60 * 24) {
    const hours = Math.floor(secondsDifference / (60 * 60));
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(secondsDifference / (60 * 60 * 24));
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
