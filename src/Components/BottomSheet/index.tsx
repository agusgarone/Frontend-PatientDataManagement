import React, {Dispatch, SetStateAction} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MyForm from '../Form';

const BottomSheet = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={() => setModalVisible(false)}
      useNativeDriver={true}
      propagateSwipe={true}>
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.text}>
            Aquí puedes agregar tu contenido que se puede scrollear dentro del
            modal.
          </Text>
          <MyForm />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    display: 'flex',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default BottomSheet;
