import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "../store/Store";
import {PaperProvider} from "react-native-paper";

function RootLayout() {
    return(
        <Provider store={store}>
            <PaperProvider>
                <Stack>
                    <Stack.Screen name='index' options={{ headerTitle: 'Dashboard' }} />
                    <Stack.Screen name='customer' />
                    <Stack.Screen name='item' />
                </Stack>
            </PaperProvider>
        </Provider>
    )
}

export default RootLayout;