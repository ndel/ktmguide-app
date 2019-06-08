import React, {Component} from 'react';
import {Platform,StatusBar,I18nManager,NetInfo,BackHandler,Alert} from 'react-native';
import Route from './source/MainRoute/Route';
import { MenuProvider } from 'react-native-popup-menu';
import store from './source/Stores/orderStore';
import Store from './source/Stores';
import ApiController from './source/ApiController/ApiController';
import { nav_header_color } from './styles/common';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
        color: 'black',
        loading: false
    };
    I18nManager.forceRTL(false);
  }
  fucn  () {
    var timerId = setInterval(()=>{ 
      if (store.statusbar_color !== null) {
           // this.setState({ loading: false })
            clearInterval(timerId);
      } else {
        console.warn('app.js')
      }
     }, 5000);
  }
  componentDidMount(){
    setTimeout(()=>{ this.setState({ color: store.statusbar_color }) },9000)
  }
  // splash = async () => {
  //   let { orderStore } = Store;
  //   // API calling...
  //   this.setState({ loading: true })
  //   orderStore.settings = await ApiController.get('settings');
  //   if (orderStore.settings.success === true) {
  //       orderStore.statusbar_color = orderStore.settings.data.navbar_clr;
  //       this.setState({ loading: false })
  //   } else {
  //       this.setState({ loading: false })
  //   }
  // }
  // componentWillMount=async()=>{
  //   if(NetInfo.isConnected){
  //      await this.splash()
  //   }else{
  //     this.alert()
  //   }
  // }
  // componentDidMount() {
  //   NetInfo.isConnected.addEventListener(
  //     'connectionChange',
  //     (isConnected) => { isConnected ? this.splash(false) : this.alert() }
  //   );
  // }
  // alert() {
  //   // this.setState({ loading: true })
  //   Alert.alert(
  //     'No Internet',
  //     'Check your internet connection and try again',
  //     [
  //       // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //       // { text: 'Exit', onPress: () =>  this.exit()},
  //       { text: 'Retry', onPress: () => this.internetCheck() }
  //     ],
  //     { cancelable: false }
  //   )
  // }
  // exit = () => BackHandler.exitApp();
  // internetCheck() {
  //   NetInfo.isConnected.fetch().then(isConnected => {
  //     (isConnected ? this.splash() : this.alert());
  //   });
  // }
  render() {
    return (
      <MenuProvider>
        <StatusBar
          hidden = {false}
          animated = {true}
          backgroundColor= { this.state.color }
          barStyle="light-content"
          networkActivityIndicatorVisible = {Platform.OS === 'ios'? false:false}
          showHideTransition = {Platform.OS === 'ios'? 'slide':null}
        />
        <Route />
      </MenuProvider>
    );
  }
}
