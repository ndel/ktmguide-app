import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW,COLOR_PINK } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/UserDashboardStyles/DashboardStyleSheet';
import UpperView from './UpperView';
export default class Dashboard extends Component<Props> {
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
            <Text style={styles.titleTxt}>Recent Activities</Text>
            <TouchableOpacity style={styles.changeBtnCon}>
              <Text style={styles.closeBtnTxt}>5 Pending Listing</Text>
            </TouchableOpacity>
          </View>
          {
            this.state.activities.map((item,key)=>{
              return(
                <View key={key} style={{height:height(9),width:width(92),marginHorizontal:15,marginVertical:5,borderBottomWidth:0.4,borderColor:'gray'}}>
                  <View style={{height:height(5),flexDirection:'row'}}>
                    <Image source={require('../../images/alarm.png')} style={{height:height(3.5),width:width(5),resizeMode:'contain',marginRight:10}} />
                    <Text style={styles.bellText}>Sadi Orlaf</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                      <Text style={styles.time}>5 Min Ago</Text>
                    </View>
                  </View>
                  <View style={{height:height(4),justifyContent:'flex-start',flexDirection:'row'}}>
                    <Text style={styles.label1}>posted a review</Text>
                    <Text style={styles.label2}>Hungs Continental</Text>
                  </View>
                </View>
              );
            })
          }
          {/*<View style={styles.subTitleCon}>
            <Text style={styles.subTitleTxt}>Recent activities about your listings will be here!</Text>
          </View>*/}
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
