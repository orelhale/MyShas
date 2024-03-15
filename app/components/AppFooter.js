import { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import { Context } from '../screens/Context'
import globalColors from '../styleFile/globalColors';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"


export default function AppFooter({
    showScreen,
    setShowScreen,
}) {

    let { startLoader, stopLoader } = useContext(Context)

    useEffect(() => {
        stopLoader()
    })

    return (
        <View style={[styles.AppHeader, globalSizes.flexRow]}>
            <Pressable
                style={[styles.sideRight, globalSizes.flexRow, styles.wrapButtonNav, (showScreen == "CompletAreaScreen" ? styles.active : styles.unActiveRight)]}
                onPress={() => { 
                    showScreen != 'CompletAreaScreen' && startLoader(); 
                    showScreen != 'CompletAreaScreen' && setShowScreen('CompletAreaScreen') 
                }}
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
                onPress={() => { 
                    showScreen != 'HomeScreen' && startLoader(); 
                    showScreen != 'HomeScreen' && setShowScreen('HomeScreen') 
                }}
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
        // backgroundColor: globalColors.backgroundGray,
        marginTop: 4,
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
        borderBottomWidth: 1,
    },
    unActiveRight: {
        backgroundColor: globalColors.backgroundGray,
        // backgroundColor: "red",
        borderTopLeftRadius: 20,
        // borderColor: globalColors.gold2,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        // borderTopColor: '#d2d2d2',
        // borderTopWidth: 1,
    },
    unActiveLeft: {
        backgroundColor: globalColors.backgroundGray,
        borderTopEndRadius: 20,
        borderTopWidth: 1,
        borderRightWidth: 1,
        // borderTopColor: '#d2d2d2',
        // borderTopWidth: 1,
    },
});