import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PageList from './PageList';
import { useCallback, useEffect, useState } from 'react';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import ButtonApp from './ButtonApp';
import CompletedTracking from './CompletedTracking';


export default function Gmara({
    setSelectItem,
    setListNamePage,
    listNamePage,
    selectItem,
    eventPageHndling,
    textToShow,
}) {
    let pageToComponent = 15

    let [arrListNamePage, setArrListNamePage] = useState()
    let [arrListObjNamePage, setArrListObjNamePage] = useState()

    // console.log("Gmara ????");


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

    // useEffect(() => {
    //     if (arrListObjNamePage) {
    //         // console.log("arrListObjNamePage ==== ", arrListObjNamePage);
    //         // console.log("arrListObjNamePage.length ==== ", arrListObjNamePage.length);
    //         // console.log("last listNamePage ==== ", listNamePage[listNamePage.length - 1]);
    //     console.log("arrListObjNamePage ==== ",JSON.parse(JSON.stringify(arrListObjNamePage)));

    //     }
    // }, [arrListObjNamePage])


    useEffect(() => {
        if (selectItem && listNamePage && listNamePage.length) {
            // console.log("selectItem.pageTrack ==== ",selectItem.pageTrack);
            // console.log("selectItem ==== ", selectItem);
            initGmara()
            // console.log("arr ==== ",arr);
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
            // console.log("arrObj["+index+"] ==== ",arrObj[index]);
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
        // console.log("selectPage: " + pageName + " = " + selectItem.pageTrack[pageName]);
        eventPageHndling(selected ? "select" : "unSelect")
    }, [])


    function selectAll_func() {
        let valueOfselectAll = selectItem.finishedPages == 0
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

    return (
        <View>
            <View style={[styles.wrapButtons, globalSizes.flexRowReverse]}>
                <ButtonApp title={` <- `} onPress={() => { removeSelect() }} />

                {selectItem.startAgain && <ButtonApp title={textToShow.startAgain} styleWrap={{ backgroundColor: globalColors.gold, paddingLeft: 15 }} styleText={{ color: "#fff" }} onPress={startAgain} >
                    <View style={styles.wrapCupStartAgin}>
                        <CompletedTracking style={styles.cupStartAgin} />
                    </View>
                </ButtonApp>}

                {/* {!selectItem.startAgain && <ButtonApp title={textToShow.multipleChoice} onPress={() => { }} />} */}
                <ButtonApp title={(selectItem.finishedPages == 0 ? textToShow.SelectAll : textToShow.UnSelectAll)} onPress={selectAll_func} />
            </View>

            <Text style={[styles.text, globalSizes.fontSize]}>{textToShow.Masechet + " " + selectItem.name}</Text>

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
    // wrapList: {
    //     display: "flex",
    //     flexWrap: "wrap",
    //     justifyContent: 'space-around',
    // },
    wrapPages: {
        // flex:1,
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        // marginBottom:50,
        // overflow:"scroll"
        // gap: 30,
        // justifyContent:"space-around"
    },
    wrapButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,

    },
    text: {
        textAlign: "center",
        marginBottom: 10,
        fontWeight: 800,
    },
    cupStartAgin: {
        position: "absolute",
        left: 32,
        top: 16,
    },
    wrapCupStartAgin: {
        position: "relative",
        zIndex: 2,
    },
});