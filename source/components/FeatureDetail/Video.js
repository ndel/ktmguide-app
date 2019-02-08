import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import Modal from "react-native-modal";
import { observer } from 'mobx-react';
import YouTube from 'react-native-youtube';
import { height , width , totalSize } from 'react-native-dimension';
import Store from '../../Stores';
import Claim from './Claim'
import Report from './Report'
import styles from '../../../styles/LocationStyleSheet';
import FeatureDetail from './FeatureDetail';
import { YOUTUBE_API_KEY } from '../../../styles/common';
@observer export default class Location extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            reportModel: false,
            isClaimVisible: false,
            height: 38
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
    static navigationOptions = {
        header: null,
    };
    render() {
        let { orderStore } = Store;
        let data = orderStore.home.FEATURE_DETAIL.data.listing_detial;
        return (
            <View style={styles.container}>
                <FeatureDetail callModel={this.setModalVisible} />
                <YouTube
                    ref="youtubePlayer"
                    apiKey= { YOUTUBE_API_KEY }
                    videoId= { data.video.video_id }   // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={false}       // control whether the video should play in fullscreen or inline
                    loop={true}             // control whether the video should loop when ended
                    origin={"https://www.youtube.com"}
                    onReady={(e)=>{this.setState({height: 39})}}
                    onChangeState={(e)=>{this.setState({status: e.state})}}
                    onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
                    onError={(e)=>{ console.log('error Video==>>>',e.error)}}
                    onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}
                    style={{ alignSelf: 'stretch', height: height(this.state.height),marginVertical: 30, marginHorizontal: 10, }}
                />
                <Modal
                    animationInTiming={500}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    avoidKeyboard={true}
                    // transparent={false}
                    isVisible={this.state.reportModel}
                    onBackdropPress={() => this.setState({ reportModel: false })}
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
                    onBackdropPress={() => this.setState({ isClaimVisible: false })}
                    style={{ flex: 1 }}>
                    <Claim hideModels={this.hideModels} />
                </Modal>
            </View>
        );
    }
}
