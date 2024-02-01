

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from './ProgressCircle';
import globalSizes from '../styleFile/globalSizes';
import CompletedTracking from './CompletedTracking';
// import ChartProgress from './ChartProgress';
export default function PageDataAnalysis({
    allData,
    selectCat,
    selectItem,
    eventPage,
}) {
    let [pageNumData, setPageNumData] = useState()

    useEffect(() => {
        if (allData) {
            initPages("allShas", allData)
        }
        if (!allData && pageNumData) {
            removeFild("allShas")
        }
    }, [allData])


    useEffect(() => {
        if (selectCat) {
            // console.log("selectCat ==== ", selectCat.numPages);
            initPages("pageCat", selectCat.list, selectCat)
        }
        if (!selectCat && pageNumData) {
            removeFild("pageCat")
        }
    }, [selectCat])


    useEffect(() => {
        if (selectItem) {
            // console.log("selectCat ==== ", selectCat.numPages);
            selectItem.startAgain = (selectItem.finishedPages == selectItem.numPages)
            initPages("pageGmara", [selectItem])
            // addFild("pageGmara", selectItem.numPages)
        }
        if (!selectItem && pageNumData) {
            removeFild("pageGmara")
        }
    }, [selectItem])


    useEffect(() => {
        if (pageNumData) {
            // console.log("pageNumData ==== ", pageNumData);
        }
    }, [pageNumData])


    useEffect(() => {
        // כאשר מסמנים דף אז מתעזכנים כמויות הדפים בקומפוננטה
        if (eventPage) {
            // console.log("pageNumData = ", pageNumData);
            let pageGmara = initPages("pageGmara", [selectItem])
            let pageCat = initPages("pageCat", selectCat.list, selectCat)
            let allShas = initPages("allShas", allData)
            console.log("pageGmara ==== ", pageGmara.value);
            console.log("pageCat ==== ", pageCat.value);
            console.log("allShas ==== ", allShas.value);
            // let obj = {}
            // !!selectItem.catId && (obj.catId = selectItem.catId)
            // !!selectItem.id && (obj.id = selectItem.id)
            // !!selectItem.numPages && (obj.numPages = selectItem.numPages)
            // !!selectItem.name && (obj.name = selectItem.name)
            // !!selectItem.finishedPages && (obj.finishedPages = selectItem.finishedPages)
            // if(!obj.catId){
            //     console.log("cat 1 ==== ",obj);
            // }else{
            //     console.log("gmara 1 ==== ",obj);
            // }
        }
    }, [eventPage])


    function addFild(key, value) {
        let copy_pageNumData = pageNumData || {}
        copy_pageNumData[key] = value
        // console.log("copy_pageNumData ==== ",copy_pageNumData);
        setPageNumData({ ...copy_pageNumData })
    }


    function removeFild(key) {
        let copy_pageNumData = pageNumData || {}
        if (key in copy_pageNumData) {
            delete copy_pageNumData[key]
        }
        setPageNumData({ ...copy_pageNumData })
    }


    function initPages(key, list, obj) {
        if (!allData) {
            return
        }

        let sumCompleted = list[0]["completed"];
        list.forEach((item) => {
            if (item.completed != undefined && sumCompleted > item.completed) {
                sumCompleted = item.completed
            }
        })
        let value = parceList(list, (key == "pageGmara") ? null : sumCompleted);

        value.sumCompleted = sumCompleted;
        // console.log(key,": value ==== ",value);
        addFild(key, value);

        if (obj) {
            obj.finishedPages = value.sumFinishedPages
            obj.completed = value.sumCompleted
            obj.numPages = value.sumPages
        }
        return { value, obj }
    }


    // מחשב ומחזיר את - 1) סך כמות הדפים הכללית 2) וסך וכמות הדפים שנחברו
    function parceList(list, sumCompleted) {
        let sumPages = 0;
        let sumFinishedPages = 0;



        list.forEach((item) => {
            // if(!item.numPages)return
            sumPages += item.numPages
            sumFinishedPages += !sumCompleted ? item.finishedPages : ((item.completed > sumCompleted) ? item.numPages : item.finishedPages)
        })



        let dataInPercentage = Math.floor((sumFinishedPages / sumPages) * 100)
        // console.log("data ==== ", { sumPages, sumFinishedPages });
        return { sumPages, sumFinishedPages, dataInPercentage }
    }

    return (
        <>
            {pageNumData && <>
                <View style={[styles.PageDataAnalysis, globalSizes.flexRowReverse]}>
                    {pageNumData.allShas && <>
                        <View style={[styles.wrapData, globalSizes.flexColumnReverse]}>
                            {/* <CompletedTracking sumCompleted={(pageNumData.allShas.sumCompleted + (pageNumData.allShas.dataInPercentage == 100 ? 1 : 0))} /> */}
                            <CompletedTracking sumCompleted={pageNumData.allShas.sumCompleted} />
                            <ProgressCircle
                                chartData={{ data: (pageNumData.allShas.dataInPercentage / 100) }}
                            />
                        </View>
                    </>}
                    {pageNumData.pageCat && <>
                        <View style={[styles.wrapData, globalSizes.flexColumnReverse]}>
                            {/* <CompletedTracking sumCompleted={(pageNumData.pageCat.sumCompleted + (pageNumData.pageCat.dataInPercentage == 100 ? 1 : 0))} /> */}
                            <CompletedTracking sumCompleted={pageNumData.pageCat.sumCompleted} />
                            <ProgressCircle
                                chartData={{ data: (pageNumData.pageCat.dataInPercentage / 100) }}
                            />
                        </View>
                    </>}
                    {pageNumData.pageGmara && <>
                        <View style={[styles.wrapData, globalSizes.flexColumnReverse]}>
                            {/* <CompletedTracking sumCompleted={(pageNumData.pageGmara.sumCompleted + (pageNumData.pageGmara.dataInPercentage == 100 ? 1 : 0))} /> */}
                            <CompletedTracking sumCompleted={pageNumData.pageGmara.sumCompleted} />
                            <ProgressCircle
                                chartData={{ data: (pageNumData.pageGmara.dataInPercentage / 100) }}
                            />
                        </View>
                    </>}
                </View>

                {/* <View style={[styles.PageDataAnalysis, globalSizes.flexRowReverse]}>
                    {pageNumData.allShas && <ChartProgress
                        chartData={{ data: (pageNumData.allShas.dataInPercentage / 100), lable: `${pageNumData.allShas.dataInPercentage}%` }}/>}
                    {pageNumData.pageCat && <ChartProgress
                        chartData={{ data: (pageNumData.pageCat.dataInPercentage / 100), lable: `${pageNumData.pageCat.dataInPercentage}%` }}/>}
                    {pageNumData.pageGmara && <ChartProgress
                        chartData={{ data: (pageNumData.pageGmara.dataInPercentage / 100), lable: `${pageNumData.pageGmara.dataInPercentage}%` }}/>}
                </View> */}

                {/* <View style={[styles.PageDataAnalysis2, globalSizes.flexRowReverse]}>
                    {pageNumData.allShas &&
                        <View style={[styles.details, globalSizes.flexRowReverse]}>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}>Page shas: {"   "+pageNumData.allShas.sumPages} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> Finished: {pageNumData.allShas.sumFinishedPages} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> {pageNumData.allShas.dataInPercentage}%</Text>
                        </View>
                    }
                    {pageNumData.pageCat &&
                        <View style={[styles.details, globalSizes.flexRowReverse]}>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}>Page cat: {"      "+pageNumData.pageCat.sumPages} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> Finished: {pageNumData.pageCat.sumFinishedPages} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> {pageNumData.pageCat.dataInPercentage}%</Text>
                        </View>
                    }
                    {pageNumData.pageGmara &&
                        <View style={[styles.details, globalSizes.flexRowReverse]}>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}>Page gmara: {" "+pageNumData.pageGmara.sumPages+" "} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> Finished: {pageNumData.pageGmara.sumFinishedPages} </Text>
                            <Text style={[
                                styles.text,
                                // globalSizes.fontSize
                            ]}> {pageNumData.pageGmara.dataInPercentage}%</Text>
                        </View>
                    }
                </View> */}
            </>

            }
        </>
    )
}


const styles = StyleSheet.create({
    PageDataAnalysis: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    PageDataAnalysis2: {// למחוק אחרי שכל הסתדר

        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between"
    },
    text: {
        // width: "30%",
        paddingRight: 15,
        paddingLeft: 15,
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrapData: {
        alignItems: "center",
    },
});