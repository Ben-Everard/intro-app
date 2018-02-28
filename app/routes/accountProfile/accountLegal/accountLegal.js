import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Button from '../../../components/Button/';
import StatusBar from '../../../components/StatusBar/';
import styles from './styles.js';

export default class AccountLegal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legal: ''
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params.tos) {
      this.setState({
        legal: '\n\nEffective date: Dec 30th 2017\n\n' +
          'Welcome to Intro ("Intro," "we," "us" or "our"). Intro provides users access to a mobile hub where you can connect, plan and meet new people through common interests and activities.\n\n'  +
          'Our Privacy Policy explains how we and some of the companies we work with collect, use, share and protect information in relation to our mobile services, web site, and any software provided on or in connection with Intro services (collectively, the "Service"), and your choices about the collection and use of your information.\n\n' +
          'By using our Service you understand and agree that we are providing a platform for you to post content, including photos, activites, comments and other materials ("User Content"), to the Service and to share User Content publicly. This means that other Users may search for, see, use, or share any of your User Content.\n\n'+
          'Our Policy applies to all visitors, users, and others who access the Service ("Users").\n\n'+
          '1. INFORMATION WE COLLECT\n\n' +
          'We collect the following types of information.\n\n' +
           'We may collect Personal Information, including Sensitive Data, and other information. “Personal Information” means individually identifiable information that would allow us to determine the actual identity of, and contact, a specific living person. Sensitive Data includes information, comments or content (e.g. photographs, video, profile, lifestyle) that you optionally provide that may reveal your ethnic origin, nationality, religion and/or sexual orientation. By providing Sensitive Data to us, you consent to the collection, use and disclosure of Sensitive Data as permitted by applicable privacy laws. We may also collect your geolocation information with your consent. We may collect this information through a website, mobile application, or other online services. By using the Service, you are authorizing us to gather, parse and retain data related to the provision of the Service. When you provide personal information through our Service, the information may be sent to servers located in the United States and countries around the world.\n\n' +
          'Information you provide. In order to register as a user with Intro, you will be asked to sign in using your Facebook login. If you do so, you authorize us to access certain Facebook account information, such as your public Facebook profile (consistent with your privacy settings in Facebook), your email address, interests, likes, gender, birthday, education history, relationship interests, current city, photos, personal description, friend list, and information about and photos of your Facebook friends who might be common Facebook friends with other users. You will also be asked to allow Intro to collect your location information from your device when you download or use the Service. In addition, we may collect and store any personal information you provide while using our Service or in some other manner. This may include identifying information, such as your name, address, email address and telephone number, and, if you transact business with us, financial information. You may also provide us photos, a personal description and information about your gender and preferences for recommendations, such as search distance, age range and gender. If you chat with other Intro users, you provide us the content of your chats, and if you contact us with a customer service or other inquiry, you provide us with the content of that communication.\n\n'+
          'Information you provide us directly:\n\n'+
          'Profile information that you provide for your user profile (e.g., first and last name, picture,). This information allows us to help you or others be "found" on Intro.\n\n' +
          'User Content (e.g., photos, comments, and other materials) that you post to the Service.\n\n' +
          'Communications between you and Intro. For example, we may send you Service-related emails (e.g., account verification, changes/updates to features of the Service, technical and security notices). Note that you may not opt out of Service-related e-mails.\n\n' +
          'Adding your friends on Intro:\n\n' +
          'Note about "Invite Friends" feature: If you choose to invite someone to the Service through our "Invite friends" feature, you may select a person directly from the contacts list on your device and send a text or email from your personal account. You understand and agree that you are responsible for any charges that apply to communications sent from your device, and because this invitation is coming directly from your personal account, Intro does not have access to or control this communication.\n\n' +
          'Analytics information:\n\n' +
          'We use third-party analytics tools to help us measure traffic and usage trends for the Service. These tools collect information sent by your device or our Service, including the web pages you visit, add-ons, and other information that assists us in improving the Service. We collect and use this analytics information with analytics information from other Users so that it cannot reasonably be used to identify any particular individual User.\n\n' +
          'Cookies and similar technologies:\n\n' +
          'When you visit the Service, we may use cookies and similar technologies like pixels, web beacons, and local storage to collect information about how you use Intro and provide features to you.\n\n'+
          'We may ask advertisers or other partners to serve ads or services to your devices, which may use cookies or similar technologies placed by us or the third party.\n\n' +
          'Log file information:\n\n' +
          'Log file information is automatically reported by your browser each time you make a request to access (i.e., visit) a web page or app. It can also be provided when the content of the webpage or app is downloaded to your browser or device.\n\n' +
          'When you use our Service, our servers automatically record certain log file information, including your web request, Internet Protocol ("IP") address, browser type, referring / exit pages and URLs, number of clicks and how you interact with links on the Service, domain names, landing pages, pages viewed, and other such information. We may also collect similar information from emails sent to our Users which then help us track which emails are opened and which links are clicked by recipients. The information allows for more accurate reporting and improvement of the Service.\n\n' +
          'Device identifiers:\n\n' +
          'When you use a mobile device like a tablet or phone to access our Service, we may access, collect, monitor, store on your device, and/or remotely store one or more "device identifiers." Device identifiers are small data files or similar data structures stored on or associated with your mobile device, which uniquely identify your mobile device. A device identifier may be data stored in connection with the device hardware, data stored in connection with the device\'s operating system or other software, or data sent to the device by Intro.\n\n' +
          'A device identifier may deliver information to us or to a third party partner about how you browse and use the Service and may help us or others provide reports or personalized content and ads. Some features of the Service may not function properly if use or availability of device identifiers is impaired or disabled.\n\n'+
          'Metadata:\n\n' +
          'Metadata is usually technical data that is associated with User Content. For example, Metadata can describe how, when and by whom a piece of User Content was collected and how that content is formatted.\n\n'+
          'Users can add or may have Metadata added to their User Content including a hashtag (e.g., to mark keywords when you post a photo), geotag (e.g., to mark your location to a photo), comments or other data. This makes your User Content more searchable by others and more interactive. If you geotag your photo or tag your photo using other\'s APIs then, your latitude and longitude will be stored with the photo and searchable (e.g., through a location or map feature) if your photo is made public by you in accordance with your privacy settings.\n\n' +
          'Do Not Track disclosure\n\n'+
          'Do Not Track (“DNT”) is a privacy preference that users can set in their web browsers. DNT is a way for users to inform websites and services that they do not want certain information about their webpage visits collected over time and across websites or online services. We are committed to providing you with meaningful choices about the information we collect and that is why we provide the opt-out links above. However, we do not recognize or respond to any DNT signals, as the Internet industry works toward defining exactly what DNT means, what it means to comply with DNT, and a common approach to responding to DNT.\n\n'+
           
          '2. HOW WE USE YOUR INFORMATION\n\n'+
          'In addition to some of the specific uses of information we describe in this Privacy Policy, we may use information that we receive to:\n\n'+
          'help you efficiently access your information after you sign in\n\n'+
          'remember information so you will not have to re-enter it during your visit or the next time you visit the Service;\n\n'+
          'provide personalized content and information to you and others, which could include online ads or other forms of marketing\n\n'+
          'provide, improve, test, and monitor the effectiveness of our Service\n\n'+
          'develop and test new products and features\n\n'+
          'monitor metrics such as total number of visitors, traffic, and demographic patterns\n\n'+
          'diagnose or fix technology problems\n\n'+
          'automatically update the Intro application on your device\n\n'+
          'Intro or other Users may run contests, special offers or other events or activities ("Events") on the Service.If you do not want to participate in an Event, do not use the particular Metadata (i.e. hashtag or geotag) associated with that Event.\n\n'+
          '3. SHARING OF YOUR INFORMATION\n\n'+
          'We will not rent or sell your information to third parties outside Intro without your consent, except as noted in this Policy.\n\n '+

          'Parties with whom we may share your information:\n\n'+
          'We may share User Content and your information (including but not limited to, information from cookies, log files, device identifiers, location data, and usage data) with businesses that are legally part of the same group of companies that Intro is part of, or that become part of that group ("Affiliates"). Affiliates may use this information to help provide, understand, and improve the Service (including by providing analytics) and Affiliates\' own services (including by providing you with better and more relevant experiences). But these Affiliates will honor the choices you make about who can see your photos.\n\n'+
          'We also may share your information as well as information from tools like cookies, log files, and device identifiers and location data, with third-party organizations that help us provide the Service to you ("Service Providers"). Our Service Providers will be given access to your information as is reasonably necessary to provide the Service under reasonable confidentiality terms.\n\n'+
          'We may also share certain information such as cookie data with third-party advertising partners. This information would allow third-party ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you.\n\n'+
          'We may remove parts of data that can identify you and share anonymized data with other parties. We may also combine your information with other information in a way that it is no longer associated with you and share that aggregated information.\n\n'+
          'Parties with whom you may choose to share your User Content:\n\n'+
          'Any information or content that you voluntarily disclose for posting to the Service, such as User Content, becomes available to the public, as controlled by any applicable privacy settings that you set. To change your privacy settings on the Service, please change your profile setting. Once you have shared User Content or made it public, that User Content may be re-shared by others.\n\n'+
          'If you remove information that you posted to the Service, copies may remain viewable in cached and archived pages of the Service, or if other Users or third parties using the Intro API have copied or saved that information.\n\n'+
          'What happens in the event of a change of control:\n\n'+
          'If we sell or otherwise transfer part or the whole of Intro or our assets to another organization (e.g., in the course of a transaction like a merger, acquisition, bankruptcy, dissolution, liquidation), your information such as name and email address, User Content and any other information collected through the Service may be among the items sold or transferred. You will continue to own your User Content. The buyer or transferee will have to honor the commitments we have made in this Privacy Policy.\n\n'+
          'Responding to legal requests and preventing harm:\n\n'+
          'We may access, preserve and share your information in response to a legal request (like a search warrant, court order or subpoena) if we have a good faith belief that the law requires us to do so. This may include responding to legal requests from jurisdictions outside of the United States where we have a good faith belief that the response is required by law in that jurisdiction, affects users in that jurisdiction, and is consistent with internationally recognized standards. We may also access, preserve and share information when we have a good faith belief it is necessary to: detect, prevent and address fraud and other illegal activity; to protect ourselves, you and others, including as part of investigations; and to prevent death or imminent bodily harm. Information we receive about you may be accessed, processed and retained for an extended period of time when it is the subject of a legal request or obligation, governmental investigation, or investigations concerning possible violations of our terms or policies, or otherwise to prevent harm.\n\n'+
          '4. HOW WE STORE YOUR INFORMATION\n\n'+
          'Storage and Processing:\n\n'+
          'Your information collected through the Service may be stored and processed in the United States or any other country in which Intro, its Affiliates or Service Providers maintain facilities.\n\n'+
          'Intro, its Affiliates, or Service Providers may transfer information that we collect about you, including personal information across borders and from your country or jurisdiction to other countries or jurisdictions around the world. If you are located in the European Union or other regions with laws governing data collection and use that may differ from U.S. law, please note that we may transfer information, including personal information, to a country and jurisdiction that does not have the same data protection laws as your jurisdiction.\n\n'+
          'By registering for and using the Service you consent to the transfer of information to the U.S. or to any other country in which Intro, its Affiliates or Service Providers maintain facilities and the use and disclosure of information about you as described in this Privacy Policy.\n\n'+
          'We use commercially reasonable safeguards to help keep the information collected through the Service secure and take reasonable steps (such as requesting a unique password) to verify your identity before granting you access to your account. However, Intro cannot ensure the security of any information you transmit to Intro or guarantee that information on the Service may not be accessed, disclosed, altered, or destroyed.\n\n'+
          'Please do your part to help us. You are responsible for maintaining the secrecy of your unique password and account information, and for controlling access to emails between you and Intro, at all times. Your privacy settings may also be affected by changes the social media services you connect to Intro make to their services. We are not responsible for the functionality, privacy, or security measures of any other organization.\n\n'+
          '5. YOUR CHOICES ABOUT YOUR INFORMATION\n\n'+
          'Your account information and profile/privacy settings:\n\n'+
          'Update your account at any time by logging in and changing your profile settings.\n\n'+
          'Unsubscribe from email communications from us by clicking on the "unsubscribe link" provided in such communications. As noted above, you may not opt out of Service-related communications (e.g., account verification, purchase and billing confirmations and reminders, changes/updates to features of the Service, technical and security notices).\n\n'+
          'How long we keep your User Content:\n\n'+
          'Following termination or deactivation of your account, Intro, its Affiliates, or its Service Providers may retain information (including your profile information) and User Content for a commercially reasonable time for backup, archival, and/or audit purposes.\n\n'+
          '6.Children\'s privacy\n\n'+
          'Although our Service is a general audience Service, we restrict the use of our service to individuals age 18 and above. We do not knowingly collect, maintain, or use personal information from children under the age of 18.\n\n'+

          '7. No Rights of Third Parties\n\n'+
          'This Privacy Policy does not create rights enforceable by third parties or require disclosure of any personal information relating to users of the website.\n\n'+

          '8. HOW TO CONTACT US ABOUT A DECEASED USER\n\n'+
          'In the event of the death of an Intro User, please contact us. We will usually conduct our communication via email; should we require any other information, we will contact you at the email address you have provided in your request.\n\n'+
          '9. HOW TO CONTACT US\n\n'+
          'If you have any questions about this Privacy Policy or the Service, please contact us.\n\n'+
          '10. CHANGES TO OUR PRIVACY POLICY\n\n'+
          'Intro may modify or update this Privacy Policy from time to time, so please review it periodically. We may provide you additional forms of notice of modifications or updates as appropriate under the circumstances. Your continued use of Intro or the Service after any modification to this Privacy Policy will constitute your acceptance of such modification.'
      })
    }
  }

  render() {
    const backAction = NavigationActions.back({
      key: null
    })
    const { params } = this.props.navigation.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <View style={styles.layout}>
          <Text>{ this.state.legal }</Text>
        </View>
        <View style={styles.button}>
          <Button text={'Back'} onPress={()=>this.props.navigation.dispatch(backAction)}/>
        </View>
      </ScrollView>
    )
  }
}