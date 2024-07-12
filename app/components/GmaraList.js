


import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import { Context } from '../screens/Context';


export default function GmaraList({
   allData,
   selectGmara,
   selectCatFunc,
   selectCat,
}) {

   let { startLoader, addFuncToReturnButton, textLang } = useContext(Context)

   // useEffect(() => {
   //    if (selectCat) {
   //       console.log("selectCat ===== ",selectCat);
   //    }
   // }, [])

   function pressCat(item) {
      // console.log("item ==== ", item);
      selectCatFunc(item)
      addFuncToReturnButton(removeSelect)
   }

   function pressGmara(item) {
      selectGmara(item)
      addFuncToReturnButton(() => selectGmara(null))
   }

   function removeSelect(item) {
      selectCatFunc(null)
   }

   return (
      <View>

         {allData && !selectCat && <View style={[styles.wrapList, globalSizes.flexRow]}>
            {allData.map((item, index) =>
               <Pressable
                  key={("Pressable1" + index)}
                  style={({ pressed }) => [styles.boxTtem, (pressed && { backgroundColor: globalColors.backgroundGold })]}
                  onPress={() => pressCat(item)}
               >
                  <Text style={styles.textItem}>{textLang[item.name] || item.name}</Text>
               </Pressable>
            )}
         </View>}

         {selectCat && <View style={[styles.wrapList, globalSizes.flexRow]}>
            {selectCat.list.map((item, index) =>
               <Pressable
                  key={("Pressable2" + index)}
                  style={({ pressed }) => [styles.boxTtem, (pressed && { backgroundColor: globalColors.backgroundGold })]}
                  onPress={() => {
                     startLoader()
                     pressGmara(item)
                  }}
               >
                  <Text style={styles.textItem}>{textLang[item.name] || item.name}</Text>
               </Pressable>
            )}
         </View>}

      </View>
   )
}


const styles = StyleSheet.create({
   wrapList: {
      display: "flex",
      // flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'space-around',
   },
   boxTtem: {
      marginBottom: 10,
      backgroundColor: 'red',
      backgroundColor: globalColors.gold,
      borderWidth: 1,
      borderColor: globalColors.gold,
      color: "red",
      fontSize: 30,
      flexBasis: "30%",
      justifyContent: 'center',
      alignItems: "center",
      height: 60,
      borderRadius: 20,
      paddingLeft: 8,
      paddingRight: 8,
   },
   textItem: {
      color: '#fff',
      fontSize: 20,
      textAlign: "center",
   },
});