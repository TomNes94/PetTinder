import {ColorValue, Image, TouchableOpacity} from 'react-native';

interface OptionButtonProps {
  image: number;
  color: ColorValue;
  selected: boolean;
  onPress: () => void;
}

const OptionButton = ({image, color, selected, onPress}: OptionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.circle,
        {
          borderColor: selected ? 'green' : 'black',
        },
      ]}>
      <Image style={[styles.icon, {tintColor: color}]} source={image} />
    </TouchableOpacity>
  );
};
const styles = {
  icon: {
    height: 75,
    width: 75,
  },
  circle: {
    borderRadius: 75,
    padding: 20,
    borderWidth: 2,
    marginHorizontal: 20,
  },
};

export default OptionButton;
