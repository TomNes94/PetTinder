import { StyleSheet, View } from "react-native";

import OptionButton from "./OptionButton";

import FemaleImage from "@/assets/images/female.png";
import MaleImage from "@/assets/images/male.png";
import { Gender } from "@/src/gallery/swipe.constant";

interface GenderSelectionProps {
  setSelectedGender: (category: Gender) => void;
  selectedGender: Gender | null;
}

const GenderSelection = ({ selectedGender, setSelectedGender }: GenderSelectionProps) => {
  return (
    <View style={styles.iconRow}>
      <OptionButton
        color="pink"
        image={FemaleImage}
        selected={selectedGender === Gender.Female}
        onPress={() => {
          setSelectedGender(Gender.Female);
        }}
      />
      <OptionButton
        color="blue"
        image={MaleImage}
        selected={selectedGender === Gender.Male}
        onPress={() => {
          setSelectedGender(Gender.Male);
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

export default GenderSelection;
