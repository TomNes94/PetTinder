import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pages, RootStackParamList} from '../navigation/RootNavigator';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';

type OnboardingPageProps = NativeStackScreenProps<
  RootStackParamList,
  Pages.ONBOARDING
>;

const OnboardingPage = ({navigation}: OnboardingPageProps) => {
  const [selectedGender, setSelectedGender] = useState<
    null | 'male' | 'female'
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<
    null | 'cat' | 'dog'
  >(null);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');

  console.log(!(selectedCategory && selectedGender) && code.length === 4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose gender and animal</Text>
      <View style={styles.main}>
        {showCodeInput ? (
          <TextInput
            maxLength={4}
            style={styles.input}
            value={code}
            autoCapitalize="characters"
            autoCorrect={false}
            autoComplete="off"
            onChangeText={setCode}
          />
        ) : (
          <>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => setSelectedCategory('cat')}
                style={[
                  styles.circle,
                  {borderColor: selectedCategory === 'cat' ? 'green' : 'black'},
                ]}>
                <Image
                  style={styles.animalIcon}
                  source={require('../assets/cat.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory('dog')}
                style={[
                  styles.circle,
                  {borderColor: selectedCategory === 'dog' ? 'green' : 'black'},
                ]}>
                <Image
                  style={styles.animalIcon}
                  source={require('../assets/dog.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.spacer} />
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => setSelectedGender('female')}
                style={[
                  styles.circle,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    borderColor:
                      selectedGender === 'female' ? 'green' : 'black',
                  },
                ]}>
                <Image
                  style={styles.femaleIcon}
                  source={require('../assets/female.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedGender('male')}
                style={[
                  styles.circle,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    borderColor: selectedGender === 'male' ? 'green' : 'black',
                  },
                ]}>
                <Image
                  style={styles.maleIcon}
                  source={require('../assets/male.png')}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.codeContainer}
          onPress={() => setShowCodeInput(true)}>
          <Text style={styles.codeButton}>I have a code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Pages.CONNECTION, {code: code ? code : null})
          }
          disabled={!(selectedCategory && selectedGender) && code.length !== 4}
          style={[
            styles.button,
            {
              backgroundColor:
                (selectedCategory && selectedGender) || code.length === 4
                  ? '#30c922'
                  : 'lightgrey',
            },
          ]}>
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
  maleIcon: {height: 75, width: 75, tintColor: 'blue'},
  femaleIcon: {height: 75, width: 75, tintColor: 'pink'},
  iconRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  codeContainer: {alignItems: 'center', paddingBottom: 20},
  codeButton: {color: 'blue', fontSize: 15},
  animalIcon: {height: 75, width: 75, tintColor: 'green'},
  container: {paddingTop: 20, flex: 1, alignItems: 'center'},
  title: {fontSize: 25},
  main: {flexGrow: 1, justifyContent: 'center'},
  spacer: {height: 50},
  buttonRow: {padding: 20},
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {fontSize: 25, color: 'white'},
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 10,
    width: 150,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default OnboardingPage;
