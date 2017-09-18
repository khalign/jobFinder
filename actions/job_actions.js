import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARSMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARSMS, l: zip});
    return `${ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        // console.log(zip);
        const url = buildJobsUrl(zip);
        // console.log(url);
        let {data} = await axios.get(url);
        dispatch({type: FETCH_JOBS, payload: data});
        // console.log(data);
        callback();
    } catch (e) {
        console.error(e);
    }
};

export const likeJob = (job) => {
    // console.log("called");
    return {
        type: LIKE_JOB,
        payload: job
    }
};

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    }
};