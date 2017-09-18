import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';

import * as actions from '../actions';
import Swipe from '../components/Swipe'

class DeckScreen extends Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({tintColor}) => {
            return <Icon  name='description' color={tintColor}/>
        }

    };


    componentWillMount() {
        console.log('will');
        console.log(this.props.jobs);
    }

    constructor(props) {
        super(props);

        console.log('con');
        console.log(this.props.jobs);
    }

    componentDidMount() {
        console.log('did');
        console.log(this.props.jobs);
    }

    renderCard(job) {
        const initialRegion = {
            latitude: job.latitude,
            longitude: job.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        };

        // console.log(job);

        return (
            <Card title={job.jobTitle}>
                <View style={{height: 333}}>
                    <MapView
                        style={{flex: 1}}
                        scrollEnabled={false}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        )
    }

    renderNoMoreCards = () => {
        return (
            <Card title="No more jobs found">
                <Button
                    large
                    title='back to map'
                    icon={{name: 'my-location'}}
                    backgroundColor='#03A9F4'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        )
    }

    render() {
        return (
            <View>
               <Swipe
                   data={this.props.jobs}
                   renderCard={this.renderCard}
                   renderNoMoreCards={this.renderNoMoreCards}
                   onSwipeRight={job => this.props.likeJob(job)}
                   keyProp="jobkey"
               />
            </View>
        )
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

function mapStateToProps({jobs}) {
    return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);