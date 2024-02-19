
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
// https://www.npmjs.com/package/@hebcal/learning#DafPage
import { HDate, DailyLearning, Event,HebrewDateEvent } from '@hebcal/core';
import globalSizes from '../styleFile/globalSizes';
import '@hebcal/learning';

let listNamePage = ["nullll_1", "nullll_2", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא", "לב", "לג", "לד", "לה", "לו", "לז", "לח", "לט", "מ", "מא", "מב", "מג", "מד", "מה", "מו", "מז", "מח", "מט", "נ", "נא", "נב", "נג", "נד", "נה", "נו", "נז", "נח", "נט", "ס", "סא", "סב", "סג", "סד", "סה", "סו", "סז", "סח", "סט", "ע", "עא", "עב", "עג", "עד", "עה", "עו", "עז", "עח", "עט", "פ", "פא", "פב", "פג", "פד", "פה", "פו", "פז", "פח", "פט", "צ", "צא", "צב", "צג", "צד", "צה", "צו", "צז", "צח", "צט", "ק", "קא", "קב", "קג", "קד", "קה", "קו", "קז", "קח", "קט", "קי", "קיא", "קיב", "קיג", "קיד", "קטו", "קטז", "קיז", "קיח", "קיט", "קכ", "קכא", "קכב", "קכג", "קכד", "קכה", "קכו", "קכז", "קכח", "קכט", "קל", "קלא", "קלב", "קלג", "קלד", "קלה", "קלו", "קלז", "קלח", "קלט", "קמ", "קמא", "קמב", "קמג", "קמד", "קמה", "קמו", "קמז", "קמח", "קמט", "קנ", "קנא", "קנב", "קנג", "קנד", "קנה", "קנו", "קנז", "קנח", "קנט", "קס", "קסא", "קסב", "קסג", "קסד", "קסה", "קסו", "קסז", "קסח", "קסט", "קע", "קעא", "קעב", "קעג", "קעד", "קעה", "קעו", "קעז", "קעח", "קעט", "קפ", "קפא", "קפב", "קפג", "קפד", "קפה", "קפו", "קפז", "קפח", "קפט", "קצ", "קצא", "קצב", "קצג", "קצד", "קצה", "קצו", "קצז", "קצח", "קצט"]

export default function PafYomiScreen2() {

    let [dafYomiList, setDafYomiList] = useState()
    let daylist = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
    useEffect(() => {
        let arr = getDafYomiList()
        // console.log("arr === ", arr);
        setDafYomiList(arr)
    }, [])


    let columPage = 1
    let rowPage = 7
    const dt = new Date();
    let hd = new HDate(dt)
    let currentDay = hd.getDay()

    function getDafYomiList() {

        // מחזיר את התאריך עד יום ראשון
        while (hd.getDay() > 0) {
            console.log("hd ==== ", hd.getDay());
            hd = hd.prev()
            // currentDay--
        }

        // console.log("hd==== ",dt.getTime());
        // const ev = DailyLearning.lookup('dafYomi', hd)

        let dayToAdd = 0
        let time = dt.getTime()
        let add = 86400000
        let list = []
        for (let i = 0; i < columPage; i++) {
            for (let i2 = 0; i2 < rowPage; i2++) {
                
                let newTime2 = hd.add(dayToAdd++)
                // console.log("newTime2 ==== ", newTime2.getMonthName());
                
                // let ev = new Event(newTime2,newTime2.getMonthName());
                // const ev = new HebrewDateEvent(newTime2);

                // console.log("ev ==== ", ev);
                
                
                // let newTime = new HDate(new Date(time))
                // time += add

                let daf = (DailyLearning.lookup('dafYomi', newTime2))
                console.log("daf ==== ", daf);
                daf = daf.daf
                daf.paneName = listNamePage[daf.blatt]
                list.push(daf)
            }
        }
        return list
    }

    return (
        <View style={[styles.PafYomiScreen, globalSizes.flexRow]}>

            {daylist.map(day => {
                return (
                    <View style={[styles.wrapDaf, globalSizes.flexRow]}>

                        <View style={styles.daf}>
                            <Text style={styles.textDay}>{day}</Text>
                        </View>
                    </View>
                )
            })}

            {(dafYomiList && dafYomiList.length) && dafYomiList.map((daf, index) => {
                return (
                    <View style={[styles.wrapDaf, globalSizes.flexRow]}>
                        <View style={[styles.daf, (currentDay == index) && { backgroundColor: 'blue' }]}>
                            <Text style={styles.textDaf}>{daf.name}</Text>
                            <Text style={styles.textDaf}>{daf.paneName}</Text>
                        </View>
                    </View>
                )
            })}

        </View>
    )
}


const styles = StyleSheet.create({
    PafYomiScreen: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 60,
        // gap: 20,
    },
    daf: {
        borderColor: "",
        backgroundColor: "red",
        alignItems: "center",
        borderRadius: 5,
        padding: "auto",
        margin: 5,
        padding: 5,
        marginBottom: 10,
        flex: 1,
    },
    wrapDaf: {
        width: "14%",
        justifyContent: "space-around",
    },

    textDaf: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
    textDay: {
        color: "#fff",
        fontSize: 13,
        textAlign: "center",
    },
});