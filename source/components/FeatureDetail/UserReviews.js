import React, { Component } from 'react';
import {
  Platform, ActivityIndicator, Text, View, Picker, Image, ImageBackground, TouchableOpacity, I18nManager,
  ScrollView, TextInput, FlatList
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { width, height, totalSize } from 'react-native-dimension';
import * as Progress from 'react-native-progress';
import RNShineButton from 'react-native-shine-button';
import HTMLView from 'react-native-htmlview';
import Grading from 'react-native-grading';
import Accordion from 'react-native-collapsible/Accordion';
import { Avatar } from 'react-native-elements';
import Modal from "react-native-modal";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Toast from 'react-native-simple-toast';
import { FONT_NORMAL, COLOR_PRIMARY, COLOR_ORANGE, COLOR_GRAY, COLOR_SECONDARY, S2, S18 } from '../../../styles/common';
import { observer } from 'mobx-react';
import Store from '../../Stores';
import store from '../../Stores/orderStore';
import Claim from './Claim'
import Report from './Report'
import Api from '../../ApiController/ApiController';
import styles from '../../../styles/UserReviewsStyleSheet';
import FeatureDetail from './FeatureDetail';
import { withNavigation } from 'react-navigation';

const SECTIONS = [
  {
    title: 'First',
    content: [{ name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }, { name: "Hotels" }],
  },
];
class UserReviews extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      is_accordin: false,
      modalVisible: false,
      reportModel: false,
      isClaimVisible: false,
      loadmore: false,
      name: '',
      isCollapsed: false,
      gallery: [],
      index: 0,
      com_id: '',
      report_reason: '',
      report_comments: '',
    }
    // I18nManager.forceRTL(false);
    this.changeStarScore = this.changeStarScore.bind(this);
  }
  static navigationOptions = { header: null };
  setModalVisible = (state,prop) => {
    if (state === 'claim' && prop === false) {
      this.setState({ reportModel: false , isClaimVisible: true })
    } else { 
      if (state === 'report') {
        this.setState({ reportModel: true , isClaimVisible: false })
      }
    }
  }
  hideModels = (state,hide) => {
    if (state === 'claim') {
      this.setState({ isClaimVisible: hide , reportModel: hide })
    } else { 
      if (state === 'report') {
        this.setState({ reportModel: hide , reportModel: hide })
      }
    }
  }
  changeStarScore(score) {
    this.setState({
      stars: { score: score }
    });
  }
  
  postReaction = async (comment_id, reaction_id) => {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial.listing_comments;
    let params = {
      comment_id: comment_id,
      reaction_id: reaction_id
    }
    // API Calling postReaction
    this.setState({ loading: true, com_id: comment_id })
    let response = await Api.post('listing-post-reviews', params);
    if (response.success) {
      data.listing_reviews.forEach((comment) => {
        if (comment.comment_id === comment_id) {
          switch (reaction_id) {
            case 1:
              comment.likes = response.data.total_count;
              break;
            case 2:
              comment.love = response.data.total_count;
              break;
            case 3:
              comment.wows = response.data.total_count;
              break;
            case 4:
              comment.angry = response.data.total_count;
              break;
            default:
              break;
          }
        }
      })
      this.setState({ loading: false })
    } else {
      this.setState({ loading: false })
      Toast.show(response.message);
    }
  }
  loadMore = async(pageNo) => {
    let { orderStore } = Store;
    let params = {
      listing_id: orderStore.home.LIST_ID, //orderStore.home.LIST_ID  3518
      next_page: pageNo
    }
    this.setState({ loadmore: true })
    var data = orderStore.home.FEATURE_DETAIL.data.listing_detial.listing_comments;
    let response = await Api.post('listing-more-reviews', params);
    if ( response.success ) {
        //forEach Loop LoadMore Reviewes
        response.data.listing_comments.listing_reviews.forEach((item)=>{
          data.listing_reviews.push(item);
        })
        data.pagination = response.data.listing_comments.pagination;
        this.setState({ loadmore: false })
    } else {
      this.setState({ loadmore: false })
    }
  }
  _getImage = (gallery_images, key) => {
    gallery_images.forEach(fun = async (image) => {
      await this.state.gallery.push({ url: image.url });
    });
    this.setState({ index: key, modalVisible: true })
  }

  _renderHeader = (section, content, isActive) => {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    return (
      <View style={styles.rateDropdown}>
        <Text style={styles.rateTxt}>{data.reviews.total_avg} {data.reviews.total_avg_txt} ({data.reviews.no_of_time_rated})</Text>
        <Image source={require('../../images/dropDown.png')} style={styles.dropDownImg} />
      </View>
    );
  }
  _renderContent(section, content, isActive) {
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
    return (
      <View style={styles.headerDropdown}>
        <View style={styles.stripCon}>
          <Text style={styles.ratingText}>5 stars</Text>
          <View style={styles.gradingCon}>
            <Grading mode="stars" scale={1.1} score={5} scoreBase={5} activeColor={COLOR_ORANGE} defaultColor={COLOR_GRAY} />
          </View>
          <Progress.Bar progress={data.reviews.total_score.star_5 / 100} width={totalSize(12)} height={totalSize(1)} color="red" unfilledColor="gray" borderWidth={0} animated={true} borderRadius={0} animationType="timing" />
          <Text style={styles.startScoreText}>{data.reviews.total_score.star_5}%</Text>
        </View>
        <View style={styles.stripCon}>
          <Text style={styles.ratingText}>4 stars</Text>
          <View style={styles.gradingCon}>
            <Grading mode="stars" scale={1.1} score={4} scoreBase={5} activeColor={COLOR_ORANGE} defaultColor={COLOR_GRAY} />
          </View>
          <Progress.Bar progress={data.reviews.total_score.star_4 / 100} width={totalSize(12)} height={totalSize(1)} color="red" unfilledColor="gray" borderWidth={0} animated={true} borderRadius={0} animationType="timing" />
          <Text style={styles.startScoreText}>{data.reviews.total_score.star_4}%</Text>
        </View>
        <View style={styles.stripCon}>
          <Text style={styles.ratingText}>3 stars</Text>
          <View style={styles.gradingCon}>
            <Grading mode="stars" scale={1.1} score={3} scoreBase={5} activeColor={COLOR_ORANGE} defaultColor={COLOR_GRAY} />
          </View>
          <Progress.Bar progress={data.reviews.total_score.star_3 / 100} width={totalSize(12)} height={totalSize(1)} color="red" unfilledColor="gray" borderWidth={0} animated={true} borderRadius={0} animationType="timing" />
          <Text style={styles.startScoreText}>{data.reviews.total_score.star_3}%</Text>
        </View>
        <View style={styles.stripCon}>
          <Text style={styles.ratingText}>2 stars</Text>
          <View style={styles.gradingCon}>
            <Grading mode="stars" scale={1.1} score={2} scoreBase={5} activeColor={COLOR_ORANGE} defaultColor={COLOR_GRAY} />
          </View>
          <Progress.Bar progress={data.reviews.total_score.star_2 / 100} width={totalSize(12)} height={totalSize(1)} color="red" unfilledColor="gray" borderWidth={0} animated={true} borderRadius={0} animationType="timing" />
          <Text style={styles.startScoreText}>{data.reviews.total_score.star_2}%</Text>
        </View>
        <View style={styles.stripCon}>
          <Text style={styles.ratingText}>1 stars</Text>
          <View style={styles.gradingCon}>
            <Grading mode="stars" scale={1.1} score={1} scoreBase={5} activeColor={COLOR_ORANGE} defaultColor={COLOR_GRAY} />
          </View>
          <Progress.Bar progress={data.reviews.total_score.star_1 / 100} width={totalSize(12)} height={totalSize(1)} color="red" unfilledColor="gray" borderWidth={0} animated={true} borderRadius={0} animationType="timing" />
          <Text style={styles.startScoreText}>{data.reviews.total_score.star_1}%</Text>
        </View>
      </View>
    );
  }
  _ratingStrip = (item, key) => {
    return (
      <View key={key} style={{ height: height(5), width: width(95), flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', borderBottomWidth: 0.3, borderColor: 'gray', marginTop: 10 }}>
        <Text style={{ height: height(3), width: width(15), paddingLeft: 5, fontSize: totalSize(1.3), fontFamily: FONT_NORMAL, color: 'black' }}>5 stars</Text>
        <Rating
          type='star'
          // ratingImage={WATER_IMAGE}
          ratingColor={COLOR_ORANGE}
          ratingBackgroundColor={COLOR_GRAY}
          startingValue={4}
          fractions={0}
          ratingCount={5}
          imageSize={totalSize(1.7)}
          onFinishRating={this.ratingCompleted}
          // showRating
          style={styles.ratingStyle}
        />
        <Progress.Bar
          progress={0.7}
          width={totalSize(12)}
          height={totalSize(1)}
          color="red"
          unfilledColor="gray"
          borderWidth={0}
          animated={true}
          borderRadius={0}
          animationType="timing"
        />
        <Text style={{ height: height(3), width: width(15), paddingLeft: 10, fontSize: totalSize(1.3), fontFamily: FONT_NORMAL, color: 'black' }}>50%</Text>
      </View>
    )
  }
  render() {
    let music = (<Icon family={"FontAwesome"} name={"music"} color={"#808080"} />);
    let anry = (<Icon family={"FontAwesome"} name={"angry"} color={"#808080"} />);
    let surprise = <Icon family={"FontAwesome5"} name={"surprise"} color={"#808080"} />;
    let { orderStore } = Store;
    let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
        
    return (
      <View style={styles.container}>
        <ScrollView>
          <FeatureDetail callModel={this.setModalVisible} />
          <View style={styles.subCon}>
            <Accordion
              sections={SECTIONS}
              animationDuration={300}
              // expanded={true}
              easing='linear'
              collapsed={false}
              onPress={()=>this.setState({ is_accordin: !this.state.is_accordin })}
              underlayColor={null}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              disabled={!data.has_reviews_score}
            />
            {
              data.listing_comments.listing_reviews.map((item, key) => {
                return (
                  <View key={key} style={styles.ratingDetail}>
                    <View style={styles.personDetail}>
                      <View style={styles.imgCon}>
                        <View style={styles.imgSubCon}>
                          <Avatar
                            large
                            rounded
                            source={{ uri: item.user_dp }}
                            onPress={()=>this.props.navigation.push('PublicProfileTab',{ profiler_id: item.user_id ,user_name: item.user_name })}
                            activeOpacity={1}
                          />
                        </View>
                      </View>
                      <View style={styles.detailPerson}>
                        <Text style={styles.personName}>{item.user_name}</Text>
                        <Text style={styles.location}>{item.comment_title}</Text>
                        <View style={styles.dateCon}>
                          <Text style={styles.date}>{item.comment_date}   </Text>
                          <View style={styles.gradingCon}>
                            <Grading
                              mode="stars"
                              scale={1.2}
                              score={item.comment_stars}
                              scoreBase={5}
                              activeColor={COLOR_ORANGE}
                              defaultColor={COLOR_GRAY}
                              onGrading={this.changeStarScore} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ width: width(25), alignItems: 'center' }}>
                        {
                          data.listing_comments.show_user_rank ?
                            <View style={{width:width(25),alignItems:'center'}}>
                              <TouchableOpacity style={{ backgroundColor: 'green', marginVertical: 3, borderRadius: 5, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.professionalBtn}>{item.user_rank_txt}</Text>
                              </TouchableOpacity>
                              <Text style={styles.rating}>{item.user_ratings}</Text>
                            </View>
                            :
                            null
                        }
                      </View>
                      <View style={{ width: width(70) }}>
                        <View style={{ marginHorizontal: 0,width:width(68),justifyContent:'flex-start',alignSelf:'flex-start' }}>
                          <HTMLView
                            value={item.comment_content}
                            stylesheet={styles.paragraph}
                          />
                        </View>
                        {/* <Text style={styles.paragraph}>{item.comment_content}</Text> */}
                        <View style={{ width: width(70), marginTop: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
                          {
                            item.has_gallery ?
                              item.gallery_images.map((image, key) => {
                                return (
                                  <TouchableOpacity key={key} style={styles.flatlistChild} onPress={() => { this._getImage(item.gallery_images, key) }}>
                                    <Image source={{ uri: image.small_img }} style={styles.childImg} />
                                  </TouchableOpacity>
                                );
                              })
                              :
                              null
                          }
                        </View>
                        <Text style={styles.likeSectonTitle}>{item.reaction_txt}</Text>
                        {
                          data.listing_comments.show_emojis ?
                            <View style={{ height: height(7), width: width(70), flexDirection: 'row' }}>
                              <View style={{ height: height(7), width: width(12), alignItems: 'center' }}>
                                <RNShineButton
                                  shape={"like"}
                                  color={"#808080"}
                                  fillColor={COLOR_ORANGE}
                                  size={totalSize(3)}
                                  value={false}
                                  onChange={() => this.postReaction(item.comment_id, 1)}
                                />
                                <Text style={{ color: 'black', fontSize: totalSize(1.6) }}>{item.likes}</Text>
                              </View>
                              <View style={{ width: width(12), alignItems: 'center' }}>
                                <RNShineButton
                                  shape={"heart"}
                                  color={"#808080"}
                                  fillColor={"#ff0000"}
                                  size={totalSize(3)}
                                  disabled={false}
                                  onChange={() => this.postReaction(item.comment_id, 2)}
                                />
                                <Text style={{ color: 'black', fontSize: totalSize(1.6) }}>{item.love}</Text>
                              </View>
                              <View style={{ width: width(12), alignItems: 'center' }}>
                                <RNShineButton
                                  shape={'smile'}
                                  color={"#808080"}
                                  fillColor={"#ff0000"}
                                  size={totalSize(3)}
                                  onChange={() => this.postReaction(item.comment_id, 3)}
                                />
                                <Text style={{ color: 'black', fontSize: totalSize(1.6) }}>{item.wows}</Text>
                              </View>
                              <View style={{ width: width(12), alignItems: 'center' }}>
                                <RNShineButton
                                  shape={<Icon family={"FontAwesome"} name={"music"} color={"#808080"} />}
                                  color={"#808080"}
                                  fillColor={COLOR_ORANGE}
                                  size={totalSize(3)}
                                  onChange={() => this.postReaction(item.comment_id, 4)}
                                />
                                <Text style={{ color: 'black', fontSize: totalSize(1.6) }}>{item.angry}</Text>
                              </View>
                              {
                                this.state.loading && item.comment_id === this.state.com_id ?
                                  <View style={{ flex: 1 }}>
                                    <ActivityIndicator size='small' color='gray' animating={true} />
                                  </View>
                                  : null
                              }
                            </View>
                            :
                            null
                        }
                        {
                          item.has_reply ?
                            <View style={{ width: width(70), justifyContent: 'center', backgroundColor: 'rgba(220,220,220,0.3)' }}>
                              {
                                item.author_reply.map((item, key) => {
                                  return (
                                    <View key={key} style={{ marginHorizontal: 5 }}>
                                      <Text style={{ fontSize: totalSize(1.7), color: COLOR_SECONDARY, fontWeight: 'bold', marginHorizontal: 3, marginTop: 10 }}>
                                        {item.author_responded_txt}
                                        <Text style={{ fontSize: totalSize(1.6), color: COLOR_SECONDARY, fontWeight: 'normal' }}> {item.responded_on}</Text>
                                      </Text>
                                      <View style={{ marginHorizontal: 6, marginBottom: 10 }}>
                                        <HTMLView
                                          value={item.responded_msg}
                                          stylesheet={styles.paragraph}
                                        />
                                      </View>
                                      {/* <Text style={{ fontSize: totalSize(1.6), color: 'gray', fontWeight: 'normal', marginHorizontal: 4, marginTop: 3, marginBottom: 10 }}>{item.responded_msg}</Text> */}
                                    </View>
                                  );
                                })
                              }
                            </View>
                            :
                            null
                        }
                      </View>
                    </View>
                  </View>
                );
              })
            }
            {
              data.listing_comments.pagination.has_next_page?
                <TouchableOpacity style={{backgroundColor: store.settings.data.main_clr,justifyContent:'center',alignItems:'center',alignSelf:'center',marginVertical: 10,borderRadius: 5}} onPress={()=>this.loadMore(data.listing_comments.pagination.next_page)}>
                  {
                    this.state.loadmore?
                      <View style={{marginHorizontal: 15,marginVertical: 5}}>
                        <ActivityIndicator color='white' size='small' animating={true}/>
                      </View>
                      :
                      <Text style={{fontSize:totalSize(S18),color: COLOR_PRIMARY,marginHorizontal: 15,marginVertical: 5}}>{data.listing_comments.load_more}</Text>
                  }
                </TouchableOpacity>
                : null
            }
          </View>
        </ScrollView>
        <Modal
          animationInTiming={500}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          avoidKeyboard={true}
          // transparent={false}
          isVisible={this.state.reportModel }
          onBackdropPress={() => this.setState({ reportModel: false }) }
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
          onRequestClose={() => this.setState({ modalVisible: false, gallery: [] })}
        >
          <ImageViewer
            imageUrls={this.state.gallery}
            index={this.state.index}
            pageAnimateTime={500}
            backgroundColor='black'
            transparent={false}
            enablePreload={true}
            style={{ flex: 1, backgroundColor: 'black' }}
            footerContainerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
            onDoubleClick={() => {
              this.setState({ modalVisible: false, gallery: [] })
            }}
            onSwipeDown={() => {
              this.setState({ modalVisible: false, gallery: [] })
              // console.log('onSwipeDown');
            }}
            enableSwipeDown={true}
          />
        </Modal>
      </View>
    );
  }
}
export default withNavigation(UserReviews);
{/* <Picker
  selectedValue={this.state.language}
  mode={Platform.OS === 'android' ? 'dropdown' : null}
  style={{ height: height(6), width: width(75), backgroundColor: 'red', alignSelf: 'center' }}
  itemStyle={Platform.OS === 'ios' ? { color: 'black', fontSize: totalSize(1.6), fontWeight: 'normal' } : null}
  onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}