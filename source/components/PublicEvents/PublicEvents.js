import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import { COLOR_PRIMARY, COLOR_ORANGE, COLOR_GRAY, COLOR_SECONDARY, COLOR_YELLOW, COLOR_TRANSPARENT_BLACK } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import { createStackNavigator } from 'react-navigation';
import ApiController from '../../ApiController/ApiController';
import store from '../../Stores/orderStore';
import Toast from 'react-native-simple-toast'

class PublicEvents extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadmore: false,
      reCaller: false,
    }
  }

  componentWillMount = async () => {
    // let parameter = {
    //   user_id: store.login.loginResponse.data.id
    // };
    this.setState({ loading: true })
    let response = await ApiController.post('event-search');
    if (response.success) {
      store.EVENTS = response.data;
      this.setState({ loading: false })
    } else {
      this.setState({ loading: false })
    }
  }

  static navigationOptions = { header: null };

  _blog = (item, key) => {
    let data = store.EVENTS;
    return (
      <TouchableOpacity key={key} style={{ elevation: 5, marginVertical: 5, borderRadius: 5, marginHorizontal: 5, width: width(95), shadowColor: 'gray', alignSelf: 'center', backgroundColor: COLOR_PRIMARY, flexDirection: 'row' }}
        onPress={() => this.props.navigation.push('EventDetail', { event_id: item.event_id,title: item.event_title,headerColor: store.settings.data.navbar_clr })}
      >
        <View style={{ marginVertical: 2,width: width(36), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: item.image }} style={{ height: height(17.5), width: width(35), alignSelf: 'center', borderRadius: 5 }} />
        </View>
        <View style={{ width: width(58), justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 0, marginVertical: 5 }}>
          <Text style={{ marginHorizontal: 7, fontSize: totalSize(1.6), marginBottom: 0 }} >{item.event_category_name}</Text>
          <Text style={{ marginHorizontal: 7, fontWeight: 'bold', color: COLOR_SECONDARY, marginBottom: 5, fontSize: totalSize(1.8) }} >{item.event_title}</Text>
          <View style={{ flexDirection: 'row', marginHorizontal: 7, marginBottom: 3, alignItems: 'center' }}>
            <Image source={require('../../images/clock-circular-outline.png')} style={{ height: height(2), width: width(5), resizeMode: 'contain' }} />
            <Text style={{ fontWeight: 'bold', fontSize: totalSize(1.6), color: COLOR_SECONDARY, marginHorizontal: 3 }}>{data.from}</Text>
            <Text style={{ fontSize: totalSize(1.5) }}>{item.event_start_date}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 7, marginBottom: 3, alignItems: 'center' }}>
            <Image source={require('../../images/calendar.png')} style={{ height: height(2), width: width(5), resizeMode: 'contain' }} />
            <Text style={{ fontWeight: 'bold', fontSize: totalSize(1.6), color: COLOR_SECONDARY, marginHorizontal: 3 }}>{data.to}</Text>
            <Text style={{ fontSize: totalSize(1.5) }}>{item.event_end_date}</Text>
          </View>
          <View style={{ width:width(58),flexDirection: 'row',marginHorizontal: 7, marginBottom: 3, alignItems: 'center' }}>
            <Image source={require('../../images/paper-plane.png')} style={{ height: height(2), width: width(5), resizeMode: 'contain' }} />
            <Text style={{ height:height(2),fontWeight: 'bold', fontSize: totalSize(1.6), color: COLOR_SECONDARY, marginHorizontal: 3 }}>{data.venue}</Text>
            <Text style={{ fontSize: totalSize(1.5),flexWrap:'wrap',width:width(38) }}>{item.event_loc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  loadMore = async (pageNo) => {
    let params = {
      next_page: pageNo
    }
    this.setState({ loadmore: true })
    var data = store.EVENTS;
    let response = await ApiController.post('event-search', params);
    // console.log('loadMore=====>>>', response);
    if (response.success && data.pagination.has_next_page) {
      //forEach Loop LoadMore results
      response.data.eventz.forEach((item) => {
        data.eventz.push(item);
      })
      data.pagination = response.data.pagination;
      this.setState({ loadmore: false })
    } else {
      this.setState({ loadmore: false })
      // Toast.show(response.data.no_more)
    }
    this.setState({ reCaller: false })
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {
    let main_clr = store.settings.data.main_clr;
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.loading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color={main_clr} animating={true} />
            </View>
            :
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  if (this.state.reCaller === false) {
                    this.loadMore(store.EVENTS.pagination.next_page);
                  }
                  this.setState({ reCaller: true })
                }
              }}
              scrollEventThrottle={400}>
              <View style={{ backgroundColor: COLOR_PRIMARY, marginBottom: 10 }}>
                <Text style={{ marginVertical: 5, marginHorizontal: 10 }}>{store.EVENTS.total_events}</Text>
              </View>
              {
                store.EVENTS.eventz.map((item, key) => {
                  return (
                    this._blog(item, key)
                  )
                })
              }
              {
                store.EVENTS.pagination.has_next_page ?
                  <View style={{ height: height(7), width: width(100), justifyContent: 'center', alignItems: 'center' }}>
                    {
                      this.state.loadmore ?
                        <ActivityIndicator size='large' color={store.settings.data.navbar_clr} animating={true} />
                        : null
                    }
                  </View>
                  :
                  null
              }
            </ScrollView>
        }
      </View>
    );
  }
}
export default PublicEvents;
