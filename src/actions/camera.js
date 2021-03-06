import { TAKE_PICTURE_SUCCESS, TAKE_PICTURE_FAILURE, SWITCH_TYPE, SWITCH_FLASH } from '../constants/camera';
import Camera from 'react-native-camera';

export function takePicture(camera){
  return dispatch => {
    return camera.capture()
    .then(data => {
      // TODO geolocationを許可してるかしてないかで分ける
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          if(pos == null) console.error("did't get position");
          // data.data base64
          const file = {
            image: data.data,
            timestamp: pos.timestamp,
            location: {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude
            }
          }
          resolve(file);
        })
      })
    })
    .then(file => {
      return dispatch(takePictureSuccess(file));
    })
    .catch(err => dispatch(takePictureFailure(err)));
  }
}

export function switchCameraType(type){
  return dispatch => {
    const { back, front } = Camera.constants.Type;
    const newType = (type === back)? front : back;
    dispatch(setCameraType(type));
  }
}

export function switchFlashMode(flashMode){
  return dispatch => {
    dispatch(setFlashMode(getNewFlashMode(flashMode)));
  }
}

export function takePictureSuccess(data){
  return {
    type: TAKE_PICTURE_SUCCESS,
    data
  }
}

export function takePictureFailure(err){
  return {
    type: TAKE_PICTURE_FAILURE,
    err
  }
}

export function setCameraType(cameraType){
  return {
    type: SWITCH_TYPE,
    cameraType
  }
}

export function setFlashMode(flashMode){
  return {
    type: SWITCH_FLASH,
    flashMode
  }
}

// private
function getNewFlashMode(flash){
  const { auto, on, off } = Camera.constants.FlashMode;
  if (flash === auto) {
    return on;
  } else if (flash === on) {
    return off;
  } else if (flash === off) {
    return auto;
  }
}

function onSuccsess(pos){
  return pos;
}
