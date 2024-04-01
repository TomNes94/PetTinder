import {Text, View} from 'react-native';
import SwipeableCard from './SwipeCard';
import {useCallback, useState} from 'react';

interface SwipeGalleryProps {
  cards?: string[];
  onSwipe: (name: string) => void;
}

const SwipeGallery = ({cards: initialCards, onSwipe}: SwipeGalleryProps) => {
  const [cards, setCards] = useState<string[]>(initialCards ?? []);

  const handleSwipeOff = useCallback(
    (name: string) => {
      setCards(prev => prev.slice(1));
      onSwipe(name);
    },
    [onSwipe],
  );

  const name = cards[0];
  console.log(name);
  const onSwipeOffCallback = useCallback(() => {
    console.log(name);
    handleSwipeOff(name);
  }, [handleSwipeOff, name]);

  return (
    <View>
      {cards.length > 0 ? (
        <SwipeableCard name={name} onSwipeOff={onSwipeOffCallback}>
          <Text style={{fontSize: 30}}>{name}</Text>
        </SwipeableCard>
      ) : (
        <Text>No more cards</Text>
      )}
    </View>
  );
};

export default SwipeGallery;
