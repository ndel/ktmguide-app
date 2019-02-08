import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import { Avatar } from 'react-native-elements';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW,COLOR_TRANSPARENT_BLACK } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/AboutUsStyleSheet';
import { createStackNavigator } from 'react-navigation';
const buttonTxt = 1.8;
const subHeadingTxt = 1.5;
const paragraphTxt = 1.4;
const headingTxt = 1.6;
const smallButtons = 1.2;
const titles = 1.8;
const SECTIONS = [
  {
    title: 'First',
    content: [{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"}],
  },
];
export default class BlogDetail extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
      content: [{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"}],
    }
    I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    headerTitle:'DownTown',
    headerTintColor:'white',
    headerTitleStyle:{
      fontSize:totalSize(2),
      fontWeight:'normal'
    },
    headerStyle:{
      backgroundColor:'black'
    }
  };
  render() {
    return (
      <View style={{flex:1,alignItems:'center',backgroundColor: '#f9f9f9'}}>
        <ScrollView
          // backgroundColor='#f9f9f9'
          // elevation = {10}
          >
            <View style={{flex:1,margin:10}}>
              <View style={{height:height(40),marginBottom:10}}>
                <Image source={require('../../images/food.jpg')} style={{height:height(40),width:width(95)}} />
              </View>
              <View style={{flex:2.5,justifyContent:'center',alignItems:'flex-start',flexDirection:'row'}}>
                <Text style={{width:width(25),fontSize:totalSize(paragraphTxt),color: COLOR_SECONDARY}}>16,Junary,2018</Text>
                <Text style={{width:width(70),fontSize:totalSize(paragraphTxt),color: COLOR_SECONDARY}}>23 Comments</Text>
              </View>
              <View style={{flex:3,justifyContent:'center'}}>
                <Text style={{fontSize:totalSize(titles),fontWeight:'bold',color: COLOR_SECONDARY}}>Location of the Event</Text>
              </View>
              <View style={{flex:1,marginVertical:5,justifyContent:'center'}}>
                <Text style={{fontSize:totalSize(paragraphTxt),color: COLOR_GRAY}}>
                  Hello here i am buiding react native app for the glixen technologies this is my forst app here i am testing the flex situation asndas  oasnd asodn sdlnasld asmdnlasd las dlasndlk as dlasndl saldnlas d
                </Text>
              </View>
              <View style={{height:height(5),marginVertical:5,borderTopWidth:0.3,borderColor:COLOR_GRAY,flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../../images/tags.png')} style={{flex:0.2,height:height(2.5),width:width(5),resizeMode:'contain'}} />
                <Text style={{flex:3,fontSize:totalSize(subHeadingTxt),marginHorizontal:5,fontFamily:FONT_NORMAL,color: COLOR_SECONDARY}}>#food #News #Glixen #DownTown</Text>
              </View>
              <View style={{height:height(5),justifyContent:'center'}}>
                <Text style={{flex:3,fontSize:totalSize(titles),fontWeight:'bold',color: COLOR_SECONDARY}}>Comments (03)</Text>
              </View>
              {
                this.state.content.map((item,key)=>{
                  return(
                    <View key={key} style={{flex:1,flexDirection:'row',borderRadius:5,marginVertical:5}}>
                      <View style={{height:height(15),alignItems:'flex-start',justifyContent:'flex-start'}}>
                        <Avatar
                          large
                          rounded
                          source={require('../../images/testImg.jpg')}
                          onPress={() => console.warn("Works!")}
                          activeOpacity={1}
                          />
                      </View>
                      <View style={{flex:3,marginHorizontal:10,justifyContent:'center'}}>
                        <Text style={{flex:1.5,fontSize:totalSize(headingTxt),fontWeight:'bold',color: COLOR_SECONDARY}}>Usama</Text>
                        <Text style={{flex:1,fontSize:totalSize(paragraphTxt),color: COLOR_SECONDARY}}>Junary 17,2018</Text>
                        <Text style={{flex:3,marginVertical:10,fontSize:totalSize(paragraphTxt),color: COLOR_GRAY}}>Hello here i am buiding react native app for the glixen technologies this is my forst app here i am testing the flex situation asndas  oasnd asodn sdlnasld asmdnlasd las dlasndlk as dlasndl saldnlas d</Text>
                      </View>
                    </View>
                  )
                })
              }
              <Text style={{flex:3,marginVertical:15,fontSize:totalSize(titles),fontWeight:'bold',color: COLOR_SECONDARY}}>Write A Review</Text>
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   placeholder='Your Name'
                   placeholderTextColor='black'
                   underlineColorAndroid='transparent'
                   autoCorrect={true}
                   style={{height:height(6),width:width(95),paddingLeft:10,alignSelf:'stretch',fontSize:totalSize(subHeadingTxt),borderColor: COLOR_GRAY,borderWidth:0.5,borderRadius:5}}
                   />
              <TextInput
                   onChangeText={(value) => this.setState({name: value})}
                   placeholder='Your Email'
                   placeholderTextColor='black'
                   underlineColorAndroid='transparent'
                   autoCorrect={true}
                   style={{height:height(6),marginVertical:15,paddingLeft:10,width:width(95),alignSelf:'stretch',fontSize:totalSize(subHeadingTxt),borderColor: COLOR_GRAY,borderWidth:0.5,borderRadius:5}}
                  />
              <TextInput
                    onChangeText={(value) => this.setState({name: value})}
                    placeholder='Your Email'
                    placeholderTextColor='black'
                    keyboardType = 'email-address'
                    underlineColorAndroid='transparent'
                    autoCorrect={true}
                    style={{height:height(20),textAlignVertical:'top',paddingLeft:10,width:width(95),alignSelf:'center',fontSize:totalSize(subHeadingTxt),borderColor: COLOR_GRAY,borderWidth:0.5,borderRadius:5}}
                    />
            </View>
            <TouchableOpacity style={{elevation :10,height:height(5),width:width(95),marginBottom: 10,alignSelf:'center',borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor: COLOR_YELLOW}} onPress={()=>{this.props.navigation.navigate('BlogDetail')}}>
              <Text style={{fontSize:totalSize(buttonTxt),fontWeight:'bold',color: COLOR_PRIMARY}}>Submit Review</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
