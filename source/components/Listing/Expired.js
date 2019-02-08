import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image,ImageBackground,TouchableOpacity,I18nManager,
        ScrollView,TextInput,FlatList
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { width, height, totalSize } from 'react-native-dimension';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/Listing/FeaturedStyleSheet';
export default class Expired extends Component<Props> {
  constructor( props ) {
    super(props);
    this.state = {
      name: '',
      data: [{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"},{name: "Hotels"}],
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
  listComp = ( item,key ) => {
    return(
      <View key={key} style={styles.featuredFLItem}>
        <Image source={require('../../images/testImg.jpg')} style={styles.featuredImg} />
        <View style={{height:height(15),width:width(32),position:'absolute'}}>
          <View style={styles.triangleCorner}>
          </View>
          <Image source={require('../../images/starfill.png')} style={{height:height(1.5),width:width(3),marginLeft:4,marginTop:4,position:'absolute',resizeMode:'contain'}} />
          <View style={{height:height(6)}}></View>
          <TouchableOpacity style={styles.closedBtn}>
            <Text style={styles.closedBtnTxt}>Open 2/4</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.txtViewCon}>
          <View style={{height:height(4.5),width:width(62),alignItems:'center',flexDirection:'row'}}>
            <Text style={styles.txtViewHeading}>6th evenue Studio</Text>
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'flex-end',marginTop:5}}>
                <Menu>
                  <MenuTrigger>
                    <Image source={require('../../images/menu.png')} style={{height:height(3.5),width:width(5),marginLeft:10,resizeMode:'contain'}} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption>
                      <View style={{flexDirection:'row',}}>
                        <Image source={require('../../images/refresh.png')} style={{height:height(2.5),width:width(4),marginHorizontal:5,resizeMode:'contain'}} />
                        <Text style={{fontSize:totalSize(1.4),marginHorizontal:5,color:'black'}}>Reactive</Text>
                      </View>
                    </MenuOption>
                    <MenuOption>
                      <View style={{flexDirection:'row',}}>
                        <Image source={require('../../images/google-analytics.png')} style={{height:height(2.5),width:width(4),marginHorizontal:5,resizeMode:'contain'}} />
                        <Text style={{fontSize:totalSize(1.4),marginHorizontal:5,color:'black'}}>Analytics</Text>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
            </View>
          </View>
          <View style={{height:height(3),alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../../images/map-placeholder.png')} style={{height:height(2),width:width(3),marginLeft:10,resizeMode:'contain'}} />
            <Text style={styles.subHeadingTxt}>587 imdba street,Lahore</Text>
          </View>
          <View style={{height:height(3),alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../../images/cubes-stack.png')} style={{height:height(2),width:width(3),marginLeft:10,resizeMode:'contain'}} />
            <Text style={styles.subHeadingTxt}>Sports</Text>
          </View>
          <Text style={{fontSize:totalSize(1.5),fontWeight:'bold',color:COLOR_SECONDARY,marginVertical:5,marginHorizontal:10,marginTop:5}}>View Detail</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item,key}) =>
                this.listComp(item,key)
              }
              horizontal = {false}
              showsHorizontalScrollIndicator = {false}
              // keyExtractor={item => item.email}
            />
        </ScrollView>
      </View>
    );
  }
}
