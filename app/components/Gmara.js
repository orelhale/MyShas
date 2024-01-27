import { Button, I18nManager, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PageList from './PageList';
import { useCallback, useEffect, useState } from 'react';
import textToShow from '../data/textToShow';
import globalSizes from '../styleFile/globalSizes';


export default function Gmara({
    setSelectItem,
    setListNamePage,
    listNamePage,
    selectItem,
    eventPageHndling,
}) {
    let pageToComponent = 15
    let RTL = I18nManager.isRTL

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

        for (const obj of arrListObjNamePage) {
            for (const pageName in obj) {
                // שינוי כל הדפים למה שנבחר, בשביל שהתוצאה של הבחירה תיראה על המסך
                obj[pageName] = valueOfselectAll
                // וגם מאתחל את אובייקט המידע לתוצאה של הבחירה
                selectItem.pageTrack[pageName] = valueOfselectAll
            }
        }
        eventPageHndling(valueOfselectAll ? "selectAll" : "unSelectAll")
        setArrListObjNamePage(JSON.parse(JSON.stringify(arrListObjNamePage)))
    }

    return (
        <View>
            <View style={[styles.wrapButtons, RTL && { flexDirection: "row-reverse" }]}>
                <Button title={(` <- `)} onPress={() => { removeSelect() }} />
                <Button title={selectItem.finishedPages == 0 ? textToShow.SelectAll : textToShow.UnSelectAll} onPress={selectAll_func} />
            </View>

            <Text style={[styles.text, globalSizes.fontSize]}>{textToShow.Masechet + " " + selectItem.name}</Text>

            <View style={[styles.wrapPages, RTL && { flexDirection: "row" }]}>
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

    },
    text: {
        textAlign: "center",
        marginBottom: 10,
        fontWeight: 800,
    },
});