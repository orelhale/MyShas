import { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import CheckBox from 'react-native-check-box';
import globalElements from '../styleFile/globalElements';


export default memo(PageList)
function PageList({
   selectItem,
   listOfPagesName,
   listOfPagesData,
   selectPage,
}) {

   let [pages, setPages] = useState()
   let [showPages, setShowPages] = useState()


   useEffect(() => {
      if (listOfPagesData) {
         // console.log("listOfPagesData ==== ", listOfPagesData);
         setPages(listOfPagesData)
      }
   }, [listOfPagesData])

   useEffect(() => {
      if (listOfPagesName) {
         // console.log("listOfPagesName ==== ", listOfPagesName);
         setShowPages(listOfPagesName)
      }
   }, [listOfPagesName])

   // useEffect(() => {
   //    if (pages) console.log("pages ==== ", pages);
   // }, [pages])

   // useEffect(() => {
   //    if (showPages && pages && flagToSelectAll != undefined) {
   //       // selectAllPage()
   //    }
   // }, [flagToSelectAll])


   // function selectAllPage() {
   //    for (const key in pages) {
   //       selectItem.pageTrack[key] = flagToSelectAll
   //       pages[key] = flagToSelectAll
   //    }
   //    setPages({ ...pages })
   // }


   function clickOnPage(pageName) {
      let selected = !selectItem.pageTrack[pageName]
      selectPage(pageName, selected)
      pages[pageName] = selected
      setPages({ ...pages })
   }

   return (
      // <View style={styles.PageList}>
      //    <View>
      //       <Button style={{ margin: 10 }} title={(`hidden`)} onPress={() => { setss(!ss) }}></Button>
      //    </View>

      //    <View style={[styles.wrapPages, { display: ss ? "none" : "flex" }]}>
      <>
         {showPages && pages && showPages.map((page, index) => {
            //  console.log("PageList ????");
            return (
               <View style={[styles.page, globalSizes.flexRow, globalElements.page]} key={("page" + index)}>
                  <View style={[styles.pageInside2, globalSizes.flexRow]}>

                     <Text style={[globalSizes.fontSize]}>{page}</Text>
                     <CheckBox style={[globalSizes.checkBox]} onClick={() => { clickOnPage(page) }} isChecked={pages[page]}></CheckBox>
                  </View>
               </View>
            )

         }
         )}
      </>
      //    </View>
      // </View>
   )
}


const styles = StyleSheet.create({
   PageList: {
   },
   // wrapPages: {
   //    flexWrap: "wrap",
   // },
   page: {
      flexDirection: "row-reverse",
      width: "25%"
      // width: 50,
   },
   pageInside: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      width: "70%",
   },
   pageInside2: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: "17%",
      paddingRight: "17%",
   },
   textPage: {

   },
});