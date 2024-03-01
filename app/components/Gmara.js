import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PageList from './PageList';
import { useCallback, useContext, useEffect, useState } from 'react';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import ButtonApp from './ButtonApp';
import CompletedTracking from './CompletedTracking';
import { Context } from '../screens/Context';
import MIcon2 from "react-native-vector-icons/Fontisto"


export default function Gmara({
    setSelectItem,
    setListNamePage,
    listNamePage,
    selectItem,
    eventPageHndling,
    textToShow,
    confForMenu,
}) {
    let pageToComponent = 15;

    let [arrListNamePage, setArrListNamePage] = useState()
    let [arrListObjNamePage, setArrListObjNamePage] = useState()
    let { addFuncToReturnButtonz, startLoader, stopLoader } = useContext(Context)



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
        if (arrListObjNamePage) {
            confForMenu.selectAll = selectAll_func
            confForMenu.startAgain = startAgain
        }
    }, [arrListObjNamePage])


    useEffect(() => {
        if (selectItem && listNamePage && listNamePage.length) {
            // *** Create list name and list select *** 
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
        eventPageHndling(selected ? "select" : "unSelect")
    }, [])


    function selectAll_func() {
        startLoader()

        let valueOfselectAll = !(selectItem.finishedPages == selectItem.numPages);
        initAllData(valueOfselectAll)
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
    return (
        <View>
            <Text style={[styles.textTitle, globalSizes.fontSize]}>{textToShow.Masechet + " " + selectItem.name}</Text>

            <View style={[styles.wrapButtons, globalSizes.flexRow]}>
                {/* <ButtonApp title={` <- `} onPress={() => { removeSelect() }} /> */}

                {/* <ButtonApp title={(selectItem.finishedPages == 0 ? textToShow.SelectAll : textToShow.UnSelectAll)} onPress={selectAll_func} /> */}

                <Pressable onPress={selectAll_func} style={[styles.wrapButton, globalSizes.flexRow]}>
                    <Text style={styles.textButton}>{textToShow.All}</Text>
                    <MIcon2
                        size={30}
                        name={(selectItem.finishedPages == selectItem.numPages ? 'checkbox-active' : 'checkbox-passive')}
                        color={globalColors.gold}
                    />
                </Pressable>

                {selectItem.startAgain && <ButtonApp title={textToShow.startAgain} styleWrap={styleWrapBTN} styleText={styleTextBTN} onPress={startAgain} >
                    <View style={styles.wrapCupStartAgin}>
                        <CompletedTracking />
                    </View>
                </ButtonApp>}

            </View>


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
});