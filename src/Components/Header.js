// React
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import localStorage from 'react-native-sync-localstorage'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

const { height,width } = Dimensions.get('window')

const MenuIcon = require('../Assets/Images/nav_menu.png')
const CheckMarkIcon = require('../Assets/Images/pencil.png')
const DeleteIcon = require('../Assets/Images/delete.png')

const goToScreen = (ScreenName, navigation) => {
    const { navigate } = navigation
    navigate(ScreenName ? ScreenName : '')
}

const goBackScreen = (navigation) => {
    const { goBack } = navigation
    goBack()
}

const goJournal = (navigation) => {
    const securityPin = localStorage.getItem('PIN')

    if (securityPin === null || securityPin === undefined) {
        goToScreen('CreateSecurityPinScreen', navigation)
    } else {
        goToScreen('EnterSecurityPinScreen', navigation)
    }
}

const goHome = (navigation) => {
    return navigation.dispatch(NavigationActions.reset(
    {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainScreen'})
        ]
    }))
}


const Header = ({ type, isMain, onDelete, navigation }) => {
    const headerText = (type === 'Home') ? 'Safe Helpline' : 'Back'

    return (
        <View style={styles.headerStyle}>
            {
                (type === 'Back') &&
                <View style={[styles.titleArea, AppStyles.vCenter]}>
                    <View style={[styles.backArea, AppStyles.center]}>
                        <TouchableOpacity onPress={() => goBackScreen(navigation)}>
                            <Text style={styles.textStyle}>{headerText}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.restArea, AppStyles.center]}>
                        {
                            onDelete &&
                            <TouchableOpacity
                                onPress={onDelete}
                            >
                                <Image
                                    source={DeleteIcon}
                                    style={styles.delteIcon}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            }
            {
                (type === 'Home') &&
                <View style={[styles.titleArea, AppStyles.hCenter]}>
                    <Text style={styles.textStyle}>{headerText}</Text>
                </View>
            }
            <View style={[styles.checkArea, AppStyles.center]}>
                <TouchableOpacity
                    onPress={() => goJournal(navigation)}
                >
                    <Image
                        source={CheckMarkIcon}
                        style={styles.checkIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.menuArea, AppStyles.center]}>
                {
                    !isMain &&
                    <TouchableOpacity
                        onPress={() => goHome(navigation)}
                    >
                        <Image
                            source={MenuIcon}
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: Constants.Colors.secondaryBgColor
    },

    textStyle: {
        color: 'white',
        fontSize: Constants.FontSizes.menuFS,
        fontWeight: 'bold',
    },

    titleArea: {
        flex: .66,
        flexDirection: 'row',
        paddingLeft: 10,
    },

    backArea: {
        flex: .5,
        borderRightWidth: 2,
        borderRightColor: Constants.Colors.lightGreen
    },

    restArea: {
        flex: .5
    },

    delteIcon: {
        width: 35,
        height: 35
    },

    checkArea: {
        flex: .17,
        borderLeftWidth: 2,
        borderLeftColor: Constants.Colors.lightGreen
    },

    checkIcon: {
        width: 35,
        height: 35
    },

    menuArea: {
        flex: .17,
        borderLeftWidth: 2,
        borderLeftColor: Constants.Colors.lightGreen
    },

    menuIcon: {
        width: 35,
        height: 25
    }

})

export default Header
