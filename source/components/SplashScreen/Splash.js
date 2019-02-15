import React, { Component } from 'react';
import { NetInfo, Alert, BackHandler, ActivityIndicator, Platform, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { INDICATOR_COLOR, INDICATOR_SIZE, OVERLAY_COLOR } from '../../../styles/common';
import { width, height, totalSize } from 'react-native-dimension';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import ApiController from '../../ApiController/ApiController';
@observer export default class Splash extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  static navigationOptions = { header: null };
  splash = async () => {
    let { orderStore } = Store;
    // API calling...
    this.setState({ loading: true })
    orderStore.settings = await ApiController.get('settings');
    console.log('settings=',orderStore.settings);
    if (orderStore.settings.success === true) {
      orderStore.statusbar_color = orderStore.settings.data.navbar_clr;
      this.props.navigation.replace('Drawer'); //MainScreen
      this.setState({ loading: false })
    } else {
      Toast.show('Check your internet and try again', Toast.LONG);
    }
  }
  componentWillMount(){
    if(NetInfo.isConnected){
       this.splash(true)
    }
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      (isConnected) => { isConnected ? this.splash(false) : this.alert() }
    );
  }
  alert() {
    this.setState({ loading: true, alertStatus: true })
    Alert.alert(
      'No Internet',
      'Check your internet connection and try again',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // { text: 'Exit', onPress: () =>  this.exit()},
        { text: 'Retry', onPress: () => this.internetCheck() }
      ],
      { cancelable: false }
    )
  }
  exit = () => BackHandler.exitApp();
  internetCheck() {
    NetInfo.isConnected.fetch().then(isConnected => {
      (isConnected ? alert('Internet is connected') : this.alert());
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/bk_ground.jpg')} style={styles.imgCon}>
          <ImageBackground source={require('../../images/Downtown_Shadownew.png')} style={styles.imgCon}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Image source={require('../../images/splash_logo.png')} />
              <Text style={{ fontSize: totalSize(2.5), color: 'white', textAlign: 'center', marginHorizontal: 70, marginVertical: 5 }}>Find & Explore World Top Places</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              {
                this.state.loading === true ?
                  <ActivityIndicator size={INDICATOR_SIZE} color='#e52d27' animating={true} hidesWhenStopped={true} />
                  :
                  null
              }
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCon: {
    flex: 1,
    alignSelf: 'stretch',
  },
  imgConShadow: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
