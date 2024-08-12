import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../Common/theme';

export const ButtonStyle = ({
  children,
  action,
}: {
  children: string;
  action: () => void;
}) => {
  return (
    <TouchableOpacity style={Styles.button} onPress={() => action()}>
      <Text style={Styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
  },
});
