import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    {text: 'Welcome to JobFinder', color: '#03a9fe'},
    {text: 'The app wil help you to find local jobs', color: '#009688'},
    {text: 'Here is how to use the app', color: '#03a9fe'}
];

export default class WelcomeScreen extends Component {
    state = { token: null };

    async componentWillMount () {
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('map');
            this.setState({token});
        } else {
            this.setState({token: false});
        }
    }

    onSlideComplete = () => {
        this.props.navigation.navigate('auth');
    };

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading/>
        }
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete}/>
        )
    }
}