// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { Image, StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
let img = require("../../assets/cup/trophy-cup-svgrepo-com.png")


export default function CompletedTracking({ sumCompleted, style }) {

    return (
        <View style={[styles.CompletedTracking, globalSizes.flexRow, (style && style)]}>
            <Image style={styles.img} height={4} width={4} source={img} />
            {sumCompleted != undefined && <Text style={styles.text}>{sumCompleted || 0}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    CompletedTracking: {
        display: ""
    },
    img: {
        height: 20,
        width: 20,
    },
    text: {
        color: globalColors.gold,
    },
});