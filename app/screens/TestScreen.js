// import { useEffect, useState } from 'react';
// let [state, setState] = useState()
// useEffect(() => {    }, [allData])


import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';



export default function TestScreen({toOpanPopup, Component, backgroundNotClose }) {
    
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(()=>{
        setModalVisible(toOpanPopup)
    },[toOpanPopup])
    
    const closeModal = () => {
        setModalVisible(false);
    };
    
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>Show Popup</Text>
        </TouchableOpacity>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity onPressOut={()=>{!backgroundNotClose && closeModal()}} style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <Component />
                </View>
              </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
}


const styles = StyleSheet.create({
    TestScreen: {
        marginTop: 60,
        borderTopColor: "black",
        borderTopWidth: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   StyleSheet,
// } from 'react-native';

// const TestScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={openModal}>
//         <Text>Show Popup</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <TouchableWithoutFeedback onPress={closeModal}>
//           <View style={styles.modalContainer}>
//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 <Text>Popup Content Goes Here</Text>
 
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
// });

// export default TestScreen;
