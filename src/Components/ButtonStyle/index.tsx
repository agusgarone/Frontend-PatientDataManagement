import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const ButtonStyle = ({
  children,
  action,
}: {
  children: string;
  action: () => void;
}) => {
  return (
    <TouchableOpacity style={Styles.button} onPress={() => action()}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  button: {
    width: 80,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    marginLeft: 8,
  },
});
