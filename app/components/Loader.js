import { StyleSheet, Text, View } from 'react-native';

export default function Loader() {


    return (
        <>
            <View style={styles.loader}></View>
        </>
    )
}


const styles = StyleSheet.create({
    loader: {
        borderWidth: 4,
        borderRadius: 60,
        borderBottomColor: "#f3f3f3",
        borderLeftColor: "#f3f3f3",
        borderRightColor: "#f3f3f3",
        borderTopColor: "#3498db",
        width: 80,
        height: 80,
    }
});