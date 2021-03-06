import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE, SELECT_PHOTO } from '../constants/cameraRoll';

const initialState = {
  photos: [],
  selectedPhoto: null,
  isFetched: false,
  error: false
};


export default function cameraRollReducer(state = initialState, action){
  switch(action.type){
    case GET_PHOTOS:
    return {
      ...state,
      photos: [],
      isFetched: false
    };
    break;
    case GET_PHOTOS_SUCCESS:
    return {
      ...state,
      photos: action.data,
      selectedPhoto: action.data[0],
      isFetched: true
    };
    break;
    case GET_PHOTOS_FAILURE:
    return{
      ...state,
      error: true,
      isFetched: false
    };
    break;
    case SELECT_PHOTO:
    return {
      ...state,
      selectedPhoto: action.data
    }
    break;
    default:
    return state;
  }
}
