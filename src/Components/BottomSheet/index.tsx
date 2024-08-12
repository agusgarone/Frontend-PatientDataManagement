import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {useBottomSheetAnimation} from '../../Hooks/useBottomSheetAnimation';
import MyForm from '../Form';

const BottomSheet = ({
  show,
  onDismiss,
  setAnimation,
  animation,
}: {
  show: boolean;
  onDismiss: () => void;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  animation: boolean;
}) => {
  const bottomSheetHeight = Dimensions.get('window').height * 0.93;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useBottomSheetAnimation({
    animation,
    bottom,
    bottomSheetHeight,
    fadeAnim,
    setOpen,
    show,
  });

  const onGesture = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (event?.nativeEvent?.translationY > 0) {
      bottom.setValue(-event?.nativeEvent?.translationY);
    }
  };

  const onGestureEnd = (event: any) => {
    if (event?.nativeEvent?.translationY > bottomSheetHeight / 3) {
      onDismiss();
      fadeOut({fadeAnim, setAnimation});
    } else {
      bottom.setValue(0);
    }
  };

  if (!open) {
    return null;
  }
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            height: Dimensions.get('window').height,
            opacity: fadeAnim,
          },
        ]}
      />
      <Animated.View
        style={[styles.container, {height: bottomSheetHeight, bottom: bottom}]}>
        <TouchableWithoutFeedback
          onPress={() => {
            onDismiss();
            fadeOut({fadeAnim, setAnimation});
          }}>
          <View
            style={{
              height: Dimensions.get('window').height * 0.125,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={[styles.modal]}>
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View style={styles.header}>
              <View style={styles.line} />
            </View>
          </PanGestureHandler>
          <View style={styles.content}>
            <MyForm onDismiss={onDismiss} />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const fadeOut = ({
  fadeAnim,
  setAnimation,
}: {
  fadeAnim: Animated.Value;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 700,
    useNativeDriver: true,
  }).start();
  setAnimation(false);
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  modal: {
    height: Dimensions.get('window').height * 0.81,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    minHeight: 30,
  },
  line: {height: 4, width: 60, backgroundColor: 'black'},
  slideBar: {
    marginVertical: 14,
  },
  title: {
    fontSize: 16,
    paddingBottom: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  content: {
    padding: 20,
    flex: 1,
  },
});

export default BottomSheet;
