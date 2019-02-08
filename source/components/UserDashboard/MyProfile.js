import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/UserDashboardStyles/MyProfileStyleSheet';
import UpperView from './UpperView';
export default class MyProfile extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
    }
    I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    header: null,
  };
  ratingCompleted=(rating)=> {
    console.warn("Rating is: " + rating)
    this.setState({rate: rating})
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <UpperView />
          <View style={styles.titleCon}>
            <Text style={styles.titleTxt}>My Profile</Text>
            {/*<TouchableOpacity style={styles.changeBtnCon} onPress={()=>{this.props.navigation.navigate('EditProfile')}}>
              <Text style={styles.closeBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>*/}
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.txt}>usama</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.txt}>usamabutt@gmail.com</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Phone No:</Text>
            <Text style={styles.txt}>0300-7000272</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.txt}>Model Town Lahore,Punjab</Text>
          </View>
          <Text style={styles.labelMedia}>About Info</Text>
          <Text style={styles.labelTxt}>A basic paragraph structure is consist of five sentences: the topic sentensce and the three suporting sentence, three suporting sentences,and a conclusion sentensce. But the secrets to paragraph writing lay in four essentional elements.</Text>
          <Text style={styles.labelMedia}>Social Media accounts</Text>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Facebook:</Text>
            <Text style={styles.txt}>Usamabutt7694@Facebook.com</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Google Plus:</Text>
            <Text style={styles.txt}>Usamaabutt081@gmail.com</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Twitter:</Text>
            <Text style={styles.txt}>Usama@tiwtter</Text>
          </View>
          <View style={styles.userInfoCon}>
            <Text style={styles.label}>Linkedin:</Text>
            <Text style={styles.txt}>Scripts Bundle</Text>
          </View>
          <View style={styles.planBox}>
            <View style={styles.boxTitleCon}>
              <Text style={styles.boxTitleTxt}>No Plan Selected</Text>
            </View>
            <View style={{height:height(8)}}>
              <Text style={styles.boxMessage}>Currently you do not have any Package. Upgrade your plan if desired.</Text>
            </View>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.btnTxt}>View Packages</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
