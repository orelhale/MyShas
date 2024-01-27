

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sizeStyle } from '../styleFile/sizeStyle';


export default function PageDataAnalysis({
    allData,
    selectCat,
    selectItem,
    eventPage,
}) {
    let [pageNumData, setPageNumData] = useState()


    useEffect(() => {
        if (allData) {
            return initPages("allShas", allData)
        }
        if (!allData && pageNumData) {
            return removeFild("allShas")
        }
    }, [allData])


    useEffect(() => {
        if (selectCat) {
            // console.log("selectCat ==== ", selectCat.numPages);
            return initPages("pageCat", selectCat.list, selectCat)
        }
        if (!selectCat && pageNumData) {
            return removeFild("pageCat")
        }
    }, [selectCat])


    useEffect(() => {
        if (selectItem) {
            // console.log("selectCat ==== ", selectCat.numPages);
            return initPages("pageGmara", [selectItem])
            // return addFild("pageGmara", selectItem.numPages)
        }
        if (!selectItem && pageNumData) {
            return removeFild("pageGmara")
        }
    }, [selectItem])


    // useEffect(() => {
    //     if (pageNumData) {
    //         console.log("pageNumData ==== ", pageNumData);
    //     }
    // }, [pageNumData])


    useEffect(() => {
        // כאשר מסמנים דף אז מתעזכנים כמויות הדפים בקומפוננטה
        if (eventPage) {
            // console.log("pageNumData = ", pageNumData);
            initPages("pageGmara", [selectItem])
            initPages("pageCat", selectCat.list, selectCat)
            initPages("allShas", allData)
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
        let value = parceList(list)
        // console.log(key,": value ==== ",value);
        addFild(key, value)

        if (obj) {
            obj.finishedPages = value.sumFinishedPages
        }
    }


    // מחשב ומחזיר את - 1) סך כמות הדפים הכללית 2) וסך וכמות הדפים שנחברו
    function parceList(list) {
        let sumPages = 0
        let sumFinishedPages = 0

        list.forEach((item) => {
            sumPages += item.numPages
            sumFinishedPages += item.finishedPages
        })
        // console.log("data ==== ", { sumPages, sumFinishedPages });
        return { sumPages, sumFinishedPages }
    }


    return (
        <>
            {pageNumData &&
                <View style={styles.PageDataAnalysis}>

                    {pageNumData.allShas &&
                        <View style={styles.details}>
                            <Text style={[styles.text, sizeStyle.fontSize]}>Page shas: {pageNumData.allShas.sumPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> Finished: {pageNumData.allShas.sumFinishedPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> {Math.floor((pageNumData.allShas.sumFinishedPages / pageNumData.allShas.sumPages) * 100)}%</Text>
                        </View>
                    }
                    {pageNumData.pageCat &&
                        <View style={styles.details}>
                            <Text style={[styles.text, sizeStyle.fontSize]}>Page cat: {pageNumData.pageCat.sumPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> Finished: {pageNumData.pageCat.sumFinishedPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> {Math.floor((pageNumData.pageCat.sumFinishedPages / pageNumData.pageCat.sumPages) * 100)}%</Text>
                        </View>
                    }
                    {pageNumData.pageGmara &&
                        <View style={styles.details}>
                            <Text style={[styles.text, sizeStyle.fontSize]}>Page gmara: {pageNumData.pageGmara.sumPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> Finished: {pageNumData.pageGmara.sumFinishedPages} </Text>
                            <Text style={[styles.text, sizeStyle.fontSize]}> {Math.floor((pageNumData.pageGmara.sumFinishedPages / pageNumData.pageGmara.sumPages) * 100)}%</Text>
                        </View>
                    }

                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    PageDataAnalysis: {

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
});