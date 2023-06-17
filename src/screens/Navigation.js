import React, { useEffect, useState } from 'react'
import { useChatGpt } from 'react-native-chatgpt';
import Chat from './BottomTabs/Chat';
import Login from './Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './BottomTabs/Home';
import Profile from './BottomTabs/Profile';

const Navigation = () => {

    const { status } = useChatGpt();
    const [auth, setAuth] = useState(false)
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function MyTabs() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                {auth ?
                    <>
                        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: (props) => <Icon name={"home"} color={props.focused ? '#3dabeb' : 'gray'} size={28} /> }} />
                        <Tab.Screen name="Chat" component={Chat} options={{ tabBarIcon: (props) => <Icon name={"comments"} color={props.focused ? '#3dabeb' : 'gray'} size={28} /> }} />
                        <Tab.Screen name="Session" component={Profile} options={{ tabBarIcon: (props) => <Icon name={"user"} color={props.focused ? '#3dabeb' : 'gray'} size={28} /> }} />
                    </>
                    : <Tab.Screen name="Home" component={Login} />}
            </Tab.Navigator>
        );
    }

    useEffect(() => {
        if (status == "authenticated") {
            setAuth(true)
        }
    }, [status])

    return (
        // <Stack.Navigator>
        //     {auth ?
        //         <>
        //             <Stack.Screen name="Home" component={Home} />
        //             <Stack.Screen name="Chat" component={Chat} />
        //         </>
        //         : <Stack.Screen name="Home" component={Login} />}
        // </Stack.Navigator>
        <>
            {MyTabs()}
        </>
    )


}

export default Navigation