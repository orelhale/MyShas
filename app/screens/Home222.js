import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home222({ navigation, route }) {
    return (
        <View style={styles.Home222}>
            <Text>Home222</Text>
            <Text>{(route.params["otherParam"] ? route.params["otherParam"]: "nooooo")}</Text>
            <Button
                title="Go to Home"
                onPress={() => {
                    navigation.navigate('Home', {
                        itemId: 86,
                        otherParam: 'data from Home222',
                    });
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    Home222: {

    },
});