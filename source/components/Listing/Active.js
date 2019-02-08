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
import Icon from 'react-native-vector-icons'
import { FONT_NORMAL,FONT_BOLD,COLOR_PRIMARY,COLOR_ORANGE,COLOR_GRAY,COLOR_SECONDARY,COLOR_YELLOW } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import styles from '../../../styles/Listing/ActiveStyleSheet';
export default class Active extends Component<Props> {
  constructor( props,ctx ) {
    super(props,ctx);
    this.state = {
      opened: false,
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
  onOptionSelect(value) {
    alert(`Selected number: ${value}`);
    this.setState({ opened: false });
  }

  onTriggerPress() {
    this.setState({ opened: true });
  }

  onBackdropPress() {
    this.setState({ opened: false });
  }

  listComp = ( item,key ) => {
    const { opened } = this.state;
    return(
      <View key={key} style={styles.featuredFLItem}>
        <Image source={require('../../images/testImg.jpg')} style={styles.featuredImg} />
        <View style={{height:height(15),width:width(32),position:'absolute'}}>
          <View style={{height:height(10),width:width(30)}}></View>
          <View style={styles.closedBtn}>
            <Text style={styles.closedBtnTxt}>Open 2/4</Text>
          </View>
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
                        <Image source={require('../../images/pencil-edit-button.png')} style={{height:height(2.5),width:width(4),marginHorizontal:5,resizeMode:'contain'}} />
                        <Text style={{fontSize:totalSize(1.4),marginHorizontal:5,color:'black'}}>Edit</Text>
                      </View>
                    </MenuOption>
                    <MenuOption>
                      <View style={{flexDirection:'row',}}>
                        <Image source={require('../../images/x-button.png')} style={{height:height(2.5),width:width(4),marginHorizontal:5,resizeMode:'contain'}} />
                        <Text style={{fontSize:totalSize(1.4),marginHorizontal:5,color:'black'}}>Delete</Text>
                      </View>
                    </MenuOption>
                    <MenuOption>
                      <View style={{flexDirection:'row',}}>
                        <Image source={require('../../images/error-triangle.png')} style={{height:height(2.5),width:width(4),marginHorizontal:5,resizeMode:'contain'}} />
                        <Text style={{fontSize:totalSize(1.4),marginHorizontal:5,color:'black'}}>Expired</Text>
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
          <Text style={styles.viewDetail}>View Detail</Text>
        </View>
    </View>
    );
  }
  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item,key}) =>
                this.listComp()
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
