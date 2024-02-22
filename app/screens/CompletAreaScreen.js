// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import globalSizes from '../styleFile/globalSizes';
import AppIcon from '../components/AppIcon';
import globalColors from '../styleFile/globalColors';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"


export default function CompletAreaScreen({
    allData,
    setAllData,
    needToSaveChanges,
}) {

    let [completData, setCompletData] = useState({
        shas: [],
        cats: [],
        gmaras: [],
    })
    let [listRef, setListRef] = useState({
        cats: [],
        gmaras: [],
    })

    let sizeShas = 90;
    let sizeCat = 70;
    let sizeGmara = 50;

    let sizeTop = {
        shas: 25,
        cat: 18,
        gmara: 10,
    };
    
    useEffect(() => {
        if (allData) {
            initList()
            initData()
        }
    }, [])

    function initList() {
        let data = {
            gmaras: [],
            cats: [],
        }
        for (const cat of allData) {
            for (const gmara of cat.list) {
                data.gmaras.push(gmara)
            }
            data.cats.push(cat)
        }
        setListRef(data)
    }



    function initData() {
        let data = {
            shas: [],
            cats: [],
            gmaras: [],
        }


        let completedShas = allData[0].completed;

        for (const cat of allData) {
            let completedCat = cat.list[0].completed
            for (const gmara of cat.list) {
                if (completedCat > gmara.completed) {
                    completedCat = gmara.completed;
                }
                data.gmaras.push({ id: gmara.id, name: gmara.name, completed: gmara.completed, size: sizeGmara, type: 'gmara' })
            }
            data.cats.push({ id: cat.id, name: cat.name, completed: completedCat, size: sizeCat, type: 'cat' })
            if (completedShas > completedCat) {
                completedShas = completedCat;
            }
            cat.completed = completedCat
        }

        data.shas.push({ name: 'ש"ם', completed: completedShas, size: sizeShas, type: 'shas' })
        setCompletData(data)
    }

    function addComplet(item) {
        console.log("addComplet | item === ", item);
        if (item.type == 'cat') {
            let arr = listRef.gmaras.filter((gmara) => gmara.catId == item.id)
            // let cat = listRef.gmaras[index]
            arr.forEach((gmara) => {
                // console.log("catId ==== ", gmara.catId, "| name === ",gmara.name);
                gmara.completed++;
            })
        }
        if (item.type == 'gmara') {
            let index = listRef.gmaras.findIndex((gmara) => gmara.id == item.id)
            let gmara = listRef.gmaras[index]
            gmara.completed++;
        } if (item.type == 'shas') {
            listRef.gmaras.forEach((gamra) => {
                gamra.completed++;
            })
        }
        initData()
        needToSaveChanges()
        
    }


    function removeComplet(item) {
        console.log("removeComplet | item==== ", item);

        if (item.type == 'cat') {
            let arr = listRef.gmaras.filter((gmara) => gmara.catId == item.id)
            // let cat = listRef.gmaras[index]
            arr.forEach((gmara) => {
                if (!gmara.completed) {
                    console.log("1 catId ==== ", gmara.catId, "| name === ", gmara.name, '| completed', gmara.completed);
                    return console.log("removeComplet (gmara) stop - completed is to small");
                }
                console.log("2 catId ==== ", gmara.catId, "| name === ", gmara.name, '| completed', gmara.completed);
                gmara.completed--;
            })
        }

        if (!item.completed) {
            return console.log("removeComplet stop - completed is to small");
        }

        if (item.type == 'gmara') {
            let index = listRef.gmaras.findIndex((gmara) => gmara.id == item.id)
            let gmara = listRef.gmaras[index]
            gmara.completed--;
        }
        if (item.type == 'shas') {
            listRef.gmaras.forEach((gamra) => {
                gamra.completed--;
            })
        }
        initData()
        needToSaveChanges()
    }

    function Item({ item }) {
        // return <MIcon
        //     name={name || ''}
        //     size={globalSizes.iconSize}
        //     color={color || globalColors.gold}
        // />
        return (
            <View style={[styles.item, styles[item.type], globalSizes.flexColumnReverse]}>
                <View>
                    <MIcon
                        name={'trophy'}
                        size={item.size}
                        color={globalColors.gold2}
                    />
                </View>

                <Text style={[styles.textCompleted, styles.itemText, { top: sizeTop[item.type] }]}>{item.completed}</Text>

                <View style={[styles.icons, globalSizes.flexRow]}>
                    <View>
                        <MIcon
                            name={'chevron-right'}
                            size={30}
                            color={globalColors.gold2}
                            onPress={() => addComplet(item)}
                        />
                    </View>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View>

                        <MIcon
                            name={'chevron-left'}
                            size={30}
                            color={globalColors.gold2}
                            onPress={() => removeComplet(item)}
                        />
                    </View>
                </View>
                
            </View >
        )
    }
    return (
        <ScrollView>
            <View style={styles.CompletAreaScreen}>
                <View style={[styles.area, globalSizes.flexRow]}>
                    {!!completData.shas.length && completData.shas.map((item, index) => <Item item={item} key={("shas" + index)} />
                    )}
                </View>
                <View style={[styles.area, globalSizes.flexRow]}>
                    {!!completData.cats.length && completData.cats.map((item, index) => <Item item={item} key={("cats" + index)} />
                    )}
                </View>
                <View style={[styles.area, globalSizes.flexRow]}>
                    {!!completData.gmaras.length && completData.gmaras.map((item, index) => <Item item={item} key={("gmaras" + index)} />
                    )}
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    CompletAreaScreen: {

    },
    area: {
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: 30,
    },
    item: {
        alignItems: 'center',
        position: "relative",
        marginTop: 10,

    },
    icons: {
        // alignItems: 'left',
        // justifyContent: "center",

        // width:40,
        alignItems: 'center',
        // backgroundColor: 'red'
        padding: 0,
    },
    textCompleted: {
        alignItems: 'center',
        position: "absolute",
        top: 10,
    },
    shas: {

    },
    cat: {
        flexBasis: '32%',

    },
    gmara: {
        flexBasis: '32%',

    },
    itemText: {
        fontSize: 15,
        fontWeight: '600',
    },
});