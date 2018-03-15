import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

// Global Styles & Constants
import AppStyles from '../Lib/AppStyles'
import Constants from '../Lib/Constants'

const { height,width } = Dimensions.get('window')
const MenuIcon = require('../Assets/Images/nav_menu.png')

const Header = ({ type }) => {
    const headerText = (type === 'Home') ? 'Safe Helpline' : 'Back'

    return (
        <View style={styles.headerStyle}>
            <View style={[styles.titleArea, AppStyles.vCenter]}>
                <Text style={styles.textStyle}>{headerText}</Text>
            </View>
            <View style={[styles.checkArea, AppStyles.center]}>
                <Image
                    source={MenuIcon}
                    style={styles.checkIcon}
                />
            </View>
            <View style={[styles.menuArea, AppStyles.center]}>
                <Image
                    source={MenuIcon}
                    style={styles.menuIcon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        width: width,
        backgroundColor: Constants.Colors.secondaryBgColor
    },

    textStyle: {
        color: 'white',
        fontSize: Constants.FontSizes.menuFontSize,
        fontWeight: 'bold',
    },

    titleArea: {
        flex: .66,
        paddingLeft: 10,
    },

    checkArea: {
        flex: .17,
        borderLeftWidth: 2,
        borderLeftColor: Constants.Colors.lightGreen
    },

    checkIcon: {
        width: 20,
        height: 20
    },

    menuArea: {
        flex: .17,
        borderLeftWidth: 2,
        borderLeftColor: Constants.Colors.lightGreen
    },

    menuIcon: {
        width: 30,
        height: 20
    }

})

export default Header