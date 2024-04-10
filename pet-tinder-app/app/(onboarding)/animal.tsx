import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { type AnimalType, type Gender } from "@/src/gallery/swipe.constant";
import AnimalSelection from "@/src/onboarding/animal/components/AnimalSelection";
import CodeInput from "@/src/onboarding/animal/components/CodeInput";
import GenderSelection from "@/src/onboarding/animal/components/GenderSelection";
import {
  useSessionByCodeMutation,
  useSessionCodeMutation,
  useSessionIdMutation,
  useSessionMutation,
} from "@/src/onboarding/hooks";

const AnimalOnboardingPage = () => {
  const [selectedGender, setSelectedGender] = useState<null | Gender>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | AnimalType>(null);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");

  const createSessionMutation = useSessionMutation();
  const setSessionIdMutation = useSessionIdMutation();
  const setSessionCodeMutation = useSessionCodeMutation();

  const sessionByCodeMutation = useSessionByCodeMutation();

  const canSubmit = Boolean(selectedCategory && selectedGender) || code.length === 4;

  const handleSubmit = async () => {
    if (code) {
      const session = await sessionByCodeMutation.mutateAsync(code);
      await setSessionIdMutation.mutateAsync(session.data.id);
      router.push("/(onboarding)/name");
    } else {
      if (!selectedGender || !selectedCategory) {
        return;
      }
      const newCode = (Math.random() + 1).toString(36).substring(4, 8);
      const response = await createSessionMutation.mutateAsync({
        code: newCode,
        gender: selectedGender,
        animalType: selectedCategory,
      });

      await setSessionIdMutation.mutateAsync(response.data.id);
      setSessionCodeMutation.mutate(newCode);

      router.push("/(onboarding)/name");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose gender and animal</Text>
      <View style={styles.main}>
        {showCodeInput ? (
          <CodeInput code={code} setCode={setCode} />
        ) : (
          <>
            <AnimalSelection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <View style={styles.spacer} />
            <GenderSelection selectedGender={selectedGender} setSelectedGender={setSelectedGender} />
          </>
        )}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.codeContainer}
          onPress={() => {
            setShowCodeInput(true);
          }}
        >
          <Text style={styles.codeButton}>I have a code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={[
            styles.button,
            {
              backgroundColor: canSubmit ? "#30c922" : "lightgrey",
            },
          ]}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: { alignItems: "center", paddingBottom: 20 },
  codeButton: { color: "blue", fontSize: 15 },
  container: { paddingTop: 20, flex: 1, alignItems: "center" },
  title: { fontSize: 25 },
  main: { flexGrow: 1, justifyContent: "center" },
  spacer: { height: 50 },
  buttonRow: { padding: 20 },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "gray",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: { fontSize: 25, color: "white" },
});

export default AnimalOnboardingPage;
