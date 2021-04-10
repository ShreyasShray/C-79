import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookRequestScreen from '../screens/BookRequest';
import BookDonateScreen from '../screens/BookDonate';
import {Image} from 'react-native';

export const TabNavigator = createBottomTabNavigator({
    DonateBooks:{screen:BookDonateScreen,
        navigationOptions:{
            tabBarIcon:<Image style={{width:40, height:40}} source={require("../assets/request-list.png")}></Image>,
            tabBarLabel:"Donate Books"
        }
    },
    RequestBooks:{screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:<Image style={{width:40, height:40}} source={require("../assets/request-book.png")} ></Image>,
            tabBarLabel:"Book Request"
        }
    }
});