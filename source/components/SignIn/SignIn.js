import React, { Component } from 'react';
import {
  Platform, ActivityIndicator, Text, View, AsyncStorage, Image, ImageBackground, TouchableOpacity, I18nManager,
  TextInput, Alert
} from 'react-native';
import { INDICATOR_COLOR,INDICATOR_SIZE,OVERLAY_COLOR } from '../../../styles/common';
import { width, height, totalSize } from 'react-native-dimension';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/SignIn'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import ApiController from '../../ApiController/ApiController';
// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
var { FBLoginManager } = require('react-native-facebook-login');
export default class SignIn extends Component<Props> {
  constructor(props) {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    super(props);
    this.state = {
      loading: false,
      password: '',//12345
      email: '',//usama@gmail.com
    }
    // I18nManager.forceRTL(data.is_rtl);
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount = async() => {
    const email = await AsyncStorage.getItem('email');
    const pass = await AsyncStorage.getItem('password');
    console.warn('pass & email =>>>',email , pass);
    
    GoogleSignin.configure({
      iosClientId: '191792720370-rc4ospf26req749phf3d4l4sfj74gmf4.apps.googleusercontent.com'
    })
  }
  //// Google Login Methode 
  handleGoogleSignIn = () => {
    GoogleSignin.signIn().then((user) => {
      //Calling local func for login through google
      this.socialLogin(user.user.email, user.user.name);
      console.log('googleLogin', user);
    }).catch((err) => {
      console.warn(err);
    }).done();
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  //.... FaceBook Login Methodes
  fbLogin = () => {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
    FBLoginManager.loginWithPermissions(["email"], functionFb = (error, data) => {
      if (!error && data.type === "success") {
        //Calling local func for login through google
        let profile = JSON.parse(data.profile);
        this.socialLogin(profile.email, profile.name);
        console.log("FaceBook Login: ", data);
      } else {
        Toast.show('It must be your network issue, please try again.', Toast.LONG);
        console.log("Error: ", error);
      }
    })
  }
  //// Custom Social Login methode
  socialLogin = async (email, name) => {
    let { orderStore } = Store;
    console.warn('emial', email);
    this.setState({ loading: true })
    let params = {
      name: name,
      email: email,
      type: 'social'
    }
    //API Calling
    let response = await ApiController.post('login', params)
    console.log('login user =', response);
    if (response.success === true) {
      this.setState({ loading: false })
      orderStore.login.loginStatus = true;
      orderStore.login.loginResponse = response;
      this.props.navigation.push('Drawer')
    }
  }
  //// Login Post 
  login = async () => {
    let { orderStore } = Store;
    if (this.state.email.length === 0) {
      Toast.show('Please enter your email');
    } else {
      if (this.state.password.length === 0) {
        Toast.show('Please enter your password', Toast.LONG);
      } else {
        this.setState({ loading: true })
        let params = {
          email: this.state.email,
          password: this.state.password
        }
        //Api calling
        let response = await ApiController.post('login', params)
        console.log('login user =', response);
        if (response.success === true) {
          this.asyncStorage();
          this.setState({ loading: false })
          orderStore.login.loginStatus = true;
          orderStore.login.loginResponse = response;
          this.props.navigation.push('Drawer')
        } else {
          this.setState({ loading: false })
          Toast.show(response.message);
        }
      }
    }
  }
  asyncStorage = async( ) => {
    try {
      await AsyncStorage.setItem( 'email', this.state.email);
      await AsyncStorage.setItem( 'password', this.state.password);
    } catch (error) {
      // Error saving data
    }
  }
  render() {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    var _this = this;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/bk_ground.jpg')} style={styles.imgCon}>
          <ImageBackground source={require('../../images/Downtown_Shadownew.png')} style={styles.imgCon}>
            <View style={{ flex: 1 }}>
              <View style={{ height: height(5), width: width(100), flexDirection: 'row' }}>
                <TouchableOpacity style={styles.bckImgCon} onPress={() => this.props.navigation.goBack()}>
                  <Image source={require('../../images/back_btn.png')} style={styles.backBtn} />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'flex-end',marginHorizontal: 25 }}>
                  <Text style={styles.headerTxt}>{data.main_screen.sign_in}</Text>
                </View>
              </View>
              <View style={styles.logoView}>
                <Image source={{ uri: data.logo }} style={styles.logoImg} />
                <Text style={styles.logoTxt}>{data.slogan}</Text>
              </View>
              <View style={styles.buttonView}>
                <View style={styles.btn} onPress={() => { this.props.navigation.navigate('Login') }}>
                  <View style={{ flex: 0.9 }}>
                    <Image source={require('../../images/mail.png')} style={styles.mail} />
                  </View>
                  <View style={{ flex: 4.1 }}>
                    <TextInput
                      onChangeText={(value) => this.setState({ email: value })}
                      underlineColorAndroid='transparent'
                      placeholder={data.main_screen.email_placeholder}
                      placeholderTextColor='white'
                      textContentType='emailAddress'
                      keyboardType='email-address'
                      underlineColorAndroid='transparent'
                      autoCorrect={true}
                      style={styles.inputTxt}
                    />
                  </View>
                </View>
                <View style={styles.btn} onPress={() => { this.props.navigation.navigate('Login') }}>
                  <View style={{ flex: 0.9 }}>
                    <Image source={require('../../images/password.png')} style={styles.mail} />
                  </View>
                  <View style={{ flex: 4.1 }}>
                    <TextInput
                      onChangeText={(value) => this.setState({ password: value })}
                      underlineColorAndroid='transparent'
                      placeholder={data.main_screen.password_placeholder}
                      secureTextEntry={true}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent'
                      autoCorrect={true}
                      style={styles.inputTxt}
                    />
                  </View>
                </View>
                <TouchableOpacity style={[styles.signUpBtn, { backgroundColor: orderStore.settings.data.main_clr }]} onPress={() => this.login()}>
                  <Text style={styles.signUpTxt}>{data.main_screen.sign_in}</Text>
                </TouchableOpacity>
                <View style={styles.fgBtn}>
                  <TouchableOpacity style={{ width: width(30), height: height(5), borderRadius: 3, backgroundColor: 'transparent', backgroundColor: '#134A7C', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { this.fbLogin() }}
                  >
                    {/* <Image source={require('../../images/fb.jpg')} style={styles.other} /> */}
                    <Text style={{ fontSize: totalSize(1.8), color: 'white' }}>{data.main_screen.fb_btn}</Text>
                  </TouchableOpacity>
                  <Text style={styles.orTxt}>{data.main_screen.separator}</Text>
                  <TouchableOpacity style={{ width: width(29.5), height: height(5), borderRadius: 3, backgroundColor: 'transparent', backgroundColor: '#DB4437', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { this.handleGoogleSignIn() }}
                  >
                    {/* <Image source={require('../../images/google.jpg')} style={styles.other} /> */}
                    <Text style={{ fontSize: totalSize(1.8), color: 'white' }}>{data.main_screen.g_btn}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                  {!this.state.loading ? null :
                    <ActivityIndicator size={INDICATOR_SIZE} color={INDICATOR_COLOR} animating={true} hidesWhenStopped={true} />}
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.forgetpwrd} onPress={() => this.props.navigation.navigate('ForgetPassword')}>{data.main_screen.forgot_text}</Text>
                <Text style={styles.newHere}>New Here? </Text>
                <Text style={styles.signInT} onPress={() => this.props.navigation.navigate('SignUp')}>{data.main_screen.sign_up}</Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}