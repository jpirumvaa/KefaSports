import React from 'react'
import {View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import {purple, blue} from '../utils/colors'

const TextBtn = ({children, onPress, style={}}) => {
    return (
        <View>
        <TouchableOpacity
        onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    reset:{
        textAlign: 'center',
        color: purple,
        fontSize: 22
    }
})
export default TextBtn
