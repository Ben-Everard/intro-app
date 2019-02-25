// NPM Files
import React, {Component} from 'react';
import { DatePickerIOS, Dimensions, Image, ImageBackground, Modal, Picker, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Local Files
import styles from './styles.js'; 
import images from '../../../config/images.js';
import { tConvert } from '../../../config/globalFunctions.js';

// Components
import HeaderTop from '../../../components/CreateEvent/HeaderTop';
import Button from '../../../components/Button';

export default class CalendarsScreen extends Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);

    const { params } = this.props.navigation.state;

    this.state = {
      date: this.props.date,
      maxDate: addDays(new Date(), 14),
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      modalVisiblePeople: false,
      modalVisibleDate: false,
      animated: true,
      transparent: false,
      disabled: true,
      timeSet: true,
      peopleSet: params ? false : true,
      selected: params ? params.event.selected : null,
      numPeople: params ? params.event.people : null,
      time: params ? params.event.eventTime : null,
      params: params ? params.event : null,
      utcDateTime: params ? params.event.epochTime : null
    };
  }

  _setModalVisibleDate(visible) {
    this.setState({modalVisibleDate: visible});
  };

  _setModalVisiblePeople(visible) {
    this.setState({modalVisiblePeople: visible});
    if(this.state.numPeople) {
      this.setState({
        peopleSet: false
      })
    }
  };

  onDateChange = (date) => {
    var justTime = date.toString().split(' ')[4];
    var time = justTime.split(':')[0] + ':' + justTime.split(':')[1]
    var unixTimeStamp = new Date(this.state.timestamp);
    unixTimeStamp.setHours(justTime.split(':')[0]);
    unixTimeStamp.setMinutes(justTime.split(':')[1]);
    unixTimeStamp = (unixTimeStamp.getTime() / 1000).toFixed(0);
    this.setState({
      date: date,
      utcDateTime: unixTimeStamp,
      time: tConvert(time),
      timeSet: false,
    });
  };

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({
      timeZoneOffsetInHours: offset,
    });
  };

  onDayPress(day) {
    this.setState({
      selected: day.dateString,
      timestamp: day.timestamp,
      disabled: false,
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let {height, width} = Dimensions.get('window');

    return (
      <ScrollView style={styles.container}>
        <ImageBackground 
          source={images.createEvent.background.stepOne}
          style={{
            width: width,
            height: 106
          }}
        >
          <HeaderTop />
        </ImageBackground>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          minDate={this.state.date}
          maxDate={this.state.maxDate}
          current={this.state.selected}
          markedDates={{
            [this.state.selected]: {selected: true,}
          }}
          theme={{
            selectedDayBackgroundColor: '#FFB400',
            'stylesheet.day.basic': {
              base: {
                width: 30,
                height: 30,
                alignItems: 'center',
              }
            }
          }}
        />
        <Modal
          visible={this.state.modalVisiblePeople}
          transparent={true}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}
          >
            <View style={{
              width: 300,
              height: 250,
              backgroundColor: '#FFF',
              borderWidth: 1,
              borderRadius: 5}}
            >
              <Picker
                selectedValue={this.state.numPeople}
                onValueChange={(itemValue, itemIndex) => this.setState({numPeople: itemValue})}>
                <Picker.Item label="# of PPL"  />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
              </Picker>
              <TouchableOpacity onPress={this._setModalVisiblePeople.bind(this, false)} style={styles.doneText}>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalVisibleDate}
          transparent={true}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}
          >
            <View style={{
              width: 300,
              height: 250,
              backgroundColor: '#FFF',
              borderWidth: 1,
              borderRadius: 5}}
            >
              <DatePickerIOS
                date={this.state.date}
                mode="time"
                timeZoneOffsetInMinutes={(new Date()).getTimezoneOffset()*-1}
                onDateChange={this.onDateChange}
                minuteInterval={1}
                style={styles.datePicker}
              />
              <View style={styles.doneText}>
                <TouchableOpacity onPress={this._setModalVisibleDate.bind(this, false)}>
                  <Text>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.selectors}>
          <TouchableOpacity onPress={this._setModalVisibleDate.bind(this, true)} disabled={this.state.disabled}>
            <View style={styles.select}>
              <Text style={styles.text}>{this.state.time ? this.state.time : 'Time'}</Text>
              <View style={styles.arrows}>
                <Image
                  style={styles.arrow}
                  source={images.createEvent.arrow}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._setModalVisiblePeople.bind(this, true)} disabled={this.state.timeSet}>
            <View style={styles.select}>
              <Text style={styles.text}>{this.state.numPeople ? this.state.numPeople : '# of PPL'}</Text>
              <View style={styles.arrows}>
                <Image
                  style={styles.arrow}
                  source={images.createEvent.arrow}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button disabled={this.state.peopleSet} text={'Next'} onPress={() => navigate('EventCategory', {time: this.state.utcDateTime, people: this.state.numPeople, hours: this.state.time, selected: this.state.selected, event: this.state.params })} />
        </View>
      </ScrollView>
    );
  }
}

function addDays(dateObj, numDays) {
  return dateObj.setDate(dateObj.getDate() + numDays);
}
