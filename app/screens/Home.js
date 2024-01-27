import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { getAllData, deleteAllData, storeData } from "../storage/storageFunc";
import GmaraList from '../components/GmaraList';
import PageList from '../components/PageList';
import Gmara from '../components/Gmara';
import PageDataAnalysis from '../components/PageDataAnalysis';

export default function Home() {

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

    useEffect(() => {
        if (allData) {
            // console.log("allData = ", allData);
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
            // console.log("selectCat === ", selectCat.finishedPages);
            // console.log("selectCat === ", selectItem.finishedPages);
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
        setEventPage((new Date().getTime()) + "")
        needToSaveChanges()
    }

    return (
        <ScrollView>
            <View style={styles.Home}>
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
    )
}


const styles = StyleSheet.create({
    Home: {
        // backgroundColor: "red",
    },
    delete: {
        // backgroundColor: "red",
        color: "red",
        marginBottom: 20,
        marginTop: 20,
    },
});