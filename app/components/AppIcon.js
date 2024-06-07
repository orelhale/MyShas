
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MIcon2 from "react-native-vector-icons/Fontisto"
import MIcon3 from "react-native-vector-icons/Ionicons"
import MIcon4 from "react-native-vector-icons/MaterialIcons"
import MIcon5 from "react-native-vector-icons/Feather"
import globalSizes from '../styleFile/globalSizes';
import globalColors from '../styleFile/globalColors';
import { useMemo } from 'react';

const listpackageIcon = { 2: MIcon2, 3: MIcon3, 4: MIcon4, 5: MIcon5 };

export default function AppIcon({
    name,
    onPress,
    color,
    size,
    style,
    type,
}) {
    let Icon = useMemo(() => listpackageIcon[type] || MIcon)

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
            <Icon
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