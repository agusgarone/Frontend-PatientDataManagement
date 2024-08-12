import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionText}>Aplication Patient Record</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  sectionText: {
    fontSize: 18,
  },
});

export default Header;
