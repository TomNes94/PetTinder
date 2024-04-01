import {StyleSheet, View} from 'react-native';
import OptionButton from './OptionButton';
import CatImage from '@/assets/cat.png';
import DogImage from '@/assets/dog.png';

interface AnimalSelectionProps {
  setSelectedCategory: (category: 'cat' | 'dog') => void;
  selectedCategory: 'cat' | 'dog' | null;
}

const AnimalSelection = ({
  selectedCategory,
  setSelectedCategory,
}: AnimalSelectionProps) => {
  return (
    <View style={styles.iconRow}>
      <OptionButton
        color="green"
        image={CatImage}
        selected={selectedCategory === 'cat'}
        onPress={() => setSelectedCategory('cat')}
      />
      <OptionButton
        color="green"
        image={DogImage}
        selected={selectedCategory === 'dog'}
        onPress={() => setSelectedCategory('dog')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
});

export default AnimalSelection;
