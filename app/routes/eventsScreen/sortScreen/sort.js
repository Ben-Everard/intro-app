import React, { Component } from 'React';
import { Slider, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-checkbox';

import styles from './styles.js';
import CustomMarker from './customMarker.js';
import images from '../../../config/images.js';

import StatusBar from '../../../components/StatusBar';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Button from '../../../components/Button';

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

  sortEvents() {
    console.log('Click on Sort', this.state);
  }




  render() {
    const checkBoxList = ['Game Time', 'Outside', 'Drinks', 'Live Music', 'Girls Night', 'Coffee', 'Guys Night', 'Other'];
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
              <Text style={styles.sliderText}>DISTANCE</Text>
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
              <Text style={styles.sliderText}>NUMBER OF PEOPLE</Text>
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
                selectedStyle={{backgroundColor: '#FFB400'}}
              />
            </View>
          </View>
          <View style={styles.sliderView}>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>TIME</Text>
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
                selectedStyle={{backgroundColor: '#FFB400'}}
              />
            </View>
          </View>
          <View style={styles.checkboxArea}>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Game Time'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedGameTime}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedGameTime: !this.state.checkedGameTime}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Outside'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedOutSide}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedOutSide: !this.state.checkedOutSide}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Drinks'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedDrinks}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedDrinks: !this.state.checkedDrinks}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Live Music'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedLiveMusic}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedLiveMusic: !this.state.checkedLiveMusic}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Girls Night'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedGirlsNight}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedGirlsNight: !this.state.checkedGirlsNight}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Coffee'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedCoffee}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedCoffee: !this.state.checkedCoffee}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Guys Night'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedGuysNight}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedGuysNight: !this.state.checkedGuysNight}) }
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox 
                label='Other'
                labelStyle={styles.checkboxLabel}
                checked={this.state.checkedOther}
                uncheckedImage={images.checkboxEmpty}
                checkedImage={images.checkboxFilled}
                onChange={(checked) => this.setState({checkedOther: !this.state.checkedOther}) }
              />
            </View>
          </View>
          <View style={styles.button}>
            <Button text={'Sort'} onPress={() => this.sortEvents()}/>
          </View>
        </View>
      </View>
    )
  }
}