import { I18nManager, StyleSheet } from "react-native";

let RTL = I18nManager.isRTL

export default globalSizes = StyleSheet.create({
    fontSize: {
        fontSize: 20,
    },
    flexRow: {
        flexDirection: (RTL ? "row" : "row-reverse"),
    },
    flexRowReverse: {
        flexDirection: (RTL ? "row-reverse" : "row"),
    },
    flexColumn: {
        flexDirection: (RTL ? "column" : "column-reverse"),
    },
    flexColumnReverse: {
        flexDirection: (RTL ? "column-reverse" : "column"),
    },
});