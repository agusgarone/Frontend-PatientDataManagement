import React, {useState, useRef, Dispatch, SetStateAction} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import {IPatient} from '../../../../Interfaces/patient.model';
import {ButtonStyle} from '../../../../Components/ButtonStyle';
import useGlobalSessionState from '../../../../Services/globalStates';

const Card = ({
  patient,
  setShow,
}: {
  patient: IPatient;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const {setPatientSelected, deletePatient} = useGlobalSessionState();

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: false, // No usar useNativeDriver para animar height
    }).start();
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // Altura final del collapse al expandirlo
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionImage}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
          <View style={styles.sectionInformation}>
            <Text style={styles.title}>{patient.name}</Text>
            <Text style={styles.date}>{patient.createdAt}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content, {height: animatedHeight}]}>
        {expanded && (
          <ScrollView nestedScrollEnabled={true}>
            <Text style={styles.website}>{patient.website}</Text>
            <Text style={styles.description}>{patient.description}</Text>
            <View style={styles.sectionButtons}>
              <ButtonStyle
                children="Edit"
                key={'button-edit'}
                action={() => {
                  setPatientSelected(patient);
                  setShow(true);
                }}
              />
              <ButtonStyle
                children="Delete"
                key={'button-delete'}
                action={() => deletePatient(patient.id)}
              />
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'yellow',
  },
  sectionContainer: {
    width: 'auto',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  sectionInformation: {
    flex: 6,
    display: 'flex',
    paddingLeft: 8,
  },
  sectionImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 10,
  },
  website: {
    marginBottom: 4,
    color: 'blue',
  },
  description: {
    marginBottom: 8,
  },
  sectionButtons: {
    width: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});

export default Card;
