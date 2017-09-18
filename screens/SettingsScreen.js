import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import { connect } from 'react-redux';
import {Button, Icon} from 'react-native-elements';

import {clearLikedJobs} from "../actions";

class SettingsScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: "Settings",
        tabBarLabel: 'Review Jobs',
        tabBarIcon: ({tintColor}) => {
            return <Icon  name='favorite' color={tintColor}/>
        },
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    });

    render() {
        return (
            <View>
                <Button
                    large
                    title='Reset All'
                    icon={{name: 'delete-forever'}}
                    backgroundColor='#f44336'
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        )
    }
}

export default connect(null, {clearLikedJobs})(SettingsScreen);