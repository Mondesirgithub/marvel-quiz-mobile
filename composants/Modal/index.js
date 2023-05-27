import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const Modal = ({afficherModal, children}) => {
  return (
    afficherModal && (
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            {children}
        </View>
    </View>)
  )
}


const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flexGrow: 0,
    flexShrink:1,
    flexBasis: '100%', 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    width: '100%',
    height: '100%',
    marginTop: '100%',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
    flexDirection: 'column',
  },
})

export default Modal
