import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SW = Dimensions.get('window').width;

export default class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, i) => {
            return (
                <View key={slide.text} style={[styles.slideView, {backgroundColor: slide.color}]} >
                    <Text style={styles.slideText} >{slide.text}</Text>

                    {this.renderLast(i)}
                </View>
            )
        })
    }

    renderLast(i) {
        if (i === this.props.data.length -1 ) {
            return (
                <Button raised
                        title="Onwards!"
                        containerViewStyle={{marginTop: 15}}
                        buttonStyle={styles.slideButton}
                        onPress={this.props.onComplete}
                />
            )
        }
    }


    render() {
        return (
            <ScrollView horizontal pagingEnabled style={{flex:1}}>
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    slideView: {
        flex: 1,
        width: SW,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    },
    slideButton: {
        backgroundColor: '#0288d1',
        // marginTop: 15
    }
}