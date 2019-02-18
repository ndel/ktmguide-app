import React, { Component } from 'react';
import {
  Platform, ActivityIndicator, Text, View, Button, Image, ImageBackground, TouchableOpacity, I18nManager,
  TextInput
} from 'react-native';
import { INDICATOR_COLOR,INDICATOR_SIZE,OVERLAY_COLOR } from '../../../styles/common';
import { width, height, totalSize } from 'react-native-dimension';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import store from '../../Stores/orderStore';
import styles from '../../../styles/SignUp'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import ApiController from '../../ApiController/ApiController';
import LocalDB from '../../LocalDB/LocalDB'
// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
var { FBLoginManager } = require('react-native-facebook-login');
@observer export default class SignUp extends Component<Props> {
  constructor(props) {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    super(props);
    this.state = {
      loading: false,
      name: '',
      email: '',
      password: '',
    }
    // I18nManager.forceRTL(data.is_rtl);
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    GoogleSignin.configure({
      iosClientId: '191792720370-rc4ospf26req749phf3d4l4sfj74gmf4.apps.googleusercontent.com'
    })
  }
  // Google SignUp
  handleGoogleSignIn = () => {
    GoogleSignin.signIn().then((user) => {
      //Calling local func for login through google
      this.socialSignUp(user.user.email, user.user.name);
      console.log('Google login', user);
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
  // FaceBook SignUp 
  fbLogin = () => {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
    FBLoginManager.loginWithPermissions(["email"], functionFb = (error, data) => {
      if (!error && data.type === "success") {
        //Calling local func for login through google
        let profile = JSON.parse(data.profile);
        this.socialSignUp(profile.email, profile.name);
        console.log("FaceBook signUp: ", data);
      } else {
        Toast.show('It must be your network issue, please try again.', Toast.LONG);
        console.log("Error: ", error);
      }
    })
  }
  //// Custom Social Login methode
  socialSignUp = async (email, name) => {
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
  register = async () => {
    if (this.state.name.length === 0) {
      Toast.show('Please enter your name');
    } else {
      if (this.state.email.length === 0) {
        Toast.show('Please enter your email', Toast.LONG);
      } else {
        if (this.state.password.length === 0) {
          Toast.show('Please enter your password', Toast.LONG);
        } else {
          this.setState({ loading: true })
          let params = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }
          let response = await ApiController.post('register', params)
          // console.log('signup user =',response);
          if (response.success === true) {
            this.setState({ loading: false })
            await LocalDB.saveProfile(this.state.email, this.state.password, response.data);
            store.login.loginStatus = true;
            this.props.navigation.push('Drawer');
          } else {
            this.setState({ loading: false })
            Toast.show(response.message, Toast.LONG);
          }
        }
      }
    }
  }
  render() {
    let { orderStore } = Store;
    let data = orderStore.settings.data;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/bk_ground.jpg')} style={styles.imgCon}>
          <ImageBackground source={require('../../images/Downtown_Shadownew.png')} style={styles.imgCon}>
            <View style={{ height: height(5), flexDirection: 'row' }}>
              <TouchableOpacity style={styles.bckImgCon} onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../../images/back_btn.png')} style={styles.backBtn} />
              </TouchableOpacity>
              <View style={{ flex: 0.5, justifyContent: 'flex-end', marginHorizontal: 25 }}>
                <Text style={styles.headerTxt}>{data.main_screen.sign_up}</Text>
              </View>
            </View>
            <View style={styles.logoView}>
              <Image source={{ uri: data.logo }} style={styles.logoImg} />
              <Text style={styles.logoTxt}>{data.slogan}</Text>
            </View>
            <View style={styles.buttonView}>
              <View style={styles.btn} onPress={() => { this.props.navigation.navigate('Login') }}>
                <View style={{ flex: 0.9 }}>
                  <Image source={require('../../images/user.png')} style={styles.userImg} />
                </View>
                <View style={{ flex: 4.1 }}>
                  <TextInput
                    onChangeText={(value) => this.setState({ name: value })}
                    underlineColorAndroid='transparent'
                    placeholder={data.main_screen.name_placeholder}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    autoCorrect={true}
                    autoFocus={false}
                    keyboardAppearance='default'
                    keyboardType='default'
                    style={styles.inputTxt}
                  />
                </View>
              </View>
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
                    autoCorrect={false}
                    style={styles.inputTxt}
                  />
                </View>
              </View>
              <TouchableOpacity style={[styles.signUpBtn, { backgroundColor: orderStore.settings.data.main_clr }]} onPress={() => this.register()} >
                <Text style={styles.signUpTxt}>{data.main_screen.sign_up}</Text>
              </TouchableOpacity>
              <View style={styles.fgBtn}>
                <TouchableOpacity style={styles.buttonCon}
                  onPress={() => { this.fbLogin() }} >
                  <Text style={{ fontSize: totalSize(1.8), color: 'white' }}>{data.main_screen.fb_btn}</Text>
                </TouchableOpacity>
                <Text style={styles.orTxt}>{data.main_screen.separator}</Text>
                <TouchableOpacity style={[styles.buttonCon, { width: width(29.5), backgroundColor: '#DB4437' }]}
                  onPress={() => { this.handleGoogleSignIn() }} >
                  <Text style={{ fontSize: totalSize(1.8), color: 'white' }}>{data.main_screen.g_btn}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                {!this.state.loading ? null :
                  <ActivityIndicator size={INDICATOR_SIZE} color={store.settings.data.navbar_clr} animating={true} hidesWhenStopped={true} />}
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.expTxt}>{data.main_screen.already_account} </Text>
              <Text style={styles.signUpT} onPress={() => this.props.navigation.navigate('SignIn')}>{data.main_screen.sign_in}</Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}
