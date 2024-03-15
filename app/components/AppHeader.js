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

    return (<>
    {/*  (!!funcReturnButton && !!funcReturnButton.length) התנאי הזה הוא זמני עד שהיה יותר מכפתור אחד */}
        {(!!funcReturnButton && !!funcReturnButton.length) && <View style={[styles.AppHeader, globalSizes.flexRow]}>
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
        </View>}
    </>
    )
}


const styles = StyleSheet.create({
    AppHeader: {
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBottomColor: globalColors.backgroundGold,
        // backgroundColor: "#ddd",
        // paddingBottom: 7,
        // paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 7,
        // marginTop: 10,
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