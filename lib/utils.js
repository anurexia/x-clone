import { formatDistance } from "date-fns";

export const formatDate = (created_at) => {
  if (!created_at) return ""; // Handle cases where created_at is null or undefined
  return formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
  });
};
