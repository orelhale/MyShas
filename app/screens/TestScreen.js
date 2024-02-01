// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { Image, StyleSheet, Text, View } from 'react-native';
let gg = require("../../assets/cup/trophy-cup-svgrepo-com.png")


export default function TestScreen() {


    return (
        <View style={styles.TestScreen}>
            <View>
                <Text>TestScreen</Text>
            </View>
            
            <View>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    TestScreen: {
        marginTop: 60,
        borderTopColor: "black",
        borderTopWidth: 1,
    },

});