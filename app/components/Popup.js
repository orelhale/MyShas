import { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';


export default function Popup({ toOpanPopup, Component, backgroundNotClose }) {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // setTimeout(()=>{
        setModalVisible(toOpanPopup)
        // },5000)
    }, [toOpanPopup])

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.wrapContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                {!backgroundNotClose &&
                    <TouchableOpacity onPressOut={() => { !backgroundNotClose && closeModal() }} style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Component funcToClosePopup={closeModal} />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                }

                {backgroundNotClose &&
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Component funcToClosePopup={closeModal} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: "100%",
        width: "100%",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});