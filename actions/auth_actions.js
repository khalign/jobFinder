import {AsyncStorage} from 'react-native';
import {Facebook} from 'expo';

import {FB_LOGIN_SUCCESS, FB_LOGIN_FAIL} from './types';

export const fbLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        dispatch({type: FB_LOGIN_SUCCESS, payload: token});
    } else {
        doFbLogin(dispatch);
    }
};

const doFbLogin = async(dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('110423642959434', {
        permissions: ['public_profile']
    });

    if (type=== 'cancel') {
        dispatch({type: FB_LOGIN_FAIL});
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({type: FB_LOGIN_SUCCESS, payload: token});
};