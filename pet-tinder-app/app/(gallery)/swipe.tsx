import { StyleSheet, View } from "react-native";

import { postLike } from "@/src/api/likes";
import SwipeGallery from "@/src/gallery/components/SwipeGallery";
import { useUserIdQuery } from "@/src/gallery/hooks";
import { names } from "@/src/gallery/swipe.constant";
import { useSessionByIdQuery, useSessionIdQuery } from "@/src/onboarding/hooks";

const SwipePage = () => {
  const { data: sessionId } = useSessionIdQuery();
  const { data: userId } = useUserIdQuery();

  const { data: session, isFetched } = useSessionByIdQuery(sessionId ?? null);

  const handleSwipeOff = async (name: string) => {
    if (userId && sessionId) {
      await postLike({
        like: true,
        name,
        sessionId,
        userId,
      });
    }
  };

  if (!isFetched || !session?.data) {
    return null;
  }
  const cards = names[session.data.animalType][session.data.gender];

  return (
    <View style={styles.container}>
      <SwipeGallery cards={cards} onSwipe={handleSwipeOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 20, flex: 1, alignItems: "center" },
});

export default SwipePage;
