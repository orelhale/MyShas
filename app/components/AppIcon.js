// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { Pressable, StyleSheet, Text, View } from 'react-native';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';


export default function AppIcon({
    name,
    onPress,
    color,
    size,
}) {

    return (
        <Pressable
            onPress={() => onPress && onPress()}
            style={({ pressed }) => [
                styles.button,
                size && { width: size, height: size, },
                { backgroundColor: pressed ? globalColors.backgroundGold : 'white' }
            ]}
        >
            <MIcon
                name={name || ''}
                size={size || globalSizes.iconSize}
                color={color || globalColors.gold}
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        // borderRadius:1,
        // flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 0.5,
        // padding: 5,
        width: 35,
        height: 35,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 10,
        marginRight: 'auto',
        backgroundColor: "#FFF",
        borderColor: globalColors.gold,
    },
});