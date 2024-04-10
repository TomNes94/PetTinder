import { StyleSheet, TextInput } from "react-native";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeInput = ({ code, setCode }: CodeInputProps) => {
  return (
    <TextInput
      maxLength={4}
      style={styles.input}
      value={code}
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="off"
      onChangeText={setCode}
    />
  );
};

const styles = StyleSheet.create({
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

export default CodeInput;
