import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles.js';

import StatusBar from '../../../components/StatusBar';
import PendingRequest from '../../../components/PendingRequests';
import AllChats from '../../../components/AllChats';


export default class MessageDasahBoard extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state={

    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View>
          <PendingRequest />
          <AllChats />
        </View>
      </View>
    ) 
  }
}