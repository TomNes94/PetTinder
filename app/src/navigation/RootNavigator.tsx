import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnimalOnboardingPage from '../onboarding/AnimalOnboardingPage';
import ConnectionPage from '../onboarding/ConnectionPage';
import NameOnboardingPage from '../onboarding/NameOnboardingPage';
import SwipePage from '../gallery/SwipePage';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSession} from '../api/session';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const enum Pages {
  ANIMAL_ONBOARDING = 'AnimalOnboarding',
  NAME_ONBOARDING = 'NameOnboarding',
  CONNECTION = 'Connection',
  SWIPE = 'Swipe',
}

export type RootStackParamList = {
  [Pages.ANIMAL_ONBOARDING]: undefined;
  [Pages.NAME_ONBOARDING]: {code: string | null};
  [Pages.CONNECTION]: {code: string | null};
  [Pages.SWIPE]: undefined;
};

const RootNavigator = () => {
  const {data: sessionId} = useQuery(['sessionId'], () =>
    AsyncStorage.getItem('sessionId'),
  );

  // const {data: session} = useQuery(
  //   ['session', sessionId],
  //   () => getSession(sessionId ?? ''),
  //   {
  //     // The query will not execute until the userId exists
  //     enabled: !!sessionId,
  //   },
  // );
  // console.log(session);
  // const initialRouteName = !sessionId
  //   ? Pages.ANIMAL_ONBOARDING
  //   : !session?.data.users.addressee?.id
  //   ? Pages.CONNECTION
  //   : Pages.SWIPE;

  return (
    <NavigationContainer>
      <Stack.Navigator /* initialRouteName={initialRouteName} */>
        <Stack.Screen
          name={Pages.ANIMAL_ONBOARDING}
          component={AnimalOnboardingPage}
        />
        <Stack.Screen
          name={Pages.NAME_ONBOARDING}
          component={NameOnboardingPage}
        />
        <Stack.Screen
          name={Pages.CONNECTION}
          // initialParams={{code: session?.data.code}}
          component={ConnectionPage}
        />
        <Stack.Screen name={Pages.SWIPE} component={SwipePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
