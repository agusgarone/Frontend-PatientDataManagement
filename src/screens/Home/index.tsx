import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Header from './components/Header';
import Card from './components/Card';
import useGetPatients from '../../Hooks/getPatients';
import BottomSheet from '../../Components/BottomSheet';
import {ButtonStyle} from '../../Components/ButtonStyle';
import useGlobalSessionState from '../../Services/globalStates';
import {colors} from '../../Common/theme';

const Home = () => {
  const {data, loading} = useGetPatients();
  const [show, setShow] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const {addPatients, setPatientSelected, patients} = useGlobalSessionState();

  useEffect(() => {
    if (data && data.length > 0) {
      addPatients(data);
    }
  }, [data, addPatients]);

  useEffect(() => {
    if (!show) {
      setPatientSelected({
        avatar: '',
        createdAt: '',
        description: '',
        id: '',
        name: '',
        website: '',
      });
    }
  }, [setPatientSelected, show]);

  if (loading) {
    return (
      <View style={[styles.sectionContainer, styles.sectionLoading]}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <BottomSheet
        animation={animation}
        onDismiss={() => setShow(false)}
        show={show}
        setAnimation={setAnimation}
        key={'BottomSheet'}
      />
      <View style={styles.sectionContainer}>
        <Header />
        <View style={styles.sectionButtons}>
          <View style={styles.buttonView}>
            <ButtonStyle
              children="Create"
              key={'button-create'}
              action={() => setShow(true)}
            />
          </View>
        </View>
        <View style={styles.sectionList}>
          <FlatList
            data={patients}
            style={styles.flatList}
            renderItem={({item}) => <Card patient={item} setShow={setShow} />}
            ListFooterComponent={<View style={styles.footerList} />}
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
    backgroundColor: colors.white,
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
  footerList: {
    marginBottom: 40,
  },
  buttonView: {
    width: 80,
    marginLeft: 8,
  },
});

export default Home;
