import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pages, RootStackParamList} from '../navigation/RootNavigator';
import {View, Text} from 'react-native';

type ConnectionPageProps = NativeStackScreenProps<
  RootStackParamList,
  Pages.CONNECTION
>;

const ConnectionPage = ({route}: ConnectionPageProps) => {
  const code =
    route.params.code ?? (Math.random() + 1).toString(36).substring(4);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30}}>{code}</Text>
    </View>
  );
};

export default ConnectionPage;
