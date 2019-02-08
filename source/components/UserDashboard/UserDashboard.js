import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList,TouchableHighlight
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/UserDashboardStyles/UserDashboardStyleSheet'
import { createStackNavigator,createBottomTabNavigator,TabNavigator,DrawerActions } from 'react-navigation';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
export default class UserDashboard extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {

    }
    I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Tab />
    );
  }
}
 const Tab =  TabNavigator({
   Dashboard: Dashboard,
   MyProfile: {
    screen: MyProfile,
     navigationOptions: {
      title: "My Profile",
     }
    },
   EditProfile: {
    screen: EditProfile,
     navigationOptions: {
      title: "Edit Profile",
      }
     },
   },
  {
    order: ['Dashboard','MyProfile','EditProfile'],
    initialRouteName: 'Dashboard',
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
        // width:width(50)
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
// <View style={{flex:1}}>
//   <View style={styles.overlyHeader}>
//     <TouchableOpacity style={styles.drawerBtnCon} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
//       <Image source={require('../../images/drawerBtn.png')} style={styles.drawerBtn} />
//     </TouchableOpacity>
//     <View style={styles.headerTxtCon}>
//       <Text style={styles.headerTxt}>DownTown</Text>
//     </View>
//     <Image source={require('../../images/search_white.png')} style={styles.headerSearch} />
//     <Image source={require('../../images/cart.png')} style={styles.cart} />
//   </View>
//   <Tab />
// </View>
