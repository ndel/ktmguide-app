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
import styles from '../../../styles/UserDashboardStyles/DashboardStyleSheet';
import Active from './Active';
import Pending from './Pending';
import Featured from './Featured';
import Expired from './Expired';
export default class ListingTabCon extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
    }
    I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{flex:1}}>
        {/*<View style={styles.overlyHeader}>
          <TouchableOpacity style={styles.drawerBtnCon} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../images/drawerBtn.png')} style={styles.drawerBtn} />
          </TouchableOpacity>
          <View style={styles.headerTxtCon}>
            <Text style={styles.headerTxt}>DownTown</Text>
          </View>
          <Image source={require('../../images/search_white.png')} style={styles.headerSearch} />
          <Image source={require('../../images/cart.png')} style={styles.cart} />
        </View>*/}
        <Tab />
      </View>
    );
  }
}

const Tab =  createTabNavigator({
  Active: Active,
  Pending: Pending,
  Featured: Featured,
  Expired: Expired,
  },
 {
   // order: ['Description','Amenties','Location','User_Reviews','Write_A_Review'],
   initialRouteName: 'Active',
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
       // fontFamily: FONT_BOLD,
       fontSize: totalSize(1.6),
       // textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
       // padding:0
     },
     tabStyle: {
       width:width(28)
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
