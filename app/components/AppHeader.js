// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import AppIcon from './AppIcon';
import { Context } from '../screens/Context'
import ButtonApp from './ButtonApp';
import globalColors from '../styleFile/globalColors';
import CompletedTracking from './CompletedTracking';
import textToShow from '../data/textToShow';


export default function AppHeader({ children }) {

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

                    {children}
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
        // borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: "#ddd",
        // paddingBottom: 7,
        // paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    sideLeft: {
        alignItems: "center",
    },
    sideRight: {
        gap: 15,
        alignItems: "center",
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