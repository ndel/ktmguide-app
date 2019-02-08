import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList,TouchableHighlight,Alert
} from 'react-native';
import Modal from "react-native-modal";
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_DARK_GRAY } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/UserDashboardStyles/EditProfileStyleSheet';
import UpperView from './UpperView';
export default class EditProfile extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
      modalVisible: false
    }
    I18nManager.forceRTL(false);
    // this.getHTML = this.getHTML.bind(this);
    // this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <UpperView />
          <View style={styles.titleCon}>
            <Text style={styles.titleTxt}>Edit Profile</Text>
            <TouchableOpacity style={styles.changeBtnCon} onPress={() => { this.setModalVisible(true); }}>
              <Text style={styles.closeBtnTxt}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Name</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 placeholder='usama'
                 placeholderTextColor= 'gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.textInput}
                 />
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 placeholder='usamaabutt@gmail.com'
                 placeholderTextColor= 'gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.textInput}
                 />
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Phone No</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 underlineColorAndroid='transparent'
                 placeholder = 'Enter your contact no'
                 placeholderTextColor='gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.textInput}
                 />
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Location</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 placeholder = 'City or location'
                 placeholderTextColor='gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.textInput}
                 />
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Time Zone</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 placeholder = 'Select TimeZone'
                 placeholderTextColor='gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.textInput}
                 />
          </View>
          <View style={styles.aboutInputCon}>
            <Text style={styles.textInputLabel}>About Yourself</Text>
            <TextInput
                 onChangeText={(value) => this.setState({name: value})}
                 placeholder = 'Description'
                 placeholderTextColor='gray'
                 underlineColorAndroid='transparent'
                 autoCorrect={false}
                 style={styles.aboutInputText}
                 />
          </View>
          <Text style={styles.labelTxt}>Social Media accounts</Text>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Facebook URL</Text>
            <View style={styles.subCon}>
              <View style={styles.iconCon}>
                <Image source={require('../../images/facebook-letter-logo.png')} style={styles.icon}/>
              </View>
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   placeholder = '#'
                   placeholderTextColor='gray'
                   underlineColorAndroid='transparent'
                   autoCorrect={false}
                   style={styles.txtInput}
                   />
            </View>
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Twitter URL</Text>
            <View style={styles.subCon}>
              <View style={styles.iconCon}>
                <Image source={require('../../images/twitter.png')} style={styles.icon}/>
              </View>
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   placeholder = '#'
                   placeholderTextColor='gray'
                   underlineColorAndroid='transparent'
                   autoCorrect={false}
                   style={styles.txtInput}
                   />
            </View>
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>Facebook URL</Text>
            <View style={styles.subCon}>
              <View style={styles.iconCon}>
                <Image source={require('../../images/google-plus-symbol.png')} style={styles.icon}/>
              </View>
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   value = 'Google+ URL'
                   underlineColorAndroid='transparent'
                   autoCorrect={false}
                   style={styles.txtInput}
                   />
            </View>
          </View>
          <View style={styles.textInputCon}>
            <Text style={styles.textInputLabel}>LinkedIn URL</Text>
            <View style={styles.subCon}>
              <View style={styles.iconCon}>
                <Image source={require('../../images/linkedin-logo.png')} style={styles.icon}/>
              </View>
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   value = 'LinkedIn URL'
                   underlineColorAndroid='transparent'
                   autoCorrect={false}
                   style={styles.txtInput}
                   />
            </View>
          </View>
          <View style={styles.profielBtn}>
            <Text style={styles.profielBtnTxt}>Update Profile</Text>
          </View>
        </ScrollView>
        <Modal
          animationInTiming={500}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          avoidKeyboard={true}
          // transparent={false}
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          style={{flex:1}}>
          <View style={{height:height(35),width:width(90),alignSelf:'center',backgroundColor: COLOR_PRIMARY}}>
            <View style={{height:height(4),alignItems:'flex-end'}}>
              <TouchableOpacity style={{elevation:3,height:height(3.5),width:width(6),justifyContent:'center',alignItems:'center',backgroundColor:'red'}} onPress={()=>{this.setState({modalVisible: false})}}>
                <Image source={require('../../images/clear-button.png')} style={{height:height(2),width:width(3),resizeMode:'contain'}} />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize:totalSize(1.8),color:'black',marginVertical:10,marginHorizontal:20,fontWeight:'bold'}}>Set Your Password</Text>
            <TextInput
               onChangeText={(value) => this.setState({name: value})}
               placeholder='Enter Your New Password'
               placeholderTextColor={COLOR_GRAY}
               underlineColorAndroid='transparent'
               autoCorrect={false}
               style={{height:height(6),marginHorizontal:20,padding:10,marginBottom:10,borderRadius:5,borderWidth:0.5,borderColor:COLOR_GRAY,backgroundColor: COLOR_PRIMARY,color:COLOR_SECONDARY,fontSize:totalSize(1.6)}}
               />
            <TextInput
               onChangeText={(value) => this.setState({name: value})}
               placeholder='Confirm New Password'
               placeholderTextColor={COLOR_GRAY}
               underlineColorAndroid='transparent'
               autoCorrect={false}
               style={{height:height(6),marginHorizontal:20,padding:10,marginBottom:10,borderRadius:5,borderWidth:0.5,borderColor:COLOR_GRAY,backgroundColor: COLOR_PRIMARY,color:COLOR_SECONDARY,fontSize:totalSize(1.6)}}
               />
            <TouchableOpacity style={{elevation:3,height:height(6),justifyContent:'center',alignItems:'center',borderRadius:5,marginVertical:5,marginHorizontal:20,backgroundColor: COLOR_ORANGE}} onPress={()=>{this.setState({modalVisible: false})}}>
              <Text style={{fontSize:totalSize(1.8),color: COLOR_PRIMARY,fontWeight:'bold'}}>Change my Password</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
// onEditorInitialized() {
//   this.setFocusHandlers();
//   this.getHTML();
// }
// async getHTML() {
//   const titleHtml = await this.richtext.getTitleHtml();
//   const contentHtml = await this.richtext.getContentHtml();
//   //alert(titleHtml + ' ' + contentHtml)
// }
// setFocusHandlers() {
//   this.richtext.setTitleFocusHandler(() => {
//     //alert('title focus');
//   });
//   this.richtext.setContentFocusHandler(() => {
//     //alert('content focus');
//   });
//  }
// <View style={{height:height(21),flexDirection:'column-reverse',borderRadius:5,marginBottom:10,borderColor: COLOR_GRAY,borderWidth:0.5}}>
//   <RichTextEditor
//       ref={(r)=>this.richtext = r}
//       style={{ alignItems:'center',justifyContent: 'center',backgroundColor: 'transparent',}}
//       hiddenTitle={true}
//       contentPlaceholder='Description'
//       customCSS = {'body {font-size: 12px;}'}
//       editorInitializedCallback={() => this.onEditorInitialized()}
//       />
//       <RichTextToolbar
//         getEditor={() => this.richtext}
//       />
// </View>
