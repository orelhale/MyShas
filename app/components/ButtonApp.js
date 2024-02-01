// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalElements from '../styleFile/globalElements';


export default function ButtonApp({ title, onPress, styleWrap, styleText, children }) {

    return (
        <>
            {children}
            <TouchableOpacity style={[globalElements.btnWrap, (styleWrap && styleWrap)]} onPress={onPress}>
                <Text style={[globalElements.btnText, (styleText && styleText)]}>{title || ""}</Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    Button: {

    },
});