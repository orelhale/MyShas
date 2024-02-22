import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import { Context } from '../screens/Context'
import globalColors from '../styleFile/globalColors';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"


export default function AppFooter({
    showScreen,
    setShowScreen,
}) {

    const { lang } = useContext(Context);

    return (
        <View style={[styles.AppHeader, globalSizes.flexRow]}>
            <Pressable
                style={[styles.sideRight, globalSizes.flexRow, styles.wrapButtonNav, (showScreen == "CompletAreaScreen" ? styles.active : styles.unActiveRight)]}
                onPress={() => setShowScreen('CompletAreaScreen')}
            >
                <View style={[globalSizes.flexColumn, styles.buttonNav]} >
                    <Text>איזור הסיומים</Text>
                    <View>
                        <MIcon
                            name={'trophy'}
                            size={globalSizes.iconSize}
                            color={globalColors.gold}
                        />
                    </View>
                </View>
            </Pressable>

            <Pressable
                style={[styles.sideLeft, globalSizes.flexRow, styles.wrapButtonNav, (showScreen == "HomeScreen" ? styles.active : styles.unActiveLeft)]}
                onPress={() => setShowScreen('HomeScreen')}
            >
                <View style={[globalSizes.flexColumn, styles.buttonNav]} >
                    <Text>Home</Text>
                    <View>
                        <MIcon
                            name={'trophy'}
                            size={globalSizes.iconSize}
                            color={globalColors.gold}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    AppHeader: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // paddingBottom: 7,
        // backgroundColor: "#ddd",
        paddingTop: 10,
        // paddingRight: 10,
        // paddingLeft: 10,

    },
    sideLeft: {
        width: '50%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },
    sideRight: {
        width: '50%',
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',

    },
    styleText: {
        padding: 5,
        color: "#fff",
        paddingRight: 7,
    },
    wrapCupStartAgin: {
        paddingRight: 10,
    },
    buttonNav: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapButtonNav: {
        paddingTop: 10,
        paddingBottom: 7,
        borderColor: globalColors.gold2,

    },
    active: {
        borderBottomWidth: 3,
    },
    unActiveRight: {
        backgroundColor: "#ddd",
        // backgroundColor: "red",
        borderTopLeftRadius: 20,
        borderColor: globalColors.gold2,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        // borderTopColor: '#d2d2d2',
        // borderTopWidth: 1,
    },
    unActiveLeft: {
        backgroundColor: "#ddd",
        borderTopEndRadius: 20,
        borderTopWidth: 1,
        borderRightWidth: 1,
        // borderTopColor: '#d2d2d2',
        // borderTopWidth: 1,
    },
});