import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalElements from '../styleFile/globalElements';


export default function ButtonApp({ title, onPress, styleWrap, styleText, children }) {

    return (
        <TouchableOpacity style={[styles.btnWrap, (styleWrap && styleWrap)]} onPress={onPress}>
            {children}
            <Text style={[globalElements.btnText, (styleText && styleText)]}>{title || ""}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    Button: {

    },
    btnWrap: {
        borderRadius: 5,
        backgroundColor: "#ddd",
        justifyContent: 'center',
        alignItems: "center",
    },
});