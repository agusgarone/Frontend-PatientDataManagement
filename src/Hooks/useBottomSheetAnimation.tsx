import {useEffect} from 'react';
import {Animated} from 'react-native';

export const useBottomSheetAnimation = ({
  animation,
  fadeAnim,
  bottom,
  show,
  bottomSheetHeight,
  setOpen,
}: {
  animation: boolean;
  fadeAnim: Animated.Value;
  bottom: Animated.Value;
  show: boolean;
  bottomSheetHeight: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (animation) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [animation, fadeAnim]);

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 700,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottom, bottomSheetHeight, show]);
};
