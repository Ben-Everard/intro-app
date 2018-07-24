import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './styles.js';

import firebase from 'react-native-firebase';

import StatusBar from '../../../components/StatusBar';
import PendingRequest from '../../../components/PendingRequests';
import Chat from './chat/chat.js';


export default class MessageDasahBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: false
    }
  }

  componentDidMount() {
    let currentId = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    let userRef = db.collection('users').doc(currentId);
    let eventRef = db.collection('events');
    let events = [];
    let count = 0;
    let pendingCount = 0;
    let self = this;

    userRef.get().then(function(userDoc) {
      let data = userDoc.data();
      let created = data.created;
      for (let key in created) {
        eventRef.doc(key).get().then(function(eventDoc) {
          let event = eventDoc.data();
          let pending = event.pending;
          if (pending) {
            let userId = Object.keys(pending);
            for (let j in pending) {
              pending[j].get().then(function(user) {
                pendingCount++
                if (event.pending) {
                  events.push({
                    eventName: event.event,
                    profileImage: user.data().profilePhoto,
                    shortName: user.data().name,
                    age: user.data().age,
                    eventId: event.id,
                    userId: userId[0]
                  });
                  if (Object.keys(created).length === count) {
                    self.setState({
                      data: events,
                      loading: false
                    }); 
                  }
                }
              }).catch(function(error) {
                console.log("Error User created data:", error);
              });
            }
          }
          count++;
          console.log(Object.keys(created).length);
          if (Object.keys(created).length === count && pendingCount === 0) {
            self.setState({
              data: events,
              loading: false
            }); 
          }
        }).catch(function(error) {
          console.log("Error User created data:", error);
        });
      }
    }).catch(function(error) {
      console.log("Error User created data:", error);
    });
  }



  render() {
    if (this.state.loading) {
      return null;
    } else {
      const data = this.state.data;
      return (
        <View style={styles.container}>
          <StatusBar />
          <View style={styles.requestContainer}>
            <Text style={styles.title}> PENDING REQUEST </Text>
            {data.map((person, index) => (
              <PendingRequest key={person.eventId} eventData={person}/>
            ))}
          </View>
          <Chat />
        </View>
      )
    }
  }
}