import React from 'react';
import {StyleSheet, Dimensions, Alert} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import Expo, {Notifications} from 'expo';

import registerForNotifications from './services/push_notification';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const SW = Dimensions.get('window').width;

export default class App extends React.Component {
    componentDidMount() {
        registerForNotifications();

        Notifications.addListener((notification) => {
            const {data: {text}, origin} = notification;

            if (origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{text: 'Ok.'}]
                );
            }
        });
    }

    render() {

        const MainNavigator = TabNavigator({
                welcome: {screen: WelcomeScreen},
                auth: {screen: AuthScreen},
                main: {
                    screen: TabNavigator({
                            map: {screen: MapScreen},
                            deck: {screen: DeckScreen},
                            review: {
                                screen: StackNavigator({
                                        review: {screen: ReviewScreen},
                                        settings: {screen: SettingsScreen}
                                    },
                                    {lazy: true, swipeEnabled: false, animationEnabled: false}
                                )
                            }
                        },
                        {
                            tabBarPosition: 'bottom',
                            swipeEnabled: false,
                            lazy: true, // Each screen will not mount/load until user clicks on them
                            animationEnabled: false,
                            tabBarOptions: {
                                labelStyle: {
                                    fontSize: 12
                                },
                                showIcon: true,
                                // iconStyle: {
                                //     width: 21,
                                //     height: 30
                                // }
                            }
                        }
                    )
                }
            },
            {
                navigationOptions: {
                    tabBarVisible: false
                },
                lazy: true,
                swipeEnabled: false,
                animationEnabled: false
            }
        );

        // return (
        //     <View style={styles.container}>
        //         <Text>Open up App.js to start working on your app!</Text>
        //     </View>
        // );

        return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
