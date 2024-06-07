
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import AppIcon from './AppIcon';
import { Context } from '../screens/Context'
import ButtonApp from './ButtonApp';
import globalColors from '../styleFile/globalColors';
import CompletedTracking from './CompletedTracking';
import textToShow from '../data/textToShow';
import MenuG from '../tempComponent/Menu';


export default function AppHeader({ children, setShowEmailPopup, resetData }) {

    const { funcReturnButton, callFuncFromReturnButton } = useContext(Context);

    return (<>
        {/* <View style={styles.menu}>
            <MenuG setShowEmailPopup={setShowEmailPopup} />
        </View> */}

        {/*  (!!funcReturnButton && !!funcReturnButton.length) התנאי הזה הוא זמני עד שהיה יותר מכפתור אחד */}
        {/* {(!!funcReturnButton && !!funcReturnButton.length) && <View style={[styles.AppHeader, globalSizes.flexRow]}> */}
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
                    <AppIcon
                        name='email-outline'
                        onPress={() => { setShowEmailPopup(new String("true")) }}
                        color={globalColors.gold2}
                    />
                    <AppIcon
                        name='delete'
                        onPress={resetData}
                        color={globalColors.gold2}
                    />

                </>
            </View>

            {/* חץ חזור */}
            {(!!funcReturnButton && !!funcReturnButton.length) &&
                <View style={[styles.sideLeft, globalSizes.flexRow]}>
                    <AppIcon name='keyboard-backspace' onPress={callFuncFromReturnButton} />
                </View>
            }
        </View>
        {/* </View>} */}
    </>
    )
}


const styles = StyleSheet.create({
    AppHeader: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: globalColors.backgroundGold,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 2,
        paddingBottom: 5,
        marginBottom: 1,
        // position: "absolute",
        zIndex: 3,
    },
    sideLeft: {
        alignItems: "center",
    },
    sideRight: {
        gap: 15,
        alignItems: "center",
    },
    menu: {
        zIndex: 2,
        height: 35,
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