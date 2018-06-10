import React from 'react';
import { 
  TabNavigator, 
  StackNavigator 
} from 'react-navigation';
import {
  Image
} from 'react-native';

import images from './images.js'


import SplashScreen from '../routes/splashScreen/';
import LoginScreen from '../routes/loginScreen/';

import NewUser from '../routes/accountSetup/newUser/';
import NewUserPersonality from '../routes/accountSetup/newUserPersonality/';
import NewUserBio from '../routes/accountSetup/newUserBio/bio.js';
import NewUserInsta from '../routes/accountSetup/newUserInsta/';

import HomeScreen from '../routes/eventsScreen/homeScreen/';
import EventDetails from '../routes/eventsScreen/eventDetails/';
import SortScreen from '../routes/eventsScreen/sortScreen/';

import EventCalendar from '../routes/createEvent/calendarScreen/';
import EventCategory from '../routes/createEvent/categoryScreen/';
import CreateDetails from '../routes/createEvent/detailsScreen/';
import EventSubmit from '../routes/createEvent/submitScreen/';

import AccountHome from '../routes/accountProfile/accountHome/';
import AccountSettings from '../routes/accountProfile/accountSettings/';
import UpdateProfile from '../routes/accountProfile/updateProfile/';
import AccountLegal from '../routes/accountProfile/accountLegal/';

import MessageDashBoard from '../routes/messages/messageDashBoard/';

export const CreateStack = StackNavigator({
  EventCalendar: {
    screen: EventCalendar,
    navigationOptions: { 
      header: null,
    },
  },
  EventCategory: {
    screen: EventCategory,
    navigationOptions: { 
      header: null,
    },
  },
  CreateDetails: {
    screen: CreateDetails,
    navigationOptions: { 
      header: null,
    },
  },
  EventSubmit: {
    screen: EventSubmit,
    navigationOptions: { 
      header: null,
    },
  }
});

export const MessageStack = StackNavigator({
  MessageDashBoard: {
    screen: MessageDashBoard,
    navigationOptions: { 
      header: null,
    },
  }
});

export const AccountStack = StackNavigator({
  AccountHome: {
    screen: AccountHome,
    navigationOptions: { 
      header: null,
    },
  },
  AccountSettings: {
    screen: AccountSettings,
    navigationOptions: {
      header: null,
    },
  },
  UpdateProfile: { 
    screen: UpdateProfile,
    navigationOptions: { 
      header: null
    },
  },
  AccountLegal: { 
    screen: AccountLegal,
    navigationOptions: { 
      header: null
    },
  },
})

export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { 
      header: null,
    },
  },
  EventDetails: {
    screen: EventDetails,
    navigationOptions: { 
      header: null,
    },
  }
})

export const ModalStack = StackNavigator({
  AllEvents: {
    screen: HomeStack,
    navigationOptions: { 
      header: null,
    },
  },
  SortScreen: {
    screen: SortScreen,
    navigationOptions: { 
      header: null,
    }
  },
}, {
  mode: 'modal',
  headerMode: 'none',
})

export const Tabs = TabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions:({navigation}) =>({
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={images.navigation.tabNav.home}
        />
      ),
    })
  },
  Sort: {
    screen: AccountStack,
    navigationOptions:({navigation}) =>({
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={images.navigation.tabNav.filter}
        />
      ),
    })
  },
  EventCalendar: {
    screen: CreateStack,
    navigationOptions:({navigation}) =>({
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={images.navigation.tabNav.create}
        />
      ),
    })
  },
  Message: {
    screen: MessageStack,
    navigationOptions:({navigation}) =>({
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={images.navigation.tabNav.alert}
        />
      ),
    })
  },
  Profile: {
    screen: AccountStack,
    navigationOptions:({navigation}) =>({
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={images.navigation.tabNav.profile}
        />
      ),
    })
  }
}, {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#F99266',
      height: 60
    },
  }
});

export const NewProfile = StackNavigator({
  NewUser: { 
    screen: NewUser,
    navigationOptions: { 
      header: null
    },
  },
  NewUserPersonality: { 
    screen: NewUserPersonality,
    navigationOptions: { 
      header: null,
    },
  },
  NewUserBio: {
    screen: NewUserBio,
    navigationOptions: { 
      header: null,
    },
  },
  NewUserInsta: {
    screen: NewUserInsta,
    navigationOptions: { 
      header: null,
    },
  }
});

export const RootStack = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  AccountSetup: {
    screen: NewProfile,
    navigationOptions: {
      header: null
    }
  },
  HomeScreen: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  }
});
