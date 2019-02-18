import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { COLOR_PRIMARY, S25, S2, S18, S17, S16, S15, S14, COLOR_SECONDARY } from './common';

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
  logoView: {
    height: height(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImg: {
    height: height(7),
    width: width(51.5),
    resizeMode: 'contain'
  },
  logoTxt: {
    height: height(12),
    width: width(60),
    marginHorizontal: 10,
    textAlign: 'center',
    marginTop: 7,
    fontSize: totalSize(S25),
    color: 'white'
  },
  buttonView: {
    height: height(40),
    alignItems: 'center',
  },
  signInBtn: {
    height: height(6),
    width: width(65),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(172, 172, 172, 0.2)',
    borderColor: 'rgba(172, 172, 172, 0.5)',
    borderWidth: 1
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
    // fontFamily: FONT_BOLD,
    fontWeight: 'bold',
    fontSize: totalSize(S18),
    color: COLOR_PRIMARY,
  },
  signUpTxt: {
    // fontFamily: FONT_BOLD,
    fontWeight: 'bold',
    fontSize: totalSize(S18),
    color: COLOR_PRIMARY,
  },
  expTxt: {
    height: height(10),
    width: width(65),
    textAlign: 'center',
    // fontFamily: FONT_NORMAL,
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: totalSize(S14),
    color: COLOR_SECONDARY
  }
});

export default styles;
