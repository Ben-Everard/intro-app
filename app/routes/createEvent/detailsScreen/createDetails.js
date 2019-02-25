import React, { Component } from 'react';
import { Dimensions, ImageBackground, Image, Keyboard, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNGooglePlaces from 'react-native-google-places';

import styles from './styles.js';
import images from '../../../config/images.js';
import functions from '../../../config/globalFunctions';

//Components
import StatusBar from '../../../components/StatusBar';
import HeaderTop from '../../../components/CreateEvent/HeaderTop';
import HeaderMiddle from '../../../components/CreateEvent/HeaderMiddle';
import HeaderBottom from '../../../components/CreateEvent/HeaderBottom';
import Button from '../../../components/Button/';

export default class createDetails extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      people: params.people,
      eventTime: params.eventTime,
      date: params.date,
      eventType: params.eventType,
      epochTime: params.epochTime,
      icon: params.eventIcon,
      typeName: params.typeName,
      selected: params.selected,
      showInput: false,
      addressQuery: '',
      predictions: [],
      formattedLocation: null,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params && params.event) {
      this.setState({
        typeName: params.event.eventType,
        formattedLocation: params.event.formattedLocation,
        title: params.event.title,
        description: params.event.description,
        name: params.event.name,
        addressComponents: params.event.addressComponents,
        mapUrl: params.event.mapUrl,
        addressGeo: params.event.addressGeo
      })
    }
  }

  onOpenPickerPress = () => {
    RNGooglePlaces.openPlacePickerModal()
    .then((place) => {
      this.setState({
        formattedLocation: place.address,
        lat: place.latitude,
        long: place.longitude,
        name: place.name,
        placeId: place.placeID,
        postalCode: place.postal_code
      })
    })
    .catch(error => console.log(error.message));
  }

  cancelLocation = () => {
    console.log('Should not show address');
    this.setState({
      formattedLocation: null,
    })
  }

  keyExtractor = item => item.placeID;

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItemWrapper}>
          <TouchableOpacity style={styles.listItem}
              onPress={() => this.onSelectSuggestion(item.placeID)}>
              <View style={styles.avatar}>
                <Image style={styles.listIcon}/>
              </View>
              <View style={styles.placeMeta}>
                  <Text style={styles.primaryText}>{item.primaryText}</Text>
                  <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.divider} />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let {height, width} = Dimensions.get('window');
    const { params } = this.props.navigation.state;
    return(
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <ImageBackground
              source={images.createEvent.background.stepThree}
              style={{
                width: width,
                height: 252 }} >
              <HeaderTop />
              <HeaderMiddle people={this.state.people} time={this.state.eventTime} date={this.state.date}/>
              <HeaderBottom eventType={this.state.typeName} eventIcon={this.state.icon}/>
            </ImageBackground>
            <View style={styles.detailsArea}>
              { !this.state.formattedLocation &&
                <View style={styles.locationSection}>
                  <TouchableOpacity onPress={this.onOpenPickerPress}>
                    <View style={styles.findLocation}>
                      <Image source={images.events.icons.mapPin} />
                      <Text style={styles.location}> Pick a Location </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              { this.state.formattedLocation &&
                <View style={styles.locationSection}>
                  <View>
                    <Text style={styles.place}> {this.state.formattedLocation} </Text>
                  </View>
                  <TouchableOpacity onPress={() => this.cancelLocation()}>
                    <View>
                      <Text style={styles.cancelButton}>X</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }

              <TextInput 
                style={styles.inputBox}
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(title) => this.setState({title})} />
              <TextInput 
                style={styles.inputArea}
                multiline={true}
                numberOfLines={5}
                value={this.state.description}
                placeholder={'Blurb about event...'}
                onChangeText={(description) => this.setState({description})} />
            </View>
            <View style={styles.button}>
              <Button text={'Next'} onPress={()=>navigate('EventSubmit', {allStates: this.state})}/>
            </View>
          </KeyboardAvoidingView>
        </View>
      </DismissKeyboard>
    )
  }
}

const DismissKeyboard = ({ children }) => {
  return(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}