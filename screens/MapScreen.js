import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import { MapView } from 'expo';
import {connect} from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';


class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({tintColor}) => {
                return <Icon  name='my-location' color={tintColor}/>
            }

    };


    state = {
        mapLoaded: false,
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        }
    };

    componentDidMount() {
        this.setState({mapLoaded:true});
    };

    onRegionChangeComplete = (region) => {
        // console.log(region);
        this.setState({region});
    };

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    };

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{flex:1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        return (
            <View style={{flex: 1}} >
                <MapView
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    style={{flex: 1}}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Search this area"
                        backgroundColor="#009688"
                        icon={{name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    }
};

export default connect(null, actions)(MapScreen);