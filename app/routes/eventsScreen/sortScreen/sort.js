import React, { Component } from 'React';
import {
  Slider,
  Text,
  TextInput,
  View,
} from 'react-native';

import styles from './styles.js';
import CustomMarker from './customMarker.js';
import images from '../../../config/images.js';

import StatusBar from '../../../components/StatusBar';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default class SortScreen extends Component {
    constructor(props) {
    super(props);
    this.state={
      time: [0, 5],
      people: [3, 8],
      distance: 5
    }
  }
  static navigationOptions = {
    tabBarVisible: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.selectionArea}>
          <TextInput 
            style={styles.search}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={'Search'}
          />
          <View style={styles.sliderView}>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>Distance</Text>
              <Text>32km</Text>
            </View>
            <View>
              <Slider 
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={this.state.distance}
                thumbImage={images.slider.handle}
                trackImage={images.slider.progress} 
              />
            </View>
          </View>
          <View style={styles.sliderView}>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>Number of People</Text>
              <Text>2-4</Text>
            </View>
            <View>
              <MultiSlider
                values={[this.state.people[0], this.state.people[1]]}
                sliderLength={309}
                onValuesChange={this.multiSliderValuesChange}
                min={3}
                max={8}
                step={1} 
                customMarker={CustomMarker}
                trackStyle={images.slider.progress}
              />
            </View>
          </View>
          <View style={styles.sliderView}>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>Time</Text>
              <Text>Now-5D</Text>
            </View>
            <View>
              <MultiSlider
                values={[this.state.time[0], this.state.time[1]]}
                sliderLength={309}
                onValuesChange={this.multiSliderValuesChange}
                min={0}
                max={5}
                step={1} 
                customMarker={CustomMarker}
                trackStyle={images.slider.progress}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}