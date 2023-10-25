import {SafeAreaView} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistQueryClient} from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 7,
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
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
