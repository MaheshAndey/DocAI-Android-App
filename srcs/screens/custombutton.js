import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,View
} from 'react-native';
import { shadow } from 'react-native'

const CustomButton = (props) => {
    return (
      <View>
        <Pressable
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#000000' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#000000' : props.color },
                styles.button,
                { ...props.style }
            ]}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
        </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 22,
        margin: 0,
        marginTop:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    button: {
        width: 157,
        height: 68,
        alignItems: 'center',
        borderRadius: 15,
        margin: 20,
        marginTop:0
    }
})

export default CustomButton;