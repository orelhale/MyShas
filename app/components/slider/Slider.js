
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import globalSizes from '../../styleFile/globalSizes';

import RangeSlider from 'rn-range-slider';
import Thumb from './files/Thumb';
import RailSelected from './files/RailSelected';
import Rail from './files/Rail';
import Label from './files/Label';
import Notch from './files/Notch';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MIcon2 from "react-native-vector-icons/Fontisto"
import globalColors from '../../styleFile/globalColors';


export default function Slider({
   min = 0,
   max = 110,
   pageListName = [],
   emitRange,
}) {

   const [low, setLow] = useState(min);
   const [high, setHigh] = useState(max);
   const renderThumb = useCallback(() => <Thumb />, []);
   const renderRail = useCallback(() => <Rail />, []);
   const renderRailSelected = useCallback(() => <RailSelected />, []);
   const renderLabel = useCallback(value => <Label text={pageListName[value] || value} style={styles.titleSlider} />, []);
   const renderNotch = useCallback(() => <Notch />, []);
   const handleValueChange = useCallback((low, high) => {
      setLow(low);
      setHigh(high);
   }, []);

   function addSlider(set) {
      set((num) => (num + 1 > max) ? num : (num + 1))
   }

   function removeSlider(set) {
      set((num) => (num - 1 < min) ? num : (num - 1))
   }

   return (
      <View style={styles.Slider}>

         <View style={[styles.wrapTitles, globalSizes.flexRowReverse]}>
            <View style={[styles.titles, globalSizes.flexRowReverse]}>
               <Text style={[styles.titleText, { textAlign: "left" }]}>{pageListName[low] || low}</Text>
               <Text style={[styles.titleText, { textAlign: "center" }]}>{` <-> `}</Text>
               <Text style={[styles.titleText, { textAlign: "right" }]}>{pageListName[high] || high}</Text>
            </View>
         </View>

         <RangeSlider
            style={styles.rangeSlider}
            min={min}
            max={max}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
         />

         {/* כפתורים הוספה והורדה */}
         <View style={[globalSizes.flexRow, styles.wrapArrows]}>
            {[setHigh, setLow].map((set) => (
               <View style={[globalSizes.flexRow, styles.arrows]}>
                  <View style={styles.arrow}>
                     <MIcon
                        name={'chevron-right'}
                        onPress={() => addSlider(set)}
                        color={"#fff"}
                        size={30}

                     />
                  </View>

                  <View style={styles.arrow}>
                     <MIcon
                        name={'chevron-left'}
                        onPress={() => removeSlider(set)}
                        color={"#fff"}
                        size={30}

                     />
                  </View>
               </View>
            ))}
         </View>

         {/* כפתורים בחירה */}
         <View style={[globalSizes.flexRow, styles.wrapButtons]}>
            <View style={styles.wrapBtn}>
               <Pressable
                  style={({ pressed, }) => [styles.btnBorder, pressed && { backgroundColor: globalColors.backgroundGold }]}
                  onPress={() => emitRange && emitRange({ min: low, max: high, value: true, event: "selectRange" })}
               >
               </Pressable>

               <View style={[styles.btn]}>
                  <MIcon2
                     name={'checkbox-active'}
                     color={globalColors.gold}
                     size={20}

                  />
               </View>
            </View>

            <View style={styles.wrapBtn}>
               <Pressable
                  style={({ pressed, }) => [styles.btnBorder, pressed && { backgroundColor: globalColors.backgroundGold }]}
                  onPress={() => emitRange && emitRange({ min: low, max: high, value: false, event: "unselectRange" })}
               >
               </Pressable>

               <View style={[styles.btn]}>
                  <MIcon2
                     name={'checkbox-passive'}
                     color={globalColors.gold}
                     size={20}
                  />
               </View>
            </View>
         </View>
      </View>
   );
}


const styles = StyleSheet.create({
   Slider: {
      paddingTop: 30,
      paddingBottom: 30,
   },
   rangeSlider: {
      margin: 0,
      padding: 0,
      paddingLeft: 30,
      paddingRight: 30,
   },
   wrapTitles: {
      justifyContent: "center",
   },
   titles: {
      backgroundColor: '#4499ff',
      borderRadius: 10,
      padding: 5,
   },
   titleText: {
      minWidth: 26,
      fontSize: 20,
      paddingLeft: 5,
      paddingRight: 5,
      width: 55,
      color: "#fff"
   },
   titleSlider: {
      backgroundColor: '#4499ff',
      padding: 6,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 5,
   },
   wrapArrows: {
      justifyContent: "space-between",
      paddingLeft: 10,
      paddingRight: 10,
   },
   arrows: {
      gap: 10,
   },
   arrow: {
      borderWidth: 0.7,
      borderColor: globalColors.gold,
      padding: 2,
      borderRadius: 5,
      marginTop: 4,
      backgroundColor: globalColors.gold,
   },
   wrapButtons: {
      marginTop: 10,
      justifyContent: "center",
      gap: 80,
   },
   wrapBtn: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
   },
   btnBorder: {
      borderWidth: 1,
      borderColor: globalColors.gold,
      padding: 10,
      borderRadius: 50,
      zIndex: 4,
      position: "relative",
      padding: 22,
   },
   btn: {
      zIndex: 1,
      position: "absolute",
   },
});
