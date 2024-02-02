import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";


export default function Popup({
    toOpanPopup,
    backgroundNotClose,
    children,
    pressOnBackground,
    styleBackground,
    backdropOpacity,
}) {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(toOpanPopup)
    }, [toOpanPopup])

    return (
        <Modal
            isVisible={!!modalVisible}
            style={styles.wrapPopup}
            backdropColor={"#ddd"}
            backdropOpacity={(backdropOpacity || 0.1)}
            deviceHeight={"100%"}
            onBackdropPress={() => (!backgroundNotClose && pressOnBackground())}
        >
            <View style={styles.popup}>
                {children}
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    wrapPopup: {
        flex: 1,
        alignItems: "center",
    },
    popup: {
        backgroundColor: "red",
        borderColor: "#1890FF",
        width: 200,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#FFF",
        padding: 20,
        alignItems: "center",
        gap: 20,
    },
});