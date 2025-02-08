import { View } from 'react-native';
import {PaperProvider} from "react-native-paper";
import {store} from "./store/Store";
import {Provider} from "react-redux";

export default function App() {
  return (
      <Provider store={store}>
          <PaperProvider>
              <View>
              </View>
          </PaperProvider>
      </Provider>
  );
}
