import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingPage from '../onboarding/OnboardingPage';
import ConnectionPage from '../onboarding/ConnectionPage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const enum Pages {
  ONBOARDING = 'Onboarding',
  CONNECTION = 'Connection',
}

export type RootStackParamList = {
  [Pages.ONBOARDING]: undefined;
  [Pages.CONNECTION]: {code: string | null};
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Pages.ONBOARDING}>
        <Stack.Screen name={Pages.ONBOARDING} component={OnboardingPage} />
        <Stack.Screen name={Pages.CONNECTION} component={ConnectionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
