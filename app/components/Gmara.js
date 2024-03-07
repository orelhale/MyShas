import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import pageListName from '../data/pageListName.json';
import PageList from './PageList';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import ButtonApp from './ButtonApp';
import CompletedTracking from './CompletedTracking';
import { Context } from '../screens/Context';
import MIcon2 from "react-native-vector-icons/Fontisto"
import Slider from './slider/Slider';

export default function Gmara({
    setSelectItem,
    setListNamePage,
    listNamePage,
    selectItem,
    eventPageHndling,
    textToShow,
}) {
    let pageToComponent = 15;
    let heightS = Dimensions.get('screen').height
    let heightW = Dimensions.get('window').height
    let [arrListNamePage, setArrListNamePage] = useState()
    let [arrListObjNamePage, setArrListObjNamePage] = useState()
    let { addFuncToReturnButtonz, startLoader, stopLoader } = useContext(Context)
    let [sliderP, setSliderP] = useState(false)



    useEffect(() => {
        stopLoader()
    })

    // useEffect(() => {
    //     if (arrListNamePage) {
    //         // console.log("arrListNamePage ==== ", arrListNamePage);
    //         // console.log("arrListNamePage.length ==== ", arrListNamePage.length);
    //         // console.log("last listNamePage ==== ", listNamePage[listNamePage.length - 2]);
    //     }
    // }, [arrListNamePage])

    // useEffect(() => {
    //     console.log("flagToSelectAll ==== ", flagToSelectAll);
    // }, [flagToSelectAll])

    useEffect(() => {
        if (selectItem && listNamePage && listNamePage.length) {
            // *** Create list name and list select *** 
            console.log("heightS ===== ", heightS);
            console.log("heightW ===== ", heightW);
            initGmara()
        }
    }, [selectItem])


    function initGmara() {
        let arr = []
        let arrObj = []
        let index = 0
        let finishedPages = 0
        for (let i = 0; i < listNamePage.length;) {
            arr[index] = []
            arrObj[index] = {}

            for (let j = 0; j < pageToComponent && i < listNamePage.length; j++) {
                arr[index].push(listNamePage[i])
                arrObj[index][listNamePage[i]] = selectItem.pageTrack[listNamePage[i]]
                if (selectItem.pageTrack[listNamePage[i]]) {
                    finishedPages++
                }
                i++
            }
            index++
        }
        selectItem.finishedPages = finishedPages

        setArrListNamePage(arr)
        setArrListObjNamePage(arrObj)
    }

    function removeSelect() {
        setSelectItem()
        setListNamePage()
    }


    const selectPage = useCallback((pageName, selected) => {
        selectItem.pageTrack[pageName] = selected;
        selected ? selectItem.finishedPages++ : selectItem.finishedPages--;

        eventPageHndling(selected ? "select" : "unSelect")
    }, [])


    function selectAll_func() {
        // startLoader()

        let valueOfselectAll = !(selectItem.finishedPages == selectItem.numPages);
        initAllData(valueOfselectAll)

        valueOfselectAll ? (selectItem.finishedPages = selectItem.numPages) : selectItem.finishedPages = 0;
        eventPageHndling(valueOfselectAll ? "selectAll" : "unSelectAll")
        setArrListObjNamePage(JSON.parse(JSON.stringify(arrListObjNamePage)))
    }

    function startAgain() {
        selectItem.finishedPages = 0;
        selectItem.completed = ((selectItem.completed || 0) + 1);
        initAllData(false);
        eventPageHndling("startAgain")
        setArrListObjNamePage(JSON.parse(JSON.stringify(arrListObjNamePage)))
    }

    function initAllData(value) {
        console.log("initAllData ==== ",);
        for (const obj of arrListObjNamePage) {
            for (const pageName in obj) {
                // שינוי כל הדפים למה שנבחר, בשביל שהתוצאה של הבחירה תיראה על המסך
                obj[pageName] = value
                // וגם מאתחל את אובייקט המידע לתוצאה של הבחירה
                selectItem.pageTrack[pageName] = value
            }
        }
    }

    let styleTextBTN = {
        ...styles.styleTextBTN,
    }
    let styleWrapBTN = {
        backgroundColor: globalColors.gold,
        ...globalSizes.flexRow
    }


    function emitRange(data) {
        setSliderP(false)
        selectRange(data.min, data.max, data.value)
        eventPageHndling(data.event)
        setArrListObjNamePage(JSON.parse(JSON.stringify(arrListObjNamePage)))
    }

    function selectRange(min, max, value) {
        let i = 0
        let finishedPages = 0;
        let length = 0;

        for (const obj of arrListObjNamePage) {
            for (const pageName in obj) {
                if (i >= min && i <= max) {
                    // שינוי כל הדפים למה שנבחר, בשביל שהתוצאה של הבחירה תיראה על המסך
                    obj[pageName] = value
                    // וגם מאתחל את אובייקט המידע לתוצאה של הבחירה
                    selectItem.pageTrack[pageName] = value
                }
                if (selectItem.pageTrack[pageName]) {
                    finishedPages++;
                }
                i++;
                length++;
            }
        }
        selectItem.finishedPages = finishedPages;
    }

    return (
        <View style={{ minHeight: (heightW * 0.7) }}>
            <Text style={[styles.textTitle, globalSizes.fontSize]}>{textToShow.Masechet + " " + selectItem.name}</Text>

            {/* arrListNamePage && בשביל שהכפתורים לא יוצגו לפני שהמידע מוכן */}
            {arrListNamePage && <View style={[styles.wrapButtons, globalSizes.flexRow]}>
                {/* <ButtonApp title={` <- `} onPress={() => { removeSelect() }} /> */}

                {/* <ButtonApp title={(selectItem.finishedPages == 0 ? textToShow.SelectAll : textToShow.UnSelectAll)} onPress={selectAll_func} /> */}

                <Pressable onPress={() => startLoader(selectAll_func)} style={[styles.wrapButton, globalSizes.flexRow]}>
                    <Text style={styles.textButton}>{textToShow.All}</Text>
                    <MIcon2
                        size={30}
                        name={(selectItem.finishedPages == selectItem.numPages ? 'checkbox-active' : 'checkbox-passive')}
                        color={globalColors.gold}
                    />
                </Pressable>

                <ButtonApp title={'Range'} onPress={() => {
                    setSliderP(new String('s'))
                }} />

                {selectItem.startAgain && <ButtonApp title={textToShow.startAgain} styleWrap={styleWrapBTN} styleText={styleTextBTN} onPress={startAgain} >
                    <View style={styles.wrapCupStartAgin}>
                        <CompletedTracking />
                    </View>
                </ButtonApp>}
            </View>}

            {sliderP && <>
                <Pressable style={[styles.wrapSliderBackground]} onPress={() => { setSliderP() }}>
                </Pressable>
                <View style={[styles.wrapSlider]}>
                    <Slider
                        pageListName={pageListName}
                        max={selectItem.numPages - 1}
                        emitRange={(data) => {
                            setSliderP(false)
                            startLoader(() => emitRange(data))
                        }}
                    />
                </View>
            </>}

            <View style={[styles.wrapPages, globalSizes.flexRow]}>
                {
                    arrListNamePage && arrListObjNamePage &&
                    arrListNamePage.map((list, index) => {
                        // console.log("arrListObjNamePage[" + index + "] == ", arrListObjNamePage[index]);
                        return <PageList
                            key={("PageList" + index)}
                            selectItem={selectItem}
                            setSelectItem={setSelectItem}
                            listOfPagesName={arrListNamePage[index]}
                            listOfPagesData={arrListObjNamePage[index]}
                            selectPage={selectPage}
                        />
                    }
                    )
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    Gmara: {

    },
    wrapPages: {
        // flex:1,
        // flexDirection: "row-reverse",
        flexWrap: "wrap",
        // marginBottom:50,
        // overflow:"scroll"
        // gap: 30,
        // justifyContent:"space-around"
    },
    wrapButtons: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        marginBottom: 30,
        gap: 10,
    },
    textTitle: {
        textAlign: "center",
        marginBottom: 10,
        fontWeight: 800,
    },
    textButton: {
        fontSize: 20,
        color: globalColors.gold,
    },
    wrapCupStartAgin: {
        paddingRight: 10,
    },
    styleTextBTN: {
        color: "#fff",
        paddingRight: 7,
    },
    wrapButton: {
        borderRadius: 10,
        // borderWidth: 0.8,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: globalColors.gold,
        width: 85,
        height: "auto",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 15,
    },
    wrapSliderBackground: {
        backgroundColor: "#ddd",
        opacity: 0.6,
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: 'center',
        zIndex: 2,
    },
    wrapSlider: {
        backgroundColor: "#fff",
        opacity: 1,
        position: "absolute",
        zIndex: 4,
        justifyContent: "center",
        marginTop: 200,
        left: 20,
        right: 20,
        borderRadius: 20,
    },
});