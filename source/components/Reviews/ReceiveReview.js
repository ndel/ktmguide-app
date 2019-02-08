import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import Grading from 'react-native-grading';
import { Avatar } from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import Accordion from 'react-native-collapsible/Accordion';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW,COLOR_PINK } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/Reviews/ReceiveReviewsStyleSheet';
import UpperView from './UpperView';
const buttonTxt = 1.8;
const subHeadingTxt = 1.5;
const paragraphTxt = 1.4;
const headingTxt = 1.6;
const smallButtons = 1.2;
const titles = 1.8;
export default class ReceiveReview extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
      activities: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
    }
    I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    header: null,
  };
  _renderHeader(section,content,isActive) {
    return (
      <View style={{flex:1,flexDirection:'row',borderRadius:5,marginVertical:10,marginHorizontal:15,borderBottomWidth:0.4,borderColor: (isActive? "#f9f9f9" : COLOR_GRAY)}}>
        <View style={{height:height(10),alignItems:'flex-start',justifyContent:'flex-start',marginBottom:10}}>
          <Avatar
            medium
            rounded
            source={require('../../images/testImg.jpg')}
            onPress={() => console.warn("Works!")}
            activeOpacity={1}
            />
        </View>
        <View style={{flex:2,marginHorizontal:10,justifyContent:'flex-start',marginBottom:10}}>
          <View style={{flex:0.1,justifyContent:'flex-start',flexDirection:'row'}}>
            <Text style={{flex:0.7,fontSize:totalSize(headingTxt),fontWeight:'bold',color: COLOR_SECONDARY}}>Sadi Orlaf Received</Text>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'flex-end'}}>
              <Image source={isActive? require('../../images/up-arrowImg.png') : require('../../images/dropDown.png')} style={{height:height(2),width:width(4)}} />
            </View>
          </View>
          <View style={{flex:0.1,justifyContent:'center',flexDirection:'row'}}>
            <Text style={{flex:0.4,fontSize:totalSize(paragraphTxt),color: COLOR_GRAY}}>posted a review</Text>
            <Text style={{flex:1,fontSize:totalSize(subHeadingTxt),fontWeight:'bold',color: COLOR_SECONDARY,alignItems:'flex-start'}}>Hungs Continential</Text>
          </View>
          <View style={{flex:0.1,flexDirection:'row'}}>
            <View style={{flex:0.3,justifyContent:'center',alignItems:'flex-start'}}>
              <Grading
                mode="stars"
                scale={0.9}
                score={4}
                scoreBase={5}
                activeColor= {COLOR_ORANGE}
                defaultColor= {COLOR_GRAY}
                />
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
              <Text style={{fontSize:totalSize(paragraphTxt),color: COLOR_SECONDARY,alignItems:'flex-start'}}>(4/5)</Text>
            </View>
          </View>
            <Text style={{flex:0.1,fontSize:totalSize(paragraphTxt),color: COLOR_GRAY}}>12 Junary,2018</Text>
        </View>
      </View>
    );
  }
  _renderContent(section,content,isActive) {
    return (
      <View style={{flex:10,width:width(75),marginBottom:10,marginHorizontal:10,alignSelf:'flex-end',marginHorizontal:15,borderBottomWidth:0.4,borderColor: COLOR_GRAY}}>
        <Text style={{flex:1,fontSize:totalSize(paragraphTxt),color: COLOR_GRAY}}>Hello here i am buiding react native app for the glixen technologies this is my forst app here i am testing the flex situation asndas  oasnd asodn sdlnasld asmdnlasd las dlasndlk as dlasndl saldnlas d</Text>
        <Text style={{flex:1,marginVertical:5,fontSize:totalSize(1.4),fontWeight:'bold',color: COLOR_SECONDARY}}>Reply to this Review</Text>
        <TextInput
             onChangeText={(value) => this.setState({email: value})}
             underlineColorAndroid='transparent'
             // placeholder='أدخل كلمة المرور'
             placeholder='Place your review description'
             placeholderTextColor='gray'
             underlineColorAndroid='transparent'
             autoCorrect={false}
             style={{height:height(15),width:width(75),borderRadius:5,marginVertical:5,borderColor:COLOR_GRAY,borderWidth:1,fontSize:totalSize(subHeadingTxt),paddingLeft:10,textAlignVertical:'top'}}
             />
        <TouchableOpacity style={{elevation :3,alignSelf:'flex-end',height:height(4.5),width:width(30),borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:COLOR_ORANGE,marginVertical:10}}>
           <Text style={{fontSize:totalSize(buttonTxt),fontWeight:'bold',color: COLOR_PRIMARY}}>Submit Reply</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <UpperView />
          <View style={styles.titleCon}>
            <Text style={styles.titleTxt}>Recent Activities</Text>
          </View>

                <Accordion
                    sections={this.state.activities}
                    underlayColor = {null}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    disabled={false}
                  />

        </ScrollView>
      </View>
    );
  }
}
