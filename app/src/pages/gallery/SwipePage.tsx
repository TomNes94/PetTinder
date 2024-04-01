import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {getSessionById} from '../../api/session';
import {names} from '../../constants/names';
import {postLike} from '../../api/likes';
import SwipeGallery from '../../components/SwipeGallery';

const SwipePage = () => {
  const {data: sessionId} = useQuery({
    queryKey: ['sessionId'],
    queryFn: () => AsyncStorage.getItem('sessionId'),
  });
  const {data: userId} = useQuery({
    queryKey: ['userId'],
    queryFn: () => AsyncStorage.getItem('userId'),
  });

  const {data: session, isFetched} = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionById(sessionId ?? ''),

    enabled: !!sessionId,
  });

  const handleSwipeOff = (name: string) => {
    if (userId && sessionId) {
      postLike({
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
  //@ts-ignore
  const cards = names[session?.data.animalType][session?.data.gender];
  console.log(cards);
  return (
    <View style={styles.container}>
      <SwipeGallery cards={cards} onSwipe={handleSwipeOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 20, flex: 1, alignItems: 'center'},
});

export default SwipePage;
