// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalElements from '../styleFile/globalElements';


export default function ButtonApp({ title, onPress, styleWrap, styleText, children }) {

    return (
        <>
            <TouchableOpacity style={[styles.btnWrap, (styleWrap && styleWrap)]} onPress={onPress}>
                {children}
                <Text style={[globalElements.btnText, (styleText && styleText)]}>{title || ""}</Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    Button: {

    },
    btnWrap: {
        borderRadius: 5,
        // backgroundColor: globalColors.secondary,
        backgroundColor: "#ddd",
        justifyContent: 'center',
        alignItems: "center",
        // borderColor: globalColors.gold,
        // borderWidth: 1,
        // height: 40,
        // width: 40,
     },
});