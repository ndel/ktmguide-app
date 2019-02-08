import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW } from '../../../styles/common';
import { createStackNavigator,createBottomTabNavigator,createTabNavigator,DrawerActions } from 'react-navigation';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import ReceiveReview from './ReceiveReview';
import SubmitReview from './SubmitReview';
// export const DashboardStack = createStackNavigator({
//     Dashboard: Dashboard,
//     MyProfile: MyProfile,
//     EditProfile: EditProfile
//
//  });
export default createTabNavigator({
    ReceiveReview: ReceiveReview,
    SubmitReview: SubmitReview
  },
 {
   order: ['ReceiveReview','SubmitReview'],
   initialRouteName: 'ReceiveReview',
   tabBarPosition: 'bottom',
   removeClippedSubviews: true,
   animationEnabled: true,
   swipeEnabled: true,
   showIcon: false,
   animationEnabled: true,
   lazy: true,
   backBehavior: true,
   tabBarOptions: {
     activeTintColor: COLOR_SECONDARY,
     inactiveTintColor: COLOR_GRAY,
     allowFontScaling: true,
     scrollEnabled: true,
     showIcon: false,
     upperCaseLabel: false,
     pressColor: COLOR_ORANGE,
     labelStyle: {
       fontFamily: FONT_NORMAL,
       fontSize: totalSize(1.7),
       // textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
       // padding:0
     },
     tabStyle: {
       width:width(50)
       // justifyContent: 'center',
       // alignItems: 'center',
     },
     style: {
       backgroundColor: COLOR_PRIMARY,
     },
     indicatorStyle: {
       borderColor: COLOR_ORANGE,
       borderWidth:2,
     },
   },
 }
);
