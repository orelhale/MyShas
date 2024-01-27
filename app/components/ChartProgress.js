

import { StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import globalColors from '../styleFile/globalColors';
import globalSizes from '../styleFile/globalSizes';
import { Dimensions } from "react-native";
export default function ChartProgress({ styleData, chartData }) {
    const screenWidth = Dimensions.get("window").width;
    let elementWidth = Math.round(screenWidth * 0.33)

    // let chartData = {
    //     data: 0.4,
    //     lable: "0.4",
    // }

    // let leftSize = (chartData && (chartData.lable + "").length == 2 ? ((elementWidth - 100) + 20) : 0)
    let leftSize = 0
    if (chartData && (chartData.lable + "").length == 2) {
        leftSize = (elementWidth - 100) + 18;
    }
    if (chartData && (chartData.lable + "").length == 3) {
        leftSize = (elementWidth - 100) + 15;
    }
    if (chartData && (chartData.lable + "").length == 4) {
        leftSize = (elementWidth - 100) + 8;
    }
    // let leftSize = (chartData ? ((elementWidth - 100) + 20) : 0)
    // let leftSize = (chartData ? ((elementWidth - 100) + ((chartData.lable + "").length * 8)) : 0)
    // left = 50
    // console.log("left === ",left);
    styleData = styleData || {}
    styleData.backgroundColor = styleData.backgroundColor || globalColors.background
    styleData.color = styleData.color || ((opacity = 1) => `rgba(13, 136, 56, ${opacity})`)


    let chartConfig = {
        backgroundGradientFrom: (styleData && styleData.backgroundColor),
        backgroundGradientTo: (styleData && styleData.backgroundColor),
        decimalPlaces: 2,
        color: (styleData && styleData.color),
        style: {
            borderRadius: 16,
        },
        // backgroundColor: "#e26a00",
        // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        // labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
        // propsForDots: {
        //     r: "6",
        //     strokeWidth: "2",
        //     stroke: "#ffa726"
        // }
    }
    return (
        <>
            {chartData &&
                <View style={[styles.ChartProgress, { width: elementWidth }]}>
                    <Text style={[globalSizes.fontSize, styles.positionText, { left: leftSize }]}>{chartData.lable}</Text>
                    <ProgressChart
                        data={{ data: [chartData.data] }}
                        height={100}
                        width={100}
                        strokeWidth={16}
                        radius={40}
                        chartConfig={chartConfig}
                        hideLegend={true}
                    />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    positionText: {
        position: "absolute",
        top: 35,
        // left: 35,
        zIndex: 2,
    },
    ChartProgress: {
        position: "relative",
        flexDirection: 'row',
        justifyContent: "center",
    },
});