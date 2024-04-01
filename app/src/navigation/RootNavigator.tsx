import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnimalOnboardingPage from '../onboarding/aninal/AnimalOnboardingPage';
import ConnectionPage from '../pages/onboarding/ConnectionPage';
import NameOnboardingPage from '../pages/onboarding/NameOnboardingPage';
import SwipePage from '../pages/gallery/SwipePage';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSessionById} from '../api/session';
import {ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const enum Pages {
  ANIMAL_ONBOARDING = 'AnimalOnboarding',
  NAME_ONBOARDING = 'NameOnboarding',
  CONNECTION = 'Connection',
  SWIPE = 'Swipe',
}

export type RootStackParamList = {
  [Pages.ANIMAL_ONBOARDING]: undefined;
  [Pages.NAME_ONBOARDING]: undefined;
  [Pages.CONNECTION]: {code: string | null};
  [Pages.SWIPE]: undefined;
};

const RootNavigator = () => {
  const {data: sessionId, isLoading} = useQuery({
    queryKey: ['sessionId'],
    queryFn: () => AsyncStorage.getItem('sessionId'),
  });
  const {data: userId} = useQuery({
    queryKey: ['userId'],
    queryFn: () => AsyncStorage.getItem('userId'),
  });

  const {data: session, isLoading: isLoadingSession} = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionById(sessionId ?? ''),

    enabled: !!sessionId,
  });
  if (isLoading || (isLoadingSession && !!sessionId)) {
    return <ActivityIndicator />;
  }

  const user =
    !userId || !session
      ? null
      : session?.data.users?.addressee?.id === userId
        ? session.data.users.addressee
        : session?.data.users?.requester?.id === userId
          ? session?.data.users?.requester
          : null;

  const initialRouteName = !sessionId
    ? Pages.ANIMAL_ONBOARDING
    : !user
      ? Pages.NAME_ONBOARDING
      : user.id === session?.data.users.requester.id &&
          !session?.data.users?.addressee
        ? Pages.CONNECTION
        : Pages.SWIPE;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
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
            initialParams={{code: session?.data.code}}
            component={ConnectionPage}
          />
          <Stack.Screen name={Pages.SWIPE} component={SwipePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;
