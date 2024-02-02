import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { storeLang } from "../storage/storageFunc";



export default function SelectLang({ setLang }) {

    async function selectLang(lang) {
        let data = await storeLang(lang)
        setLang(data)
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalContent}>
                <View>
                    <Text style={styles.title}>Select lang</Text>
                </View>
                <View>
                    <Pressable onPress={() => { selectLang("en") }}>
                        <Text style={styles.text}>English</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={() => { selectLang("he") }}>
                        <Text style={styles.text}>עברית</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        backgroundColor: "#ddd"
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        borderRadius: 10,
        alignItems: 'center',
        // backgroundColor: "red",
        borderColor: 'black',
        borderWidth: 1,
        gap: 10,
    },
    title: {
        fontWeight: "600",
        fontSize: 20,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5,
    },
    text: {
        fontSize: 18,

    },
});

