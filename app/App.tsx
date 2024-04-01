import {Button, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistQueryClient} from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 7,
      retry: 1,
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
});
persistQueryClient({
  queryClient,
  persister: asyncStoragePersistor,
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigator />
        <TouchableOpacity
          onPress={() => AsyncStorage.clear()}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 25,
            right: 25,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}>
          <Text>Clear storage</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
