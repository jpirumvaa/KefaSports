import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Platform } from 'react-native'
import {getMetricMetaInfo,timeToString, getDailyReminderValue} from '../utils/helpers'
import KefaSlider from './KefaSlider'
import KefaSteper from './KefaSteper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons';
import TextBtn from './TextBtn'
import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {white, purple} from '../utils/colors'


function Submitbtn({onPress}){
    return(
        <TouchableOpacity
        style={Platform.OS==='ios'?styles.iosSubmitBtn:styles.androidSubmitBtn}
        onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state={
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
}

increment =(metric)=>{
    const {max, step}= getMetricMetaInfo(metric)
    this.setState((state)=>{
        const count= state[metric]+step

        return{
        ...state,
        [metric]: count>max?max:count
        }
    })
}

decrement =(metric)=>{
this.setState((state)=>{
    const count= state[metric]-getMetricMetaInfo(metric).step

    return{
    ...state,
    [metric]: count<0?0:count
    }
})
}

slide=(metric,value)=>{
    this.setState(()=>({
        [metric]:value,
    }))
}
submit=()=>{
    const key= timeToString()
    const entry=[this.state]
    this.setState(()=>({
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }))
    submitEntry({key, entry})
    this.props.dispatch(addEntry({
        [key]: entry
    }))
    //other things shoud be done
}

reset=()=>{
    const key=timeToString()
    removeEntry(key)
    this.props.dispatch(addEntry({
        [key]:getDailyReminderValue()
    }))

    //do other things
}
render() {
    const metaInfo= getMetricMetaInfo()

    if(this.props.alreadyLogged){
        return(
            <View style={styles.center}>
                <Ionicons name={Platform.OS==='android'?"md-happy" : "ios-happy"}
                size={100} 
                color="#D4AC0D" 
                />
                <Text>You've already logged your information for today</Text>
                <TextBtn
                style={{padding: 10}}
                onPress={this.reset}>
                    Reset
                </TextBtn>
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <DateHeader date={(new Date()).toLocaleDateString()}/>

        {Object.keys(metaInfo).map((key)=>{
            const {getIcon, type, ...rest}= metaInfo[key]
            const value= this.state[key]

            return(
            <View key={key} style={styles.row}>
            {getIcon()}
            {type==="slider"?
            <KefaSlider
            value={value}
            onChange={(value)=>this.slide(key, value)}
            {...rest}
            />:
            <KefaSteper
            value={value}
            onIncrement={()=>this.increment(key)}
            onDecrement={()=>this.decrement(key)}
            {...rest}/>}
            </View>
            )
        })}
        <Submitbtn onPress={this.submit}/>

        </View>
    )
}
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn:{
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,

    },
    androidSubmitBtn:{
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText:{
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
        
    }
})

const mapStateToProps= (state)=>{
const key= timeToString()
return{
    alreadyLogged: state[key]&& typeof state[key].today==='undefined'
}
}
export default connect(mapStateToProps)(AddEntry)
