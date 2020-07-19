import React from 'react'
import {View, StyleSheet } from 'react-native'
import { FontAwesome5, MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import {white, blue, red, orange,lightPurp,pink} from './colors'






export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
        return true
    }

    return false
    }

    export function calculateDirection (heading) {
    let direction = ''

    if (isBetween(heading, 0, 22.5)) {
        direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
        direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
        direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
        direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
        direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
        direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
        direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
        direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
        direction = 'North'
    } else {
        direction = 'Calculating'
    }

    return direction
    }
export function timeToString (time = Date.now()) {
        const date = new Date(time)
        const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        return todayUTC.toISOString().split('T')[0]
        }

const styles= StyleSheet.create({
    iconContainer: {
        padding: 5,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
})

    export function getMetricMetaInfo(metric){
        const info={
            run:{
                displayName: "Run",
                max: 50,
                unit: "Miles",
                step: 1,
                type: "steppers",
                getIcon(){
                    return(
                        <View style={[styles.iconContainer, {backgroundColor: red}]}>
                            <FontAwesome5 name="running" size={35} color={white} />
                        </View>
                    )
                }
            },
            bike:{
                displayName: "Bike",
                max: 100,
                unit: "Miles",
                step: 1,
                type: "steppers",
                getIcon(){
                    return(
                        <View style={[styles.iconContainer, {backgroundColor: orange}]}>
                            <MaterialIcons name="directions-bike" size={35} color={white} />
                        </View>
                    )
                }
            },
            swim:{
                displayName: "Swim",
                max: 9900,
                unit: "Meters",
                step: 100,
                type: "steppers",
                getIcon(){
                    return(
                        <View style={[styles.iconContainer, {backgroundColor: blue}]}>
                            <MaterialCommunityIcons name="swim" size={35} color={white} />
                        </View>
                    )
                }
            },
            sleep:{
                displayName: "Sleep",
                max: 24,
                unit: "Hours",
                step: 1,
                type: "slider",
                getIcon(){
                    return(
                        <View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
                            <FontAwesome5 name="bed" size={35} color={white} />
                        </View>
                    )
                }
            },
            eat:{
                displayName: "Eat",
                max: 10,
                unit: "Rating",
                step: 1,
                type: "slider",
                getIcon(){
                    return(
                        <View style={[styles.iconContainer, {backgroundColor: pink}]}>
                            <MaterialCommunityIcons name="food" size={35} color={white} />
                        </View>
                    )
                }
            }
        }
        return metric===undefined?info: info[metric]
    }


    export function getDailyReminderValue(){
        return[{
            today: "👋 Hey! Don't forget! You didn't log your data for today"
        }]
    }