
import { StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import globalColors from '../styleFile/globalColors';
import globalSizes from '../styleFile/globalSizes';
import { Dimensions } from "react-native";
export default function ChartProgress({ styleData, chartData }) {
    const screenWidth = Dimensions.get("window").width;
    let elementWidth = Math.round(screenWidth * 0.33)

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

    styleData = styleData || {}
    styleData.backgroundColor = styleData.backgroundColor || globalColors.appBackground
    styleData.color = styleData.color || ((opacity = 1) => `rgba(13, 136, 56, ${opacity})`)


    let chartConfig = {
        backgroundGradientFrom: (styleData && styleData.backgroundColor),
        backgroundGradientTo: (styleData && styleData.backgroundColor),
        decimalPlaces: 2,
        color: (styleData && styleData.color),
        style: {
            borderRadius: 16,
        },
    }
    return (
        <>
            {chartData &&
                <View style={[styles.ChartProgress, globalSizes.flexRow, { width: elementWidth }]}>
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
        zIndex: 2,
    },
    ChartProgress: {
        position: "relative",
        justifyContent: "center",
    },
});