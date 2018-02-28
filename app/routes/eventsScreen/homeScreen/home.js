import React, { Component } from 'react'; 
import { AsyncStorage, FlatList, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';


import images from '../../../config/images.js';
import styles from './styles.js';

// Components
import Filter from '../../../components/Filter/';
import StatusBar from '../../../components/StatusBar/';
import CustomNav from '../../../components/CustomNav/';
import EventImage from '../../../components/EventImage/';
import Title from '../../../components/EventTitle/';
import Description from '../../../components/EventDescription/';
import HomeDetails from '../../../components/HomeDetail/';  

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true,
      dataSet: false
    }
  }

  _keyExtractor = (item, index) => item.events.eventId;

  _headerRender(navigate) {
    return (
      <View>
        <StatusBar />
        <CustomNav onPress={()=> navigate('SortScreen')} text={'SORT'}/>
      </View>
    )
  }

  componentDidMount() {
    let db = firebase.firestore();
    let ref = db.collection("events");
    let memberLength = 0;
    let mem = 0;

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    var observer = ref.onSnapshot(docSnapshot => {
      let items = [];
      docLength = (docSnapshot._docs).length
      if (docSnapshot) {
        docSnapshot.forEach((child) => {
          let eventData = child._data;
          let arrayPic = [];
          
          memberLength += Object.size(eventData.members);
          Object.keys(eventData.members).forEach((key) => {
            eventData.members[key].get().then(snap => {
              mem++
              arrayPic.push(
                snap._data.profilePhoto
              );
              if (mem === memberLength) {
                this.setState({
                  loading: false,
                  data: items,
                  dataSet: true
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
          })
          items.push({
            events: {
              event: eventData,
              eventId: child._data.id,
              arrayPic
            }
          });
        });
        observer();
      }
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
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
    if (this.state.loading) {
      return null;
    } else {
      return (
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          ListHeaderComponent={this._headerRender(navigate)}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <TouchableOpacity onPress={()=> navigate('EventDetails', {event: item.events.event, states: this.state, eventId: item.events.eventId, avatar: item.events.arrayPic})}>
                <View style={styles.eventImage}>
                  <EventImage image={item.events.event.image} avatar={item.events.arrayPic}/>
                  <HomeDetails people={item.events.event.openSpots} location={item.events.event.place.name} />
                </View>
                <View style={styles.event}>
                  <Title title={item.events.event.event} style={styles.eventTitle}/>
                  <Description description={item.events.event.description} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )
    }
  }
}