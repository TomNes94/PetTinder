import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { getSessionById } from "@/src/api/session";
import { putUser } from "@/src/api/user";
import { storeUserId } from "@/src/gallery/user.service";
import { useSessionIdQuery } from "@/src/onboarding/hooks";
import { getCodeFromStore } from "@/src/session/code.service";

const NameOnboardingPage = () => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const { data: sessionId } = useSessionIdQuery();
  const { data: code } = useQuery({
    queryKey: ["code"],
    queryFn: getCodeFromStore,
  });

  const { data: session } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => await getSessionById(sessionId ?? ""),
    enabled: !!sessionId,
  });

  const mutation = useMutation({
    mutationFn: putUser,
    onSuccess: async (data) => {
      await storeUserId(data.data.id);
      queryClient.setQueryData(["user"], data);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  if (!sessionId) {
    return null;
  }

  const handleContinuePress = async () => {
    await mutation.mutateAsync({
      name,
      sessionId,
    });
    console.log("code", code);
    if (session?.data.users.requester) {
      router.push("/(gallery)/swipe");
    } else if (code) {
      router.push("/(onboarding)/connection");
      router.setParams({ code });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your name?</Text>
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          value={name}
          autoCorrect={false}
          autoComplete="given-name"
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleContinuePress}
          disabled={!name}
          style={[
            styles.button,
            {
              backgroundColor: name ? "#30c922" : "lightgrey",
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
  circle: {
    borderRadius: 75,
    padding: 20,
    borderWidth: 2,
    marginHorizontal: 20,
  },
  maleIcon: { height: 75, width: 75, tintColor: "blue" },
  femaleIcon: { height: 75, width: 75, tintColor: "pink" },
  iconRow: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
  codeContainer: { alignItems: "center", paddingBottom: 20 },
  codeButton: { color: "blue", fontSize: 15 },
  animalIcon: { height: 75, width: 75, tintColor: "green" },
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
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
    width: 150,
    fontSize: 30,
    textAlign: "center",
  },
});

export default NameOnboardingPage;
