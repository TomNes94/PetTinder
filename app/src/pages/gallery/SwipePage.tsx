import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import {getSessionById} from '../../api/session';
import SwipeableCard from '../../components/SwipeCard';
import {useState} from 'react';
import {names} from '../../constants/names';
import {postLike} from '../../api/likes';

const SwipePage = () => {
  const {data: sessionId} = useQuery(['sessionId'], () =>
    AsyncStorage.getItem('sessionId'),
  );
  const {data: userId} = useQuery(['userId'], () =>
    AsyncStorage.getItem('userId'),
  );

  const {data: session, isFetched} = useQuery(
    ['session', sessionId],
    () => getSessionById(sessionId ?? ''),
    {
      enabled: !!sessionId,
    },
  );

  const [cards, setCards] = useState<string[]>(
    session?.data
      ? //@ts-ignore
        names[session?.data.animalType][session?.data.gender]
      : null,
  ); // Example card data

  const handleSwipeOff = (name: string) => {
    setCards(prevCards => prevCards.slice(1));
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

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        <SwipeableCard onSwipeOff={() => handleSwipeOff(cards[0])}>
          <Text style={{fontSize: 30}}>{cards[0]}</Text>
        </SwipeableCard>
      ) : (
        <Text>No more cards</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 20, flex: 1, alignItems: 'center'},
});

export default SwipePage;
