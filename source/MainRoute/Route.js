import React, { Component } from 'react';
import { Platform, StatusBar, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL, FONT_BOLD, COLOR_PRIMARY, COLOR_ORANGE, COLOR_GRAY, COLOR_SECONDARY, COLOR_TRANSPARENT_BLACK } from '../../styles/common';
import { createStackNavigator } from 'react-navigation';
import Splash from '../components/SplashScreen/Splash';
import MainScreen from '../components/MainScreen/MainScreen';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Home from '../components/Home/Home';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import FeatureDetail from '../components/FeatureDetail/FeatureDetail';
import FeatureDetailTabBar from '../components/FeatureDetail/FeatureDetailTabBar';
import Discription from '../components/FeatureDetail/Description';
import UserDashboard from '../components/UserDashboard/UserDashboard';
import Drawer from '../components/Drawer/Drawer';
import SideMenu from '../components/Drawer/SideMenu';
import ContactUs from '../components/ContactUs/ContactUs';
import AboutUs from '../components/AboutUs/AboutUs';
import EditProfile from '../components/UserDashboard/EditProfile'
import ListingStack from '../components/Listing/ListingStack'
import blogStack from '../components/Blogs/Blogs';
import BlogDetail from '../components/Blogs/BlogDetail';
import PublicEvents from '../components/PublicEvents/PublicEvents';
import Packages from '../components/Packages/Packages';
import ReviewsCon from '../components/Reviews/ReviewsCon';
import SavedListing from '../components/SavedListing/SavedListing';
import AdvanceSearch from '../components/AdvanceSearch/AdvanceSearch';
import SearchingScreen from '../components/AdvanceSearch/SearchingScreen';
import EventsTabs from '../components/Events/EventsTabs';
import Categories from '../components/Categories/Categories';
import EventDetail from '../components/Events/EventDetail'
import { observer } from 'mobx-react';
import store from '../Stores/orderStore';
import styles from '../../styles/HeadersStyles/DrawerHeaderStyleSheet';
// const DrawerButton = (navigation) => (
//   <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}>
//     <Image
//       source={require('../images/drawerBtn.png')}
//       style={{
//         height: height(2.6),
//         width: width(15),
//         resizeMode: 'contain',
//         alignSelf: 'center'
//       }}
//     />
//   </TouchableOpacity>
// )
class Route extends Component<Props> {
    render(){
      return(
        <StatusBar
            hidden = {false}
            animated = {true}
            backgroundColor= 'red'
            barStyle="light-content"
            networkActivityIndicatorVisible = {Platform.OS === 'ios'? false:false}
            showHideTransition = {Platform.OS === 'ios'? 'slide':null}
          />
      );
    }
}
const RootStack = createStackNavigator(
  {
    Splash: Splash,
    Login: Login,
    MainScreen: MainScreen,
    SignUp: SignUp,
    SignIn: SignIn,
    Home: Home,
    ForgetPassword: ForgetPassword,
    FeatureDetail: FeatureDetail,
    Discription: Discription,
    FeatureDetailTabBar: FeatureDetailTabBar,
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('otherParam', store.settings.data.menu.home),
        header: (
          <View style={[styles.overlyHeader,{ backgroundColor: store.settings.data.navbar_clr }]}>
            <TouchableOpacity style={styles.drawerBtnCon} onPress={() => {
              // Alert.alert(navigation+'')
              navigation.toggleDrawer()
              // navigation.openDrawer()
            }}>
              <Image source={require('../images/drawer.png')} style={styles.drawerBtn} />
            </TouchableOpacity>
            <View style={styles.headerTxtCon}>
              <Text style={styles.headerTxt}>{navigation.getParam('otherParam', store.settings.data.menu.home)}</Text>
            </View>
            <Image source={require('../images/search_white.png')} style={styles.headerSearch} />
            <Image source={require('../images/cart.png')} style={styles.cart} />
          </View>
        )
      }),
    },
    SideMenu: SideMenu,
    UserDashboard: UserDashboard,
    ContactUs: ContactUs,
    AboutUs: AboutUs,
    EditProfile: EditProfile,
    ListingStack: ListingStack,
    Blogs: blogStack,
    BlogDetail: BlogDetail,
    Packages: Packages,
    ReviewsCon: {
      screen: ReviewsCon,
      navigationOptions: () => ({
        header: null
      }),
    },
    SavedListing: SavedListing,
    AdvanceSearch: AdvanceSearch,
    SearchingScreen: SearchingScreen,
    EventsTabs: EventsTabs,
    Categories: Categories,
    EventDetail: EventDetail
  },
  {
    initialRouteName: 'Splash',
    mode: Platform.OS === 'ios' ? 'pattern' : 'card',
    headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
    headerTransitionPreset: Platform.OS === 'ios' ? 'uikit' : null,
    headerLayoutPreset: Platform.OS === 'ios' ? 'center' : 'left',
    headerBackTitleVisible: Platform.OS === 'ios' ? true : false,
    navigationOptions: {
      headerTitleStyle: { fontSize: totalSize(2), fontWeight: 'normal' },
      gesturesEnabled: true,
    }
  }
);
export default RootStack;