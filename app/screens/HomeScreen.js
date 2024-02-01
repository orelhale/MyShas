import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { getAllData, deleteAllData, storeData } from "../storage/storageFunc";
import GmaraList from '../components/GmaraList';
import PageList from '../components/PageList';
import Gmara from '../components/Gmara';
import PageDataAnalysis from '../components/PageDataAnalysis';
import globalColors from '../styleFile/globalColors';
import ProgressCircle from '../components/ProgressCircle';
// import ChartProgress from '../components/ChartProgress';
// import PieComponent from '../components/PieComponent';

export default function HomeScreen() {

    let [selectItem, setSelectItem] = useState()
    let [selectCat, setSelectCat] = useState()
    let [allData, setAllData] = useState()
    let [listNamePage, setListNamePage] = useState()

    let [flagSaveDate, setFlagSaveDate] = useState(false)
    let [flagTo_FlagSaveDate, setFlagTo_FlagSaveDate] = useState(false)
    let [eventPage, setEventPage] = useState(false)
    let timeToSave = 3000;

    useEffect(() => {
        initData()
    }, [])
    let temp = { "name": "נדה 2", "numPages": 143, "completed": 0, "finishedPages": 0, "id": 42, "catId": "6", "pageTrack": { "ב.": false, "ב:": false, "ג.": false, "ג:": false, "ד.": false, "ד:": false, "ה.": false, "ה:": false, "ו.": false, "ו:": false, "ז.": false, "ז:": false, "ח.": false, "ח:": false, "ט.": false, "ט:": false, "י.": false, "י:": false, "יא.": false, "יא:": false, "יב.": false, "יב:": false, "יג.": false, "יג:": false, "יד.": false, "יד:": false, "טו.": false, "טו:": false, "טז.": false, "טז:": false, "יז.": false, "יז:": false, "יח.": false, "יח:": false, "יט.": false, "יט:": false, "כ.": false, "כ:": false, "כא.": false, "כא:": false, "כב.": false, "כב:": false, "כג.": false, "כג:": false, "כד.": false, "כד:": false, "כה.": false, "כה:": false, "כו.": false, "כו:": false, "כז.": false, "כז:": false, "כח.": false, "כח:": false, "כט.": false, "כט:": false, "ל.": false, "ל:": false, "לא.": false, "לא:": false, "לב.": false, "לב:": false, "לג.": false, "לג:": false, "לד.": false, "לד:": false, "לה.": false, "לה:": false, "לו.": false, "לו:": false, "לז.": false, "לז:": false, "לח.": false, "לח:": false, "לט.": false, "לט:": false, "מ.": false, "מ:": false, "מא.": false, "מא:": false, "מב.": false, "מב:": false, "מג.": false, "מג:": false, "מד.": false, "מד:": false, "מה.": false, "מה:": false, "מו.": false, "מו:": false, "מז.": false, "מז:": false, "מח.": false, "מח:": false, "מט.": false, "מט:": false, "נ.": false, "נ:": false, "נא.": false, "נא:": false, "נב.": false, "נב:": false, "נג.": false, "נג:": false, "נד.": false, "נד:": false, "נה.": false, "נה:": false, "נו.": false, "נו:": false, "נז.": false, "נז:": false, "נח.": false, "נח:": false, "נט.": false, "נט:": false, "ס.": false, "ס:": false, "סא.": false, "סא:": false, "סב.": false, "סב:": false, "סג.": false, "סג:": false, "סד.": false, "סד:": false, "סה.": false, "סה:": false, "סו.": false, "סו:": false, "סז.": false, "סז:": false, "סח.": false, "סח:": false, "סט.": false, "סט:": false, "ע.": false, "ע:": false, "עא.": false, "עא:": false, "עב.": false, "עב:": false, "עג.": false } }

    useEffect(() => {
        if (allData) {
            // let obj = allData.find((c)=>c.id == 6)
            // obj.list.push(temp)
            for (const cat of allData) {
                let {name,completed } = cat
                // console.log("name = ",name);
                // console.log("completed = ",completed);
            }
        }
    }, [allData])

    useEffect(() => {
        if (selectItem) {
            // console.log("selectItem === ",selectItem);
            return setListNamePage(Object.keys(selectItem.pageTrack))
        }
        if (!selectItem && listNamePage) {
            return setListNamePage(null)
        }
    }, [selectItem])

    useEffect(() => {
        if (flagSaveDate) {
            setTimeout(() => {
                setFlagTo_FlagSaveDate(true)
            }, timeToSave)
        }
    }, [flagSaveDate])

    useEffect(() => {
        if (flagTo_FlagSaveDate) {
            saveChanges(allData)
        }
    }, [flagTo_FlagSaveDate])

    async function initData() {
        let data = await getAllData()
        setAllData(data)
    }

    function selectGmara(gmara) {
        setSelectItem(gmara)
    }

    function selectCatFunc(cat) {
        setSelectCat(cat)
    }

    function needToSaveChanges(dataToSaveNow) {
        if (dataToSaveNow) {
            return saveChanges(dataToSaveNow)
        }
        if (!flagSaveDate) {
            setFlagSaveDate(true)
        }
    }

    function saveChanges(data) {
        setFlagSaveDate(false)
        setFlagTo_FlagSaveDate(false)

        // let catIndex = allData.findIndex((cat)=>cat.id == selectItem.catId)
        // let index = allData[catIndex].list.findIndex((gmara)=>gmara.id == selectItem.id)
        // console.log("catIndex === ",catIndex);
        // console.log("index === ",index);
        // console.log("allData[catIndex].list[index] === ",allData[catIndex].list[index]);

        storeData(data)
        console.log("---- Data saving  ----");
    }

    function deleteAll() {
        deleteAllData()
        setListNamePage()
        setSelectCat()
        setAllData()
        setSelectItem()
        initData()
    }

    function eventPageHndling(event) {
        console.log("event === ", event);
        if (!event) return

        if (event == "select") {
            selectCat.finishedPages++
            selectItem.finishedPages++
            // console.log("selectItem === ", selectItem.finishedPages);
            // console.log("selectCat === ", selectCat.finishedPages);
        }
        if (event == "unSelect") {
            selectCat.finishedPages--
            selectItem.finishedPages--
            // console.log("unSelect === ", selectCat.finishedPages);
            // console.log("unSelect === ", selectItem.finishedPages);
        }
        if (event == "selectAll") {
            // allData[selectItem.catId]
            // let catIndex = allData.findIndex((cat) => cat.id == selectItem.catId)
            // let index = allData[catIndex].list.findIndex((gmara) => gmara.id == selectItem.id)
            // console.log("catIndex === ", catIndex);
            // console.log("index === ", index);
            // console.log("allData[catIndex].list[index] ==== ", allData[catIndex].list[index]);

            // let finishedPages = allData[catIndex].list[index].finishedPages
            // let finishedPages = selectItem.finishedPages

            // console.log("selectCat.finishedPages 1  ==== ", selectCat.finishedPages);
            // selectCat.finishedPages = (selectCat.finishedPages - finishedPages) + selectCat.numPages
            // console.log("selectCat.finishedPages 2  ==== ", selectCat.finishedPages);
            selectItem.finishedPages = selectItem.numPages
        }
        if (event == "unSelectAll") {
            // let finishedPages = selectItem.finishedPages
            // selectCat.finishedPages = selectCat.finishedPages - finishedPages
            selectItem.finishedPages = 0
        }

        if (event == "startAgain") {
            if (selectCat.finishedPages == selectCat.numPages) {
                console.log("yesssssssssssssssssssssssssssssssss");
            }
        }

        selectItem.startAgain = (selectItem.finishedPages == selectItem.numPages)

        // console.log("selectItem.finishedPages === ", selectItem.finishedPages);
        // console.log("selectItem.numPages === ", selectItem.numPages);
        // console.log("selectItem.startAgain === " + selectItem.startAgain);
        setEventPage((new Date().getTime()) + "")
        needToSaveChanges()
    }

    return (
        <>{allData &&
            <ScrollView>
                <View style={styles.HomeScreen}>
                    <PageDataAnalysis
                        allData={allData}
                        selectCat={selectCat}
                        selectItem={selectItem}
                        eventPage={eventPage}
                    />

                    <View style={styles.delete}>
                        <Button color={"red"} title='Delete data' onPress={deleteAll}></Button>
                    </View>

                    {!selectItem && <GmaraList
                        allData={allData}
                        selectGmara={selectGmara}
                        selectCatFunc={selectCatFunc}
                        selectCat={selectCat}
                    />}

                    {selectItem && listNamePage && <>
                        <Gmara
                            listNamePage={listNamePage}
                            setListNamePage={setListNamePage}
                            setSelectItem={setSelectItem}
                            selectItem={selectItem}
                            eventPageHndling={eventPageHndling}
                        />
                        {/* <View>
                    <Button title={(`<-`)} onPress={() => { removeSelect() }}></Button>
                    </View>
                    <PageList
                    selectItem={selectItem}
                    setSelectItem={setSelectItem}
                    listOfPagesName={listNamePage.splice(0, 10)}
                    listOfPagesData={copyObj(listNamePage, 10)}
                /> */}

                    </>}
                </View>
            </ScrollView>
        }</>
    )
}


const styles = StyleSheet.create({
    HomeScreen: {
        backgroundColor: globalColors.background,
        flex: 1,
        marginTop: 5,
    },
    delete: {
        // backgroundColor: "red",
        color: "red",
        marginBottom: 20,
        // marginTop: 10,
    },
});