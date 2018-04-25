// React
import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Communications from 'react-native-communications'
import Overlay from 'react-native-modal-overlay'
import Contacts from 'react-native-contacts'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

// Assets
import Header from '../Components/Header'
import HeadingContainer from '../Components/HeadingContainer'
// import TopicButton from '../Components/TopicButton'
import Button from '../Components/Button'
import ChatMenu from './ChatMenu'

const SearchIcon = require('../Assets/Images/search_orange.png')

const { height, width } = Dimensions.get('window')
const { Paddings, Margins, FontSizes, Colors, BorderRadii } = Constants

const PhoneCard = ({ name, phoneNumber, bgColor, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.phoneCard, AppStyles.hCenter, { backgroundColor: bgColor }]}
            onPress={onPress}
        >
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.separateBar}></View>
            <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
        </TouchableOpacity>
    )
}

const ChatCard = ({ name, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.chatCard, AppStyles.hCenter]}
            onPress={onPress}
        >
            <Text style={styles.nameText}>{name}</Text>
        </TouchableOpacity>
    )
}

const callPhone = (phoneNumber) => {
    Communications.phonecall(phoneNumber, true)
}


export default class TalkToSomeoneScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            chatMenuVisible: false,
            contactMenuVisible: false,
            contacts: [],
            isContactSelected: false,
            selectedContactName: '',
            selectedContactNumber: ''
        }
    }

    dismissModal() {
        this.setState({
            chatMenuVisible: false,
            contactMenuVisible: false
        })
    }

    onChat = () => {
        const { navigate } = this.props.navigation
        this.dismissModal()
        navigate('ChatScreen', { chatType: 'OneOnOne' })
    }

    onGroupChat = () => {
        const { navigate } = this.props.navigation
        this.dismissModal()
        navigate('ChatScreen', { chatType: 'Group' })
    }

    onCancel = () => {
        this.dismissModal()
    }

    onChatMenuClicked = () => {
        // const { navigate } = navigation
        // navigate('ChatScreen', { chatType: 'Group' })
        this.setState({
            chatMenuVisible: true
        })
    }

    selectFromContacts = () => {
        Contacts.getAll((err, contacts) => {
            if (err) throw err
            this.setState({
                contacts: contacts
            })
        })
        this.setState({
            contactMenuVisible: true
        })
    }

    onContactItemClicked = (firstname, lastname, number) => {
        this.setState({
            selectedContactName: firstname + ' ' + lastname,
            selectedContactNumber: number,
            isContactSelected: true
        })
        this.dismissModal()
    }

    render() {
        const { selectFromContacts, onContactItemClicked } = this
        const { navigation } = this.props
        const { chatMenuVisible, contactMenuVisible, contacts, isContactSelected, selectedContactName, selectedContactNumber } = this.state

        return (
            <View style={AppStyles.mainContainer}>
                <Header
                    type='Back'
                    navigation={navigation}
                />
                <ScrollView>
                    <HeadingContainer
                        headingImage={SearchIcon}
                        headingText='Talk to Someone'
                    />
                    <View style={[styles.cardContainer, AppStyles.hCenter]}>
                        {
                            isContactSelected &&
                            <PhoneCard
                                name={selectedContactName}
                                phoneNumber={selectedContactNumber}
                                bgColor={Colors.gray}
                                onPress={() => callPhone(selectedContactNumber)}
                            />
                        }
                        <Button
                            label='Select from contacts'
                            bgColor={Colors.orange}
                            onPress={selectFromContacts}
                        />
                        <PhoneCard
                            name='Call the DoD Help Line'
                            phoneNumber='877-995-5247'
                            bgColor={Colors.lightGreen}
                            onPress={() => callPhone('877-995-5247')}
                        />
                        <ChatCard
                            name='Chat with DoD Safe Helpline'
                            onPress={() => this.onChatMenuClicked()}
                        />
                        <Overlay visible={chatMenuVisible}
                            closeOnTouchOutside animationType="zoomIn"
                            containerStyle={{ backgroundColor: 'rgba(0,131,105,0.78)' }}
                            childrenWrapperStyle={{ backgroundColor: 'transparent' }}
                            animationDuration={500}
                        >
                            <ChatMenu
                                onChat={this.onChat}
                                onGroupChat={this.onGroupChat}
                                onCancel={this.onCancel}
                            />
                        </Overlay>
                        <Overlay visible={contactMenuVisible}
                            closeOnTouchOutside animationType="zoomIn"
                            containerStyle={{ backgroundColor: 'rgba(0,131,105,0.78)' }}
                            childrenWrapperStyle={{ backgroundColor: 'transparent' }}
                            animationDuration={500}
                        >
                            <ScrollView>
                                {
                                    contacts.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={[styles.contactItem, AppStyles.hCenter]}
                                                onPress={() => onContactItemClicked(item.givenName, item.familyName, (item.phoneNumbers[0] ? item.phoneNumbers[0].number : ''))}
                                            >
                                            {
                                                item &&
                                                <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
                                            }
                                            {
                                                item &&
                                                <Text style={styles.contactNumber}>{item.phoneNumbers ? (item.phoneNumbers[0] ? item.phoneNumbers[0].number : '') : ''}</Text>
                                            }
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </Overlay>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: Paddings.containerP
    },

    phoneCard: {
        width: width - 40,
        padding: Paddings.containerP,
        borderRadius: BorderRadii.boxBR,
        marginBottom: Margins.elementM
    },

    nameText: {
        color: 'white',
        fontSize: FontSizes.topicFS,
        fontWeight: '600'
    },

    phoneNumberText: {
        color: 'white',
        fontSize: FontSizes.contentFS
    },

    separateBar: {
        height: 2,
        width: width - 100,
        backgroundColor: 'white',
        marginVertical: Margins.elementM
    },

    chatCard: {
        width: width - 40,
        backgroundColor: Colors.lightGreen,
        padding: Paddings.containerP,
        borderRadius: BorderRadii.boxBR,
        marginTop: Margins.elementM
    },

    contactItem: {
        width: width * 2 / 3,
        backgroundColor: Colors.darkGreen,
        padding: 5
    },

    contactName: {
        color: 'white',
        fontSize: FontSizes.topicFS,
        fontWeight: '600'
    },

    contactNumber: {
        color: 'white',
        fontSize: FontSizes.contentFS
    }
})
