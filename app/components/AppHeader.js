// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import AppIcon from './AppIcon';
import { Context } from '../screens/Context'
import ButtonApp from './ButtonApp';
import globalColors from '../styleFile/globalColors';
import CompletedTracking from './CompletedTracking';
import textToShow from '../data/textToShow';


export default function AppHeader() {

    const { funcReturnButton, callFuncFromReturnButton } = useContext(Context);

    return (
        <View style={[styles.AppHeader, globalSizes.flexRow]}>
            <View style={[styles.sideRight, globalSizes.flexRow]}>
                <>
                    {/* <ButtonApp
                        title={textToShow[lang].completArea}
                        styleWrap={styleWrapBTN}
                        styleText={styles.styleText}
                        onPress={() => { }}
                    >
                        <View style={styles.wrapCupStartAgin}>
                            <CompletedTracking />
                        </View>
                    </ButtonApp> */}

                    {/* <AppIcon
                        name='trophy'
                        onPress={() => { }}
                        color={globalColors.gold2}
                    /> */}
                </>
            </View>

            {/* חץ חזור */}
            {(!!funcReturnButton && !!funcReturnButton.length) && 
                <View style={[styles.sideLeft, globalSizes.flexRow]}>
                    <AppIcon name='keyboard-backspace' onPress={callFuncFromReturnButton} />
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    AppHeader: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 7,
        backgroundColor: "#ddd",
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        height: 55,

    },
    sideLeft: {

    },
    sideRight: {
        gap: 15,
    },
    styleText: {
        padding: 5,
        color: "#fff",
        paddingRight: 7,
    },
    wrapCupStartAgin: {
        paddingRight: 10,
    },
});