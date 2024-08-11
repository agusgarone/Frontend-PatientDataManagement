import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Header from './components/Header';
import Card from './components/Card';
import useGetPatients from '../../Hooks/getPatients';
import BottomSheet from '../../Components/BottomSheet';
import {ButtonStyle} from '../../Components/ButtonStyle';
import useGlobalSessionState from '../../Services/globalStates';

const Home = () => {
  const {data, loading} = useGetPatients();
  const [show, setShow] = useState<boolean>(false);
  const {addPatients, patients} = useGlobalSessionState();

  useEffect(() => {
    if (data && data.length > 0) {
      addPatients(data); // Setea los pacientes en el estado global
    }
  }, [data, addPatients]);

  if (loading) {
    return (
      <View style={[styles.sectionContainer, styles.sectionLoading]}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <BottomSheet modalVisible={show} setModalVisible={setShow} />
      <View style={styles.sectionContainer}>
        <Header />
        <View style={styles.sectionButtons}>
          <ButtonStyle
            children="Create"
            key={'button-create'}
            action={() => setShow(true)}
          />
        </View>
        <View style={styles.sectionList}>
          <FlatList
            data={patients}
            style={styles.flatList}
            renderItem={({item}) => <Card patient={item} setShow={setShow} />}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    display: 'flex',
  },
  sectionLoading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionButtons: {
    width: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
  },
  sectionList: {
    width: 'auto',
    flex: 9,
  },
  flatList: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    flex: 1,
  },
});

export default Home;
