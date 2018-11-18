import  landingView  from "../../pages/landing"
import { createStackNavigator } from "react-navigation"

export const RootNav = createStackNavigator({
    landing: {
        screen: landingView,
        navigationOptions: ({ navigation }) => ({
            title: "TodoApp",
        }),
    }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#1E88E5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});