import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSession} from '../api/session';
import {Text} from 'react-native';

const SwipePage = () => {
  const {data: sessionId} = useQuery(['sessionId'], () =>
    AsyncStorage.getItem('sessionId'),
  );

  const {data: session} = useQuery(
    ['session', sessionId],
    () => getSession(sessionId ?? ''),
    {
      enabled: !!sessionId,
    },
  );
  return <Text>{session?.data.id}</Text>;
};

export default SwipePage;
