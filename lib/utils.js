import { formatDistance, subDays } from "date-fns";

// 2 days ago
export const formatDate = (created_at) => {
  return formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
  });
};
