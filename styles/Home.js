import React, { Component, PropTypes } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { FONT_BOLD, COLOR_SECONDARY, COLOR_ORANGE, COLOR_PRIMARY, COLOR_RED, S2, S18, S16, S15, S14, S13 } from './common';
import { width, height, totalSize } from 'react-native-dimension';
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  IndicatorCon: {
    height: height(100),
    width: width(100),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subCon: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  overlyHeader: {
    height: height(8),
    width: width(100),
    zIndex: 1000,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center'
  },
  drawerBtnCon: {
    // height:height(4),
    // width:width(15),
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  drawerBtn: {
    height: height(2.6),
    width: width(15),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  headerTxtCon: {
    // height:height(3.3),
    // width:width(55),
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerTxt: {
    // fontFamily: FONT_BOLD,
    fontWeight: 'bold',
    fontSize: totalSize(S2),
    color: '#ffffff',
  },
  headerSearch: {
    height: height(3.2),
    width: width(15),
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  cart: {
    height: height(3.2),
    width: width(15),
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  topViewCon: {
    alignSelf: 'center',
    overflow: 'hidden',
    height: width(100) / 1.5,
    width: width(100),
    overflow: 'hidden',
    // backgroundColor:'red' 
  },
  InnerRadius: {
    borderRadius: window.width,
    width: width(100) * 2,
    height: width(100) * 2.5,
    marginLeft: -(width(100) / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    // backgroundColor:'orange'
  },
  imageCon: {
    height: width(100) / 1.5,
    width: width(100),
    position: 'absolute',
    bottom: 0,
    marginLeft: width(100) / 2,
    // backgroundColor: 'black'
  },
  findTxtCon: {
    height: height(16),
    width: width(90),
    justifyContent: 'flex-end',
  },
  firTxt: {
    // fontFamily: FONT_BOLD,
    fontWeight: 'bold',
    fontSize: totalSize(2.2),
    color: '#ffffff'
  },
  secTxt: {
    // fontFamily: FONT_NORMAL,
    marginHorizontal: 19,
    fontSize: totalSize(S15),
    marginVertical: 2,
    textAlignVertical: 'center',
    color: '#ffffff'
  },
  searchCon: {
    height: height(6),
    width: width(90),
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginVertical: 2,
    flexDirection: 'row'
  },
  txtInput: {
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S15),
    width: width(80),
    height: height(6),
    margin: 2,
    paddingHorizontal: 5
  },
  searchIcon: {
    height: height(2.5),
    width: width(8),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  flatlistCon: {
    // height: height(43),
    flex: 1,
    width: width(92),
    alignSelf: 'center',
    // position: 'absolute',
    alignItems: 'flex-end'
    // marginTop: Platform.OS === 'ios' ? 150 : 140,
  },
  flatlistChild: {
    height: height(13),
    width: width(26),
    marginVertical: 15,
    marginHorizontal: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    ...Platform.select({
      ios: { shadowColor: 'gray', shadowOpacity: 0.2, shadowRadius: 2 },
      android: { elevation: 2, }
    }),
  },
  cateCon: {
    height: height(25),
    width: width(70),
    marginBottom: 10,
    alignSelf: 'center',
    marginRight: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    ...Platform.select({
      ios: { shadowColor: 'gray', shadowOpacity: 0.3, shadowRadius: 5 },
      android: { elevation: 5, }
    }),
  },
  childImg: {
    height: height(8),
    width: width(15),
    borderRadius: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  childTxt: {
    // fontFamily: FONT_NORMAL,
    width: width(18),
    fontSize: totalSize(S15),
    alignSelf: 'center',
    textAlign: 'center',
    color: COLOR_SECONDARY,
    marginVertical: 3
  },
  recList: {
    fontWeight: 'bold',
    fontSize: totalSize(S2),
    color: 'black',
    // textDecorationLine:'underline',
  },
  latestFeature: {
    // textAlignVertical:'center',
    fontSize: totalSize(S14),
    color: 'black',
    marginHorizontal: 5
  },
  featuredFLItem: {
    // shadowOffset: { width: 3, height: 3 },
    marginHorizontal: 5,
    ...Platform.select({
      ios: { shadowColor: 'gray', shadowOpacity: 0.2, shadowRadius: 2 },
      android: { elevation: 2, }
    }),
    height: height(16),
    width: width(90),
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,1)',
    // borderWidth: 0.1,
    // borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5
  },
  featuredImg: {
    height: height(16),
    width: width(32),
    alignSelf: 'stretch',
    margin: 0,
    alignItems: 'flex-start',
    borderRadius: 5
  },
  closedBtn: {
    // height:height(3),
    // width:width(18),
    borderRadius: 4,
    backgroundColor: COLOR_ORANGE,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center'
  },
  closedBtnTxt: {
    marginHorizontal: 7,
    marginVertical: 3,
    color: COLOR_PRIMARY,
    fontSize: totalSize(S15),
    // alignSelf:'center'
  },
  txtViewCon: {
    height: height(16),
    width: width(55),
    justifyContent: 'center'
  },
  txtViewHeading: {
    // fontFamily: 'italic',
    fontWeight: '500',
    // height: height(6),
    width: width(45),
    marginTop: 3,
    marginBottom: 1,
    marginLeft: 10,
    fontSize: totalSize(S16),
    color: 'black',
  },
  subHeadingTxt: {
    // fontFamily: FONT_NORMAL,
    // height: height(3),
    // width: width(45),
    marginTop: 0,
    marginLeft: 10,
    fontSize: totalSize(S15),
  },
  ratingCon: {
    // height: height(8),
    marginTop: 3,
    width: width(55),
    flexDirection: 'row',
  },
  ratingStyle: {
    height: height(3),
    width: width(18),
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    // marginHorizontal: 1,
    // paddingVertical:10,
    // paddingHorizontal:10
  },
  gradingCon: {
    // height: height(3),
    width: width(22),
    justifyContent: 'center',
  },
  ratingTxt: {
    marginTop: 0,
    marginLeft: 0,
    fontSize: totalSize(S15),
    // color: COLOR_ORANGE,
  },
  cate_con: {
    height: height(8),
    width: width(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  readMoreBtnCon: {
    height: height(4),
    // width: width(22),
    borderRadius: 3,
    borderColor: COLOR_ORANGE,
    alignSelf: 'center',
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cate_img: {
    height: height(27),
    width: width(72),
    borderRadius: 5,
    overflow: 'hidden'
  },
  cate_name: {
    backgroundColor: COLOR_RED,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 3
  },
  cateNameText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: totalSize(S13),
    color: COLOR_PRIMARY
  },
  eventTitle: {
    fontSize: totalSize(S18),
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
    marginVertical: 2,
    marginHorizontal: 15
  },
  locIcon: {
    height: height(2.5),
    width: width(5),
    resizeMode: 'contain',
    marginRight: 5
  },
  locText: {
    fontSize: totalSize(S16),
    color: COLOR_PRIMARY,
    marginRight: 5
  },
  exploreBtn: {
    height: height(7),
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_ORANGE
  },
  cate_text: {
    fontSize: totalSize(S15),
    color: COLOR_PRIMARY,
    marginRight: 5
  },
  btnIcon: {
    height: height(2.5),
    width: width(8),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  explorebtnTxt: {
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S16),
    color: '#ffffff'
  },
});

export default styles;
