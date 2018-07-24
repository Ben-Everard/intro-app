import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Chatkit from "@pusher/chatkit";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2401c3b4-92ef-46b2-9ad7-125242a98a5f/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:2401c3b4-92ef-46b2-9ad7-125242a98a5f";
const CHATKIT_ROOM_ID = 11339109;
const CHATKIT_USER_NAME = "Dave";

export default class ChatBackend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
    // For the purpose of this example we will use single room-user pair.
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: CHATKIT_ROOM_ID,
        hooks: {
          onNewMessage: this.onReceive.bind(this)
        }
      });
    });
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: CHATKIT_ROOM_ID
    });
  }

  onReceive(data) {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: "https://placeimg.com/140/140/any"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  render() {
    return ( 
      <GiftedChat 
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME
        }}
      /> 
    )
  }

}