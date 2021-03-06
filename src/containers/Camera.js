import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import { ViewContainer } from '../components'

import {
  takePicture,
  switchCameraType,
  switchFlashMode
} from '../actions/camera';


const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

const mapStateToProps = state => {
  return {
    camera: state.camera
  };
}

//TODO reselect
const mapDispatchToProps = dispatch => {
  return {
    takePicture: camera => dispatch(takePicture(camera)),
    switchType: cameraType => dispatch(switchCameraType(cameraType)),
    switchFlash: flashMode => dispatch(switchFlashMode(flashMode))
  };
}

class Camera1 extends Component {
  constructor(props) {
    super(props);

    this.camera = null;
  }

  get typeIcon() {
    const { back, front } = Camera.constants.Type;

    return this.props.camera.camera.type === back ?
    require('../../assets/ic_camera_rear_white.png') : require('../../assets/ic_camera_front_white.png');
  }

  get flashIcon() {
    const { auto, on, off } = Camera.constants.FlashMode;
    const flashMode = this.props.camera.camera.flashMode;

    if (flashMode === auto) {
      return require('../../assets/ic_flash_auto_white.png');
    } else if (flashMode === on) {
      return require('../../assets/ic_flash_on_white.png');
    } else if (flashMode === off) {
      return require('../../assets/ic_flash_off_white.png');
    } else {
      return require('../../assets/ic_flash_off_white.png');
    }
  }

// 写真を取った後に画面遷移
  takePicture(){
    this.props.takePicture(this.camera).then(res => {
      Actions.postImage({isCameraRoll: false});
    })
  }

  render() {
    const { camera, photo, isRecording } = this.props.camera;
    return (
      <ViewContainer>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={camera.aspect}
          captureTarget={camera.captureTarget}
          type={camera.type}
          flashMode={camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={() => this.props.switchType(camera.type)}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => this.props.switchFlash(camera.flashMode)}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {!isRecording
            &&
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture.bind(this)}
              >
              <Image source={require('../../assets/ic_photo_camera_36pt.png')} />
            </TouchableOpacity>
            ||
            null
          }
        </View>
      </ViewContainer>
    );
  }
}

export const CameraScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera1);
