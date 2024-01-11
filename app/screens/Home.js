import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home({ navigation, route }) {


    let [list, setList] = useState()
    let [cat, setCat] = useState()
    
    useEffect(()=>{
        
    },[])

    return (
        <View style={styles.Home}>
            <Text>Home</Text>
            <Text>{(route.params && route.params["otherParam"] ? route.params["otherParam"] : "no data from route")}</Text>
            <Button
                title="Go to Home222"
                onPress={() => {
                    navigation.navigate('Home222', {
                        itemId: 86,
                        otherParam: 'data from Home',
                    });
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    Home: {
        backgroundColor: "red",
    },
});