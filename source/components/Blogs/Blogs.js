import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import { COLOR_PRIMARY, COLOR_ORANGE, COLOR_GRAY, COLOR_SECONDARY, COLOR_YELLOW, COLOR_TRANSPARENT_BLACK } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import { createStackNavigator } from 'react-navigation';
import store from '../../Stores/orderStore';

class Blogs extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: [{ name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }],
    }
  }

  componentWillMount = async () => {
    // console.log('id',store.login.loginResponse.data.id);
    
    // let parameter = {
    //   user_id: store.login.loginResponse.data.id
    // };
  }

  static navigationOptions = { header: null };

  _blog = (item, key) => {
    return (
      <View key={key} style={{ elevation: 5, marginVertical: 5, borderRadius: 5, marginHorizontal: 5, height: height(17), width: width(92), shadowColor: 'gray', alignSelf: 'center', backgroundColor: COLOR_PRIMARY ,flexDirection:'row'}}>
        <Image />
        {/* <View style={{height:height(16.5),width:width()}}></View> */}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: COLOR_PRIMARY, marginBottom: 10 }}>
            <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>Total no of</Text>
          </View>
          {
            this.state.content.map((item, key) => {
              return (
                this._blog(item, key)
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
export default blogStack = createStackNavigator({
  Blogs: Blogs,
  // BlogDetail: BlogDetail
}, {
    initialRouteName: 'Blogs',
    // headerMode: 'none'
  }
);
