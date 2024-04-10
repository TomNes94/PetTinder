import { StyleSheet, View } from "react-native";

import OptionButton from "./OptionButton";

import CatImage from "@/assets/images/cat.png";
import DogImage from "@/assets/images/dog.png";
import { AnimalType } from "@/src/gallery/swipe.constant";

interface AnimalSelectionProps {
  setSelectedCategory: (category: AnimalType) => void;
  selectedCategory: AnimalType | null;
}

const AnimalSelection = ({ selectedCategory, setSelectedCategory }: AnimalSelectionProps) => {
  return (
    <View style={styles.iconRow}>
      <OptionButton
        color="green"
        image={CatImage}
        selected={selectedCategory === AnimalType.Cat}
        onPress={() => {
          setSelectedCategory(AnimalType.Cat);
        }}
      />
      <OptionButton
        color="green"
        image={DogImage}
        selected={selectedCategory === AnimalType.Dog}
        onPress={() => {
          setSelectedCategory(AnimalType.Dog);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
});

export default AnimalSelection;
