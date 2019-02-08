import React, { Component, PropTypes } from 'react';
import { I18nManager,StyleSheet } from 'react-native';
import {  FONT_BOLD, COLOR_PRIMARY, S25, S2, S18, S17, S16, S15, S14, S13, S12, S11 } from './common';
import { width, height, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCon: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  bckImgCon: {
    width: width(10),
    justifyContent: 'flex-end',
    alignItems:'center',
  },
  backBtn: {
    height: height(2.5),
    width: width(3),
    marginLeft: 25,
    resizeMode: 'contain',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  headerTxt: {
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S2),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    paddingEnd: 25,
  },
  logoView: {
    height: height(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: height(7.6),
    width: width(55.8),
    resizeMode: 'contain'
  },
  logoTxt: {
    height: height(12),
    width: width(65),
    textAlign: 'center',
    // fontFamily: FONT_NORMAL,
    marginTop: 7,
    fontSize: totalSize(S25),
    color: 'white'
  },
  buttonView: {
    height: height(50),
    alignItems: 'center',
  },
  userImg: {
    height: height(3.7),
    width: width(5),
    marginHorizontal: 15
  },
  mail: {
    height: height(5.5),
    width: width(5.5),
    marginHorizontal: 15,
  },
  btn: {
    height: height(5.5),
    width: width(65),
    flexDirection: 'row',
    borderRadius: 3,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(172, 172, 172, 0.2)',
    borderColor: 'rgba(172, 172, 172, 0.5)',
    borderWidth: 1
  },
  inputTxt: {
    alignSelf: 'stretch',
    height: height(6),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    textAlignVertical: 'center',
    fontSize: totalSize(S15),
    color: COLOR_PRIMARY,

  },
  signUpBtn: {
    height: height(6),
    width: width(65),
    marginTop: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc400'
  },
  signTxt: {
    fontWeight: 'bold',
    // fontFamily: FONT_BOLD,
    fontSize: totalSize(S2),
    color: COLOR_PRIMARY,
  },
  signUpTxt: {
    fontFamily: FONT_BOLD,
    fontSize: totalSize(S18),
    color: COLOR_PRIMARY,
  },
  fgBtn: {
    height: height(5.5),
    width: width(65),
    flexDirection: 'row',
    marginTop: 20
  },
  other: {
    height: height(5.5),
    width: width(29.5),
    resizeMode: 'contain',
  },
  orTxt: {
    // height:height(5.5),
    marginTop: 10,
    width: width(6),
    textAlign: 'center',
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S12),
    color: '#ffffff',
  },
  forgetpwrd: {
    height: height(3),
    width: width(30),
    textAlign: 'left',
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S15),
    color: 'black'
  },
  newHere: {
    height: height(3),
    width: width(20),
    textAlign: 'right',
    // fontFamily: FONT_NORMAL,
    fontSize: totalSize(S14),
    color: 'black'
  },
  signInT: {
    height: height(3),
    width: width(13),
    // fontFamily: FONT_BOLD,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: totalSize(S15),
    textDecorationLine: 'underline',
    color: 'black',
  },
  footer: {
    height: height(7),
    width: width(65),
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  },
});

export default styles;
