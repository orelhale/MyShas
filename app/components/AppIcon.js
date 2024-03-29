
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';


export default function AppIcon({
    name,
    onPress,
    color,
    size,
    style
}) {

    return (
        <Pressable
            onPress={() => onPress && onPress()}
            style={({ pressed }) => [
                styles.button,
                size && { width: size, height: size, },
                { backgroundColor: pressed ? globalColors.backgroundGold : 'white' },
                style && style,
            ]}
        >
            <MIcon
                name={name || ''}
                size={size || globalSizes.iconSize}
                color={color || globalColors.gold}
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        borderWidth: 0.5,
        width: 35,
        height: 35,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderColor: globalColors.gold,
    },
});