import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import { getAllData, deleteAllData, storeData, deleteLang } from "../storage/storageFunc";
import GmaraList from '../components/GmaraList';
import Gmara from '../components/Gmara';
import PageDataAnalysis from '../components/PageDataAnalysis';
import globalColors from '../styleFile/globalColors';
import textToShow from '../data/textToShow';
import Loader from '../components/Loader';
import { Context } from './Context';
import Loader4 from '../tempComponent/Loader4';
import Loader3 from '../tempComponent/Loader3';
import Loader2 from '../tempComponent/Loader2';


export default function HomeScreen({
    allData,
    setAllData,
    needToSaveChanges,
}) {

    let [selectItem, setSelectItem] = useState()
    let [selectCat, setSelectCat] = useState()
    // let [allData, setAllData] = useState()
    let [listNamePage, setListNamePage] = useState()


    let [eventPage, setEventPage] = useState(false)

    let { showLoader , lang} = useContext(Context)


    // useEffect(() => {
    //     if (allData) {
    //         console.log("allData = ",allData);
    //     }
    // }, [allData])

    useEffect(() => {
        if (selectItem) {
            // console.log("selectItem === ",selectItem);
            return setListNamePage(Object.keys(selectItem.pageTrack))
        }
        if (!selectItem && listNamePage) {
            return setListNamePage(null)
        }
    }, [selectItem])



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
            selectItem.finishedPages = selectItem.numPages
        }
        if (event == "unSelectAll") {
            selectItem.finishedPages = 0
        }

        if (event == "startAgain") {

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

                    {/* <View style={styles.delete}>
                        <Button color={"red"} title='Delete data' onPress={deleteAll}></Button>
                        <Button color={"red"} title='Delete lang' onPress={() => { deleteLang(); setLang() }}></Button>
                    </View> */}

                    {!selectItem && <GmaraList
                        allData={allData}
                        selectGmara={selectGmara}
                        selectCatFunc={selectCatFunc}
                        selectCat={selectCat}
                    />}

                    {selectItem && listNamePage && <View style={styles.wrapGmara}>
                        <Gmara
                            listNamePage={listNamePage}
                            setListNamePage={setListNamePage}
                            setSelectItem={setSelectItem}
                            selectItem={selectItem}
                            eventPageHndling={eventPageHndling}
                            textToShow={textToShow[lang]}

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

                        <View style={[{ display: showLoader ? "flex" : "none" }, styles.wrapLoader]}>
                            <Loader4 />
                        </View>
                    </View>
                    }

                </View>
                <View style={[{ display: showLoader ? "flex" : "none" }, styles.wrapLoader]}>
                    <Loader4 />
                </View>
            </ScrollView>
        }</>
    )
}


const styles = StyleSheet.create({
    HomeScreen: {
        // backgroundColor: globalColors.background,
        // flex: 1,
        // marginTop: 5,
        // marginTop: 60,
    },
    delete: {
        // backgroundColor: "red",
        color: "red",
        marginBottom: 20,
        // marginTop: 10,
    },
    wrapGmara: {
        position: "relative",
    },
    wrapLoader: {
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        height: 400,
        // height: "100%",
        // flex: 1,
        // top: 0,
        // button: 0,

        // top: '50%',
        // zIndex: 50,
        // left: 150,
        // backgroundColor: "red"
    },
});