import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,TextInput
} from 'react-native';
import { INDICATOR_COLOR,INDICATOR_SIZE,INDICATOR_VISIBILITY,OVERLAY_COLOR,TEXT_SIZE,TEXT_COLOR,ANIMATION } from '../../../styles/common';
import Spinner from 'react-native-loading-spinner-overlay';
import { width, height, totalSize } from 'react-native-dimension';
import Toast from 'react-native-simple-toast';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/ForgetPasswordStyle';
import ApiController from '../../ApiController/ApiController';
export default class ForgetPassword extends Component<Props> {
  constructor( props ) {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    super(props);
    this.state = {
      loading: false,
      email: '',
    }
    // I18nManager.forceRTL(data.is_rtl);
  }
  static navigationOptions = {
    header: null
  };
  forget = async() => {
    if (this.state.email.length===0) {
      Toast.show('Please enter your email');
    } else {
      this.setState({loading: true})
      let params = {
        email: this.state.email,
      }
      let response = await ApiController.post('forgot',params)
      console.log('forget password =',response);
      if (response.success===true) {
        this.setState({loading: false})
        this.props.navigation.navigate('SignIn')
      }else {
        this.setState({loading: false})
        Toast.show(response.message);
      }
    }
  }
  render() {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    if(this.state.loading == true){
      return(
          <View style={{height: height(100), width: width(100), flex:1}}>
              <Spinner
                visible={INDICATOR_VISIBILITY}
                textContent={data.loading_txt}
                size = {INDICATOR_SIZE}
                cancelable={true}
                color={ INDICATOR_COLOR }
                animation= {ANIMATION}
                overlayColor={ OVERLAY_COLOR }
                textStyle={{fontSize:totalSize(TEXT_SIZE),color: TEXT_COLOR}}
              />
          </View>
      );
   }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/bk_ground.jpg')} style={styles.imgCon}>
          <ImageBackground source={require('../../images/Downtown_Shadownew.png')} style={styles.imgCon}>
            <View style={{height:height(5),flexDirection:'row'}}>
              <TouchableOpacity style={styles.bckImgCon} onPress={()=>this.props.navigation.goBack()}>
                <Image source={require('../../images/back_btn.png')} style={styles.backBtn} />
              </TouchableOpacity>
              <View style={{flex:0.5,justifyContent:'flex-end',marginHorizontal: 10}}>
                <Text style={styles.headerTxt}>{ data.main_screen.reset_btn }</Text>
              </View>
            </View>
            <View style={styles.logoView}>
              <Image source={{uri: data.logo}} style={styles.logoImg}/>
              <Text style={styles.logoTxt}>{data.slogan}</Text>
            </View>
            <View style={styles.buttonView}>
              <View style={styles.btn} onPress={()=>{this.props.navigation.navigate('Login')}}>
                <View style={{flex:0.9}}>
                 <Image source={require('../../images/mail.png')} style={styles.mail} />
                </View>
                <View style={{flex:4.1}}>
                  <TextInput
                       onChangeText={(value) => this.setState({email: value})}
                       underlineColorAndroid='transparent'
                       placeholder= { data.main_screen.email_placeholder }
                       // placeholder='عنوان البريد الإلكتروني'
                       secureTextEntry={true}
                       placeholderTextColor='white'
                       keyboardType = 'email-address'
                       underlineColorAndroid='transparent'
                       autoCorrect={true}
                       style={styles.inputTxt}
                       />
                </View>
              </View>
              <TouchableOpacity style={[styles.signUpBtn,{backgroundColor: orderStore.settings.data.main_clr}]} onPress={()=>this.forget()}>
                <Text style={styles.signUpTxt}>{ data.main_screen.reset_btn }</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.expTxt}>{ data.main_screen.already_account } </Text>
              <Text style={styles.signUpT} onPress={()=> this.props.navigation.navigate('SignIn')}>{ data.main_screen.sign_in }</Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}
