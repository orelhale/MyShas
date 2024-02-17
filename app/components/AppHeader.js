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


export default function AppHeader({
    showScreen,
    setShowScreen,
}) {

    const { funcReturnButton, lang, callFuncFromReturnButton, addFuncToReturnButton, setFuncReturnButton } = useContext(Context);


    // let [] = useState({

    // })

    useEffect(() => {
        console.log("funcReturnButton ===== ", funcReturnButton);
    }, [funcReturnButton])


    let styleWrapBTN = {
        backgroundColor: globalColors.gold,
        ...globalSizes.flexRow
    }

    return (
        <View style={[styles.AppHeader, globalSizes.flexRow]}>

            <View style={[styles.sideRight, globalSizes.flexRow]}>
                {showScreen != 'CompletAreaScreen' && (
                    // <ButtonApp
                    //     title={textToShow[lang].completArea}
                    //     styleWrap={styleWrapBTN}
                    //     styleText={styles.styleText}
                    //     onPress={() => setShowScreen('CompletAreaScreen')}
                    // >
                    //     <View style={styles.wrapCupStartAgin}>
                    //         <CompletedTracking />
                    //     </View>
                    // </ButtonApp>
                    <>
                        <AppIcon name='trophy' onPress={() => {
                            setShowScreen('CompletAreaScreen')
                            setFuncReturnButton([() => setShowScreen('HomeScreen')])
                        }} color={globalColors.gold2} />
                    </>
                )}

                {/* {showScreen != 'HomeScreen' && (
                    <AppIcon name='checkbox-active' onPress={() => setShowScreen('HomeScreen')} color={globalColors.gold2} />
                    // <ButtonApp
                    //     title={textToShow[lang].myShas}
                    //     styleWrap={styleWrapBTN}
                    //     styleText={styles.styleText}
                    //     onPress={() => setShowScreen('HomeScreen')}
                    // />
                )} */}
            </View>

            {/* חץ חזור */}
            <View style={[styles.sideLeft, globalSizes.flexRow]}>
                {(!!funcReturnButton && !!funcReturnButton.length) && <AppIcon name='keyboard-backspace' onPress={callFuncFromReturnButton} />}
            </View>
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
        paddingTop: 50,
        paddingRight: 10,
        paddingLeft: 10,

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