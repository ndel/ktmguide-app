import React, { Component } from 'react';
import {
  Text, View, Image, ImageBackground, TouchableOpacity, I18nManager,
  ScrollView, TextInput, WebView,Linking
} from 'react-native';
import Modal from "react-native-modal";
import call from 'react-native-phone-call';
import { width, height, totalSize } from 'react-native-dimension';
import Accordion from 'react-native-collapsible/Accordion';
import { Avatar } from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTMLView from 'react-native-htmlview';
import { COLOR_PRIMARY, COLOR_ORANGE, COLOR_GRAY, COLOR_SECONDARY,S14 } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import store from '../../Stores/orderStore';
import Claim from './Claim'
import Report from './Report'
import styles from '../../../styles/DescriptionStyleSheet';
import FeatureDetail from './FeatureDetail';
import { Toast } from 'native-base';
const SECTIONS = [
  {
    title: 'First',
    content: [{ name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }],
  },
];
@observer export default class Description extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      getCoupon: false,
      reportModel: false,
      modalVisible: false,
      isClaimVisible: false,
      images: [],
      index: 0,
      timer: 0,
      web: false,
      data: [{ name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }],
    }
    // I18nManager.forceRTL(false);
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount = async () => {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    // CountDown func call
    await this.countDown(data.coupon_details.expiry_date)
    if (data.has_gallery) {
      for (let i = 0; i < data.gallery_images.length; i++) {
       await this.state.images.push({ url: data.gallery_images[i].url })
      }
    }
    // console.log('iamges=', this.state.images);
  }
  call = (number) => {
    const args = {
      number: number, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }

    call(args).catch(console.error)
  }
  webSite =(url)=> {
    if (url !== "") {
      Linking.openURL(url);
    } 
  }
  setModalVisible = (state, prop) => {
    if (state === 'claim' && prop === false) {
      this.setState({ reportModel: false, isClaimVisible: true })
    } else {
      if (state === 'report') {
        this.setState({ reportModel: true, isClaimVisible: false })
      }
    }
  }
  hideModels = (state, hide) => {
    if (state === 'claim') {
      this.setState({ isClaimVisible: hide, reportModel: hide })
    } else {
      if (state === 'report') {
        this.setState({ reportModel: hide, reportModel: hide })
      }
    }
  }
  countDown(eventDate) {
    var eventDate = new Date(eventDate);
    var currentDate = new Date();
    var differenceTravel = eventDate.getTime() - currentDate.getTime();
    var seconds = Math.floor((differenceTravel) / (1000));
    this.setState({ timer: seconds })
  }
  _renderHeader = (section, isActive) => {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    return (
      <View style={[styles.labelCon,{ borderBottomWidth: 0 }]}>
        <Image source={require('../../images/clock.png')} style={styles.labelIcon} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={[styles.timeTxt, { color: data.color_code }]}>{data.business_hours_status}</Text>
        </View>
        <Image source={(isActive ? require('../../images/dropDown.png') : require('../../images/next.png'))} style={styles.dropDownIcon} />
      </View>
    );
  }
  _renderContent = (section, content) => {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    return (
      <View style={styles.renderCon}>
        {
          data.listing_hours.map((item, key) => {
            return (
              <View key={key} style={styles.renderStrip}>
                <View style={styles.stripDay}>
                  {item.current_day !== true ? <Text style={styles.renderDayTxt}>{item.day_name}</Text> : <Text style={[styles.renderDayTxt, { color: '#32cb55', fontWeight: 'bold' }]}>{item.day_name}</Text>}
                </View>
                <View style={styles.stripTime}>
                  {item.current_day !== true ? <Text style={styles.renderTimeTxt}>{item.is_closed === true ? "closed" : item.timingz}</Text> : <Text style={[styles.renderTimeTxt, { color: '#32cb55', fontWeight: 'bold' }]}>{item.is_closed === true ? "closed" : item.timingz}</Text>}
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
  render() {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    var auth_img = data.listing_author_dp;
    var main_clr = store.settings.data.main_clr;
    return (
      <View style={styles.container}>
        <ScrollView>
          <FeatureDetail callModel={this.setModalVisible} />
          {
            data.has_gallery === false ? null :
              <View style={styles.listCon}>
                {
                  data.gallery_images.map((item, key) => {
                    return (
                      <TouchableOpacity key={key} style={styles.flatlistChild} onPress={() => { this.setState({ modalVisible: true, index: key }) }} >
                        <Image source={{ uri: item.small_img }} style={styles.childImg} />
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
          }
          {
            data.street_address.length > 0 ?
              <View style={styles.labelCon}>
                <Image source={require('../../images/address.png')} style={styles.labelIcon} />
                <View style={styles.labeTxtCon}>
                  <Text style={styles.labelTxt}>{data.street_address}</Text>
                </View>
              </View>
              : null
          }
          {
            data.contact_no.length > 0 ?
              <TouchableOpacity style={styles.labelCon} onPress={() => this.call(data.contact_no)}>
                <Image source={require('../../images/call.png')} style={styles.labelIcon} />
                <View style={styles.labeTxtCon}>
                  <Text style={styles.labelTxt}>{data.contact_no}</Text>
                </View>
              </TouchableOpacity>
              : null
          }
          {
            data.web_url.length > 0 ?
              <TouchableOpacity style={styles.labelCon} onPress={() => this.webSite(data.web_url)}>
                <Image source={require('../../images/global.png')} style={styles.labelIcon} />
                <View style={styles.labeTxtCon}>
                  <Text style={styles.labelTxt}>{data.view_website}</Text>
                </View>
              </TouchableOpacity>
              : null
          }
          {
            data.pricing.length > 0?
            <View style={styles.labelCon}>
              <Image source={require('../../images/dollar.png')} style={styles.labelIcon} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={styles.priceTxt}>{data.pricing_txt}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={styles.dollarTxt}>{data.pricing}</Text>
              </View>
            </View>
            : null
          }
          <Accordion
            sections={SECTIONS}
            collapsed={false}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            disabled={!data.show_all_days}
          />
          {!data.listing_has_coupon ? null :
            <View style={styles.dealBox}>
              <View style={styles.cuponBtnCon}>
                <TouchableOpacity style={[styles.cuponBtn,{ backgroundColor: main_clr }]} onPress={() => this.setState({ getCoupon: true }) }>
                  <Text style={styles.cuponBtnTxt}>{data.coupon_details.btn_txt}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.expCon}>
                <Text style={styles.expTxt}>{data.coupon_details.expiry_txt}</Text>
                <View style={styles.expTimeCon}>
                  <CountDown
                    until={this.state.timer}
                    digitTxtColor= { COLOR_PRIMARY }
                    timeTxtColor='#000000'
                    digitBgColor= {main_clr}
                    timeToShow={['D', 'H', 'M', 'S']}
                    label={'Days' / 'Hours' / 'Minutes' / 'Seconds'}
                    // onFinish={() => alert('Deal Expired')}
                    // onPress={() => alert('Deal Not Expired')}
                    size={15}
                  />
                </View>
              </View>
            </View>
          }
          <View style={styles.profileCon}>
              <View style={styles.imgCon}>
                <Avatar
                  medium
                  rounded
                  source={{ uri: auth_img }}
                  // onPress={() => console.warn("Works!")}
                  activeOpacity={1}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.autherText}>{ data.listing_author_name }</Text>
                <Text style={[styles.autherText, { fontSize: totalSize(S14) }]}>{ data.listing_author_location }</Text>
              </View>
              <View style={styles.viewBtn}>
                <TouchableOpacity style={[styles.viewBtnCon,{ backgroundColor: main_clr }]}>
                  <Text style={styles.viewBtnText}>{ data.view_profile }</Text>
                </TouchableOpacity>
              </View>
            </View>
          <Text style={styles.titleTxt}>{data.desc.tab_txt}</Text>
          <View style={{ width: width(90), alignSelf: 'center', marginHorizontal: 10, justifyContent: 'center' }} >
            <HTMLView
              value={data.desc.tab_desc}
              stylesheet={styles.longTxt}
            />
          </View>
        </ScrollView>
        <Modal
          animationInTiming={200}
          animationOutTiming={100}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          avoidKeyboard={true}
          transparent={true}
          isVisible={this.state.getCoupon}
          onBackdropPress={() => this.setState({ getCoupon: false }) }
          style={{ flex: 1 }}>
          <View style={{ height: height(38), width: width(90), alignSelf: 'center', backgroundColor: COLOR_PRIMARY }}>
            <View style={{ flex: 1 }}>
              <View style={{ height: height(4), alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ elevation: 3, height: height(3.5), width: width(6), justifyContent: 'center', alignItems: 'center', backgroundColor: main_clr }} onPress={() => { this.setState({ getCoupon: false }) }}>
                  <Image source={require('../../images/clear-button.png')} style={{ height: height(2), width: width(3), resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ fontSize: totalSize(1.7), color: 'black', marginTop: 0, fontWeight: 'bold' }}>{data.coupon_details.title}</Text>
                <Text style={{ fontSize: totalSize(1.5), color: 'gray', textAlign: 'center', marginHorizontal: 10, marginVertical: 5, }}>{data.coupon_details.desc}</Text>
                <Text style={{ fontSize: totalSize(1.6), color: 'black' }}>{data.coupon_details.coupon_txt}</Text>
              </View>
              <Text selectable={true} style={{ height: height(6), marginHorizontal: 20, padding: 10, marginVertical: 5, textAlign: 'center', borderStyle: 'dashed', borderRadius: 5, borderWidth: 1, borderColor: 'red', backgroundColor: COLOR_PRIMARY, color: COLOR_SECONDARY, fontSize: totalSize(1.6) }}>{data.coupon_details.coupon_code}</Text>
              <Text style={{ fontSize: totalSize(1.5), color: 'gray', marginVertical: 5, alignSelf: 'center' }}>{data.coupon_details.click_to_copy}</Text>
              <Text style={{ fontSize: totalSize(1.5), color: 'gray', marginVertical: 5, alignSelf: 'center' }}>{data.coupon_details.validity_txt} {data.coupon_details.valid_till}</Text>
              {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: totalSize(1.5), color: 'black', marginVertical: 5, alignSelf: 'center' }}>Note: </Text>
                <Text style={{ fontSize: totalSize(1.5), color: 'gray', marginVertical: 5, alignSelf: 'center' }}>{ data.coupon_details.click_to_copy }</Text>
              </View> */}
            </View>
            <TouchableOpacity style={{ elevation: 3, height: height(6), justifyContent: 'center', alignItems: 'center', backgroundColor: main_clr }} onPress={() => { this.setState({ reportModel: false }) , this.webSite( data.coupon_details.referal_link ) }}>
              <Text style={{ fontSize: totalSize(1.8), color: COLOR_PRIMARY, fontWeight: 'bold' }}>{data.coupon_details.referal_btn_txt}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationInTiming={500}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          avoidKeyboard={true}
          // transparent={false}
          isVisible={this.state.reportModel}
          onBackdropPress={() => this.setState({reportModel: false })}
          style={{ flex: 1 }}>
          <Report hideModels={this.hideModels} />
        </Modal>
        <Modal
          animationInTiming={500}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          avoidKeyboard={true}
          // transparent={false}
          isVisible={this.state.isClaimVisible}
          onBackdropPress={() => this.setState({ isClaimVisible: false }) }
          style={{ flex: 1 }}>
          <Claim hideModels={this.hideModels} />
        </Modal>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          style={{ flex: 1 }}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
            imageUrls={this.state.images}
            index={this.state.index}
            pageAnimateTime={500}
            backgroundColor='black'
            transparent={false}
            enablePreload={true}
            style={{ flex: 1, backgroundColor: 'black' }}
            footerContainerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
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
//counter
// <View style={styles.expCon}>
//   <Text style={styles.expTxt}>Expires in</Text>
//   <View style={styles.expTimeCon}>
//     <View style={styles.timeSubCon}>
//       <Text style={styles.dayTxt}>22</Text>
//       <Text style={styles.dayTxt}>Days</Text>
//     </View>
//     <View style={styles.timeSubCon}>
//       <Text style={styles.hourTxt}>00</Text>
//       <Text style={styles.hourTxt}>Hours</Text>
//     </View>
//     <View style={styles.timeSubConWide}>
//       <Text style={styles.minuteTxt}>06</Text>
//       <Text style={styles.minuteTxt}>Minutes</Text>
//     </View>
//     <View style={styles.timeSubConWide}>
//       <Text style={styles.secondTxt}>23</Text>
//       <Text style={styles.secondTxt}>Seconds</Text>
//     </View>
//   </View>
// </View>
