import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,I18nManager} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/LoginStyle'
import ApiController from '../../ApiController/ApiController';
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      language: false
    }
    // I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    headerTitle: "Login",
    // headerTitle: "تسجيل الدخول",
    headerStyle: {
      backgroundColor:'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign:'center'
    },
  };
  componentWillMount = async () => {
    let { orderStore } = Store;
    // orderStore.test = 'مرحبا اسامه';
    orderStore.test = 'hello usama';
    ApiController.msg('hello');
    let response = await ApiController.get('settings');
    console.log('response=',response);
    
  }
  render() {
    let { orderStore } = Store;
    return (
      <View style={styles.container}>
        {
          orderStore.test.length > 0?
            <View style={{height:height(10),backgroundColor:'gray',flexDirection:'row'}}>
             <View style={{flex:0.5,justifyContent:'center'}}>
              <Image source={require('../../images/msg.png') } />
             </View>
             <View style={{flex:0.5,justifyContent:'center'}}>
              <Text style={styles.text}>{orderStore.test}</Text>
             </View>
            </View>
            :
            <Text style={styles.text}>Welcome to Login</Text>
        }
      </View>
    );
  }
}
