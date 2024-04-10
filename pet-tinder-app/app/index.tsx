import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

import { useUserIdQuery } from "@/src/gallery/hooks";
import { useSessionByIdQuery, useSessionIdQuery } from "@/src/onboarding/hooks";

export default function Index() {
  const { data: sessionId, isLoading } = useSessionIdQuery();
  console.log(sessionId);
  const { data: userId } = useUserIdQuery();
  const { data: session, isLoading: isLoadingSession } = useSessionByIdQuery(sessionId ?? null);
  if (isLoading || (isLoadingSession && !!sessionId)) {
    return <ActivityIndicator />;
  }

  const user =
    !userId || !session
      ? null
      : session?.data.users?.addressee?.id === userId
        ? session.data.users.addressee
        : session?.data.users?.requester?.id === userId
          ? session?.data.users?.requester
          : null;

  const initialRouteName = !sessionId
    ? "(onboarding)/animal"
    : !user
      ? "(onboarding)/name"
      : user.id === session?.data.users.requester.id && !session?.data.users?.addressee
        ? "(onboarding)/connection"
        : "(gallery)/swipe";

  return <Redirect href={`/${initialRouteName}`} />;
}
