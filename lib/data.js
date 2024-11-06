import { supabase } from "@/services/supabase";

// - get the count of like

// export const getLikeCounts = async (postId) => {
//   const { count, error } = await supabase
//     .from("likes")
//     .select("*", { count: "exact" })
//     .eq("post_id", postId);

//   if (error) {
//     console.error("Error while fetching data ", error);
//     return 0;
//   }

//   return count;
// };
