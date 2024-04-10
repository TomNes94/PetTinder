import { useQuery } from "@tanstack/react-query";

import { getUserIdFromStore } from "./user.service";

export const useUserIdQuery = () => {
  const getUserIdQuery = useQuery({
    queryFn: getUserIdFromStore,
    queryKey: ["userId"],
  });

  return getUserIdQuery;
};
