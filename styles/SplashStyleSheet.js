import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { INDICATOR_COLOR, COLOR_PRIMARY, S25, S2, S18, S17, S16, S15, S14, S13, S12, S11 } from './common';
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
    },
    imgConShadow: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    instructions: {
        textAlign: 'center',
        color: INDICATOR_COLOR,
        marginBottom: 5,
    },
    LogoCon: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    slogoTitle: {
        fontSize: totalSize(S25),
        color: COLOR_PRIMARY,
        textAlign: 'center',
        marginHorizontal: 70,
        marginVertical: 5
    },
    IndicatorCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
