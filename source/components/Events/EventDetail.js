import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, I18nManager,
  ScrollView, TextInput, FlatList, Modal
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import MapView, { Polyline, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import ApiController from '../../ApiController/ApiController';
import CountDown from 'react-native-countdown-component';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTMLView from 'react-native-htmlview';
import {
  INDICATOR_COLOR, INDICATOR_SIZE, INDICATOR_VISIBILITY, OVERLAY_COLOR, TEXT_SIZE, TEXT_COLOR, ANIMATION, COLOR_GRAY, S18, S12, S14, COLOR_PRIMARY
} from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import store from '../../Stores/orderStore';
import styles from '../../../styles/Events/EventDetailStyleSheet';
import Slideshow from 'react-native-slideshow';

@observer export default class EventDetail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
      index: 0,
      images: [],
      timer: 0,
      position: 0,
      interval: null,
      data: [{ name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }],
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Event Detail',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: totalSize(2),
      fontWeight: 'normal'
    },
    headerStyle: {
      backgroundColor: navigation.state.params.headerColor
    }
  });
  componentWillMount = async() => {
    // calling eventDetail func
    await this.eventDetail()

  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  // Getting eventDetail data func 
  eventDetail = async () => {
    let { params } = this.props.navigation.state;
    let { orderStore } = Store;
    try {
      this.setState({ loading: true })
      //API calling
      let param = {
        event_id: params.event_id
      };
      let response = await ApiController.post('event-detial', param);
      orderStore.home.eventDetail = response;
      console.log('responseHome=', response);
      if (response.success === true) {
          await this.setState({
            interval: setInterval(() => {    
              this.setState({
                position: this.state.position === response.data.event_detial.gallery_images.length ? 0 : this.state.position + 1
              });
            }, 5000)
          });
        // CountDown func call
        await this.countDown(response.data.event_detial.event_timer_detial)
        for (var i = 0; i < response.data.event_detial.gallery_images.length; i++) {
          this.state.images.push({ url: response.data.event_detial.gallery_images[i].url })
        }
        this.setState({ loading: false })
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
  }
  countDown(eventDate) {
    var eventDate = new Date(eventDate);
    var currentDate = new Date();
    var differenceTravel = eventDate.getTime() - currentDate.getTime();
    var seconds = Math.floor((differenceTravel) / (1000));
    this.setState({ timer: seconds })
  }
  render() {
    let { orderStore } = Store;
    if (this.state.loading === true) {
      return (
        <View style={{ height: height(100), width: width(100), flex: 1 }}>
          <Spinner
            visible={INDICATOR_VISIBILITY}
            size={INDICATOR_SIZE}
            cancelable={true}
            color={data.main_clr}
            animation={ANIMATION}
            overlayColor={OVERLAY_COLOR}
            textStyle={{ fontSize: totalSize(TEXT_SIZE), color: TEXT_COLOR }}
          />
        </View>
      );
    } else {
      var data = orderStore.settings.data;
      var titles = orderStore.home.eventDetail.screen_text;
      var eventDetail = orderStore.home.eventDetail.data;
      var images = eventDetail.event_detial.gallery_images;
      var region = {
        latitude: parseFloat(eventDetail.event_detial.event_latitude),
        longitude: parseFloat(eventDetail.event_detial.event_longitude),
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
    }
    return (
      <View style={styles.container}>
        {
          this.state.loading ?
            null
            :
            <ScrollView>
              <View style={{ height: height(30), width: width(100), backgroundColor: 'red' }}>
                <Slideshow
                  height={height(30)}
                  dataSource={images}
                  position={this.state.position}
                  onPress={(index) => { this.setState({ modalVisible: true,index: this.state.position }) }}
                  onPositionChanged={ position => this.setState({ position: position })}
                  />
              </View>
              <View style={styles.subCon}>
                {/* {
              eventDetail.event_detial.has_gallery === true ?
                <View style={{ height: height(13), flexDirection: 'row' }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={eventDetail.event_detial.gallery_images}
                    renderItem={({ item }) =>
                      <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { this.setState({ modalVisible: true }) }}>
                        <Image source={{ uri: item.small_img }} style={styles.imageItem} />
                      </TouchableOpacity>
                    }
                  />
                </View>
                : null
            } */}
                <View style={styles.tableCon}>
                  <View style={styles.tableRowCon}>
                    <Text style={[styles.tableHeaderText, { fontSize: totalSize(S18), marginRight: 100 }]}>{eventDetail.event_detial.event_title}</Text>
                    <Text style={[styles.tableHeaderText, { fontSize: totalSize(S12), marginVertical: 2 }]}>{eventDetail.event_detial.event_posted_date}</Text>
                  </View>
                  <View style={styles.middleRowCon}>
                    <Image source={require('../../images/address.png')} style={styles.rowIcon} />
                    <Text style={styles.tableText}>{eventDetail.event_detial.event_location}</Text>
                  </View>
                  <View style={styles.middleRowCon}>
                    <Image source={require('../../images/categoryName.png')} style={styles.rowIcon} />
                    <Text style={styles.tableText}>{eventDetail.event_detial.event_category_name}</Text>
                  </View>
                  <View style={styles.middleRowCon}>
                    <Image source={require('../../images/calendar.png')} style={styles.rowIcon} />
                    <Text style={styles.tableText}>{eventDetail.event_detial.event_start_date} - {eventDetail.event_detial.event_end_date}</Text>
                  </View>
                  <View style={styles.timmerCon}>
                    <CountDown
                      until={this.state.timer}
                      digitTxtColor={COLOR_PRIMARY}
                      timeTxtColor='#000000'
                      digitBgColor= { data.main_clr }
                      timeToShow={['D', 'H', 'M', 'S']}
                      label={'Days' / 'Hours' / 'Minutes' / 'Seconds'}
                      onFinish={() => alert('finished')}
                      onPress={() => alert('hello')}
                      size={15}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginVertical: 15 }}>
                  <Text style={styles.disTitle}>{titles.desc}</Text>
                  <HTMLView
                    value={eventDetail.event_detial.event_desc}
                    stylesheet={{
                      width: width(100),
                      marginHorizontal: 15,
                      marginVertical: 3,
                      fontSize: totalSize(1.5),
                      // fontFamily: FONT_NORMAL,
                      // color: COLOR_GRAY,
                      textAlignVertical: 'center'
                    }}
                  />
                  <Text style={styles.disText}>{eventDetail.event_detial.event_desc}</Text>
                </View>
                <View style={styles.mapCon}>
                  <MapView
                    ref={(ref) => this.mapView = ref}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    showsBuildings={true}
                    showsIndoors={true}
                    provider={PROVIDER_GOOGLE}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    mapType={"standard"}
                    loadingEnabled={true}
                    loadingIndicatorColor={'#ffffff'}
                    // loadingBackgroundColor = 'transparent'
                    moveOnMarkerPress={false}
                    style={styles.map}
                    region={region}
                  // onRegionChange={this.onRegionChange.bind(this)}
                  >
                    <MapView.Marker
                      coordinate={
                        region
                      }
                      title={'Current location'}
                      description={'I am here'}
                      pinColor={'#3edc6d'}
                    />
                  </MapView>
                </View>
                <View style={styles.profileCon}>
                  <View style={styles.imgCon}>
                    <Avatar
                      medium
                      rounded
                      source={{ uri: eventDetail.event_detial.event_author_img }}
                      // onPress={() => console.warn("Works!")}
                      activeOpacity={1}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.autherText}>{eventDetail.event_detial.event_author_name}</Text>
                    <Text style={[styles.autherText, { fontSize: totalSize(S14) }]}>{eventDetail.event_detial.event_author_location}</Text>
                  </View>
                  <View style={styles.viewBtn}>
                    <TouchableOpacity style={[styles.viewBtnCon,{ backgroundColor: data.main_clr }]}>
                      <Text style={styles.viewBtnText}>{titles.profile_btn}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {
                  eventDetail.comments.comments[0] !== "No Comment Found" ?
                    <View style={{ flex: 1, marginVertical: 10 }}>
                      <View style={{ height: height(5), justifyContent: 'center' }}>
                        <Text style={styles.commentTitle}>All Comments ({eventDetail.comments.comments.length})</Text>
                      </View>
                      <FlatList
                        data={eventDetail.comments.comments}
                        renderItem={({ item }) =>
                          <View style={{ flex: 1, marginVertical: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
                              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <Avatar
                                  medium
                                  rounded
                                  source={{ uri: item.comment_author_img }}
                                  // onPress={() => console.warn("Works!")}
                                  activeOpacity={1}
                                />
                              </View>
                              <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'flex-start' }}>
                                <Text style={styles.commentAuthName}>{item.comment_author_name}</Text>
                                <Text style={styles.commentDate}>{item.comment_date}</Text>
                                <Text style={styles.commentContent}>{item.comment_content}</Text>
                              </View>
                            </View>
                            {
                              item.has_reply === true ?
                                item.reply.map((item, key) => (
                                  <View key={key} style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginHorizontal: 20 }}>
                                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                      <Avatar
                                        medium
                                        rounded
                                        source={{ uri: item.comment_author_img }}
                                        // onPress={() => console.warn("Works!")}
                                        activeOpacity={1}
                                      />
                                    </View>
                                    <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'flex-start' }}>
                                      <Text style={styles.commentAuthName}>{item.comment_author_name}</Text>
                                      <Text style={styles.commentDate}>{item.comment_date}</Text>
                                      <Text style={styles.commentContent}>{item.comment_content}</Text>
                                    </View>
                                  </View>
                                ))
                                : null
                            }
                          </View>
                        }
                      />
                    </View>
                    :
                    <View style={{ height: height(5), justifyContent: 'center' }}>
                      <Text style={styles.commentTitle}>{eventDetail.comments.comments[0]}</Text>
                    </View>
                }
                <View style={styles.textInputCon}>
                  <TextInput
                    onChangeText={(value) => this.setState({ email: value })}
                    underlineColorAndroid='transparent'
                    placeholder={eventDetail.comment_form.textarea}
                    placeholderTextColor={COLOR_GRAY}
                    underlineColorAndroid='transparent'
                    multiLine={true}
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity style={[styles.submitBtnCon,{ backgroundColor: data.main_clr }]}>
                  <Text style={styles.submitBtnText}>{eventDetail.comment_form.btn_submit}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
        }
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          style={{ flex: 1 }}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            imageUrls={eventDetail.event_detial.gallery_images}
            index={this.state.index}
            pageAnimateTime={500}
            backgroundColor='black'
            onDoubleClick={() => {
              this.setState({ modalVisible: false })
            }}
            onSwipeDown={() => {
              this.setState({ modalVisible: false })
              // console.log('onSwipeDown');
            }}
            enableSwipeDown={true}
          />
        </Modal>
      </View>
    );
  }
}
