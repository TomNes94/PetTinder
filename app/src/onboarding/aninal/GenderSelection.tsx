import {StyleSheet, View} from 'react-native';
import OptionButton from './OptionButton';
import FemaleImage from '../../assets/female.png';
import MaleImage from '../../assets/male.png';

interface GenderSelectionProps {
  setSelectedGender: (category: 'female' | 'male') => void;
  selectedGender: 'female' | 'male' | null;
}

const GenderSelection = ({
  selectedGender,
  setSelectedGender,
}: GenderSelectionProps) => {
  return (
    <View style={styles.iconRow}>
      <OptionButton
        color="pink"
        image={FemaleImage}
        selected={selectedGender === 'female'}
        onPress={() => setSelectedGender('female')}
      />
      <OptionButton
        color="blue"
        image={MaleImage}
        selected={selectedGender === 'male'}
        onPress={() => setSelectedGender('male')}
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

export default GenderSelection;
