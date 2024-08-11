import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import useGlobalSessionState from '../../Services/globalStates';
import {IPatient} from '../../Interfaces/patient.model';
import moment from 'moment';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  website: Yup.string()
    // .url('Debe ser una URL válida')
    .required('El sitio web es requerido'),
});

const MyForm = () => {
  const [imageUri, setImageUri] = useState('');
  const {getPatientSelected, updatePatient, addPatient} =
    useGlobalSessionState();
  const pacienteSelected = getPatientSelected();

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    website: '',
    avatar: '',
  });

  useEffect(() => {
    if (pacienteSelected) {
      setInitialValues({
        name: pacienteSelected.name,
        description: pacienteSelected.description,
        website: pacienteSelected.website,
        avatar: !pacienteSelected.avatar ? '' : pacienteSelected.avatar,
      });
      setImageUri(pacienteSelected.avatar || ''); // Setea la imagen si existe
    }
  }, [pacienteSelected]);

  const pickImage = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.assets) {
      setImageUri(
        result.assets[0].uri === undefined ? '' : result.assets[0].uri,
      );
      setFieldValue('image', result.assets[0]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={values => {
        console.log(values);
        if (pacienteSelected) {
          const pacienteUpdate = {
            ...pacienteSelected,
            ...values,
          };
          updatePatient(pacienteUpdate);
        } else {
          const newPatient: IPatient = {
            ...values,
            id: `${Math.floor(Math.random() * 900000) + 100000}`,
            avatar: values.avatar || '',
            createdAt: moment().format('YYYY-MM-DD'),
          };
          addPatient(newPatient);
        }
        // * creacion del servicio de alta, update y eliminacion de pacientes
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.form}>
          <View>
            <TouchableOpacity
              onPress={() => pickImage(setFieldValue)}
              style={styles.imagePicker}>
              {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.image} />
              ) : (
                <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
              )}
            </TouchableOpacity>
            {errors.avatar && touched.avatar && (
              <Text style={styles.error}>{errors.avatar}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
              numberOfLines={4}
            />
            {errors.description && touched.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Sitio web"
              onChangeText={handleChange('website')}
              onBlur={handleBlur('website')}
              value={values.website}
              keyboardType="url"
            />
            {errors.website && touched.website && (
              <Text style={styles.error}>{errors.website}</Text>
            )}
          </View>
          <Button title="Enviar" onPress={() => handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default MyForm;