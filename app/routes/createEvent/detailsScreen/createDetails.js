import React, { Component } from 'react';
import { Dimensions, ImageBackground, Image, Keyboard, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
    console.log(params);
    this.state = {
      people: params.people,
      eventTime: params.eventTime,
      date: params.date,
      eventType: params.eventType,
      epochTime: params.epochTime,
      modalVisible: false,
      icon: params.eventIcon,
      typeName: params.typeName,
      selected: params.selected,
    };
  }

  _viewModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
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

    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let {height, width} = Dimensions.get('window');
    
    return(
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <ImageBackground
              source={images.createEvent.background.stepThree}
              style={{
                width: width,
                height: 252
              }}
            >
              <HeaderTop />
              <HeaderMiddle people={this.state.people} time={this.state.eventTime} date={this.state.date}/>
              <HeaderBottom eventType={this.state.typeName} eventIcon={this.state.icon}/>
            </ImageBackground>
            <View style={styles.detailsArea}>
              <View style={styles.locationSection}>
                <TouchableOpacity onPress={()=> this._viewModal()}>
                  <View style={styles.findLocation}>
                    <Image source={images.events.icons.mapPin} />
                    <Text style={styles.location}> Location </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={styles.place}> {this.state.formattedLocation} </Text>
                </View>
              </View>

              
              <TextInput 
                style={styles.inputBox}
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
              />
              <TextInput 
                style={styles.inputArea}
                multiline={true}
                numberOfLines={5}
                value={this.state.description}
                placeholder={'Blurb about event...'}
                onChangeText={(description) => this.setState({description})}
              />
            </View>
            <Modal
              visible={this.state.modalVisible}
              transparent={false}
            >
              <StatusBar />
              <GooglePlacesAutocomplete 
                placeholder='Find Location'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState({
                    formattedLocation: details.formatted_address,
                    name: data.structured_formatting.main_text,
                    addressComponents: {
                      addressNumber: details.address_components[0],
                      addressStreet: details.address_components[1],
                      addressCity: details.address_components[2],
                      addressState: details.address_components[4],
                      addressCountry: details.address_components[5],
                      addressZipcode: details.address_components[6],
                    },
                    mapUrl: details.url,
                    addressGeo: {
                      long: details.geometry.location.lng, 
                      lat: details.geometry.location.lat,
                    },
                    modalVisible: false
                  })
                }}
                getDefaultValue={() => {
                  return ''; // text input default value
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAbd2iPI41Kjm5hXjm3qAkvg3quXLG3GFg',
                  language: 'en', // language of the results
                  // types: '(bar)' // default: 'geocode'
                }}
                styles={{
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() => <Image />}
                renderRightButton={() => <Text></Text>}
              />
              <Button onPress={() => this._viewModal()} />
              </Modal>
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