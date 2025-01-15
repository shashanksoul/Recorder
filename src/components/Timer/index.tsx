import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import styles from './styles';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type TimerProps = {
  isRunning: boolean;
  timerValue: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const Timer: React.FC<TimerProps> = ({
  isRunning,
  timerValue,
  containerStyle,
}) => {
  const animatedOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (isRunning) {
      console.log(animatedOpacity.value);
      animatedOpacity.value = withRepeat(
        withTiming(0, {duration: 500, easing: Easing.ease}),
        -1,
        true,
      );
    } else {
      cancelAnimation(animatedOpacity);
      animatedOpacity.set(1);
    }
  }, [animatedOpacity, isRunning]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: animatedOpacity.value,
  }));

  return (
    <View style={[styles.continer, containerStyle]}>
      {isRunning && <Animated.View style={[styles.dot, animatedDotStyle]} />}
      <Text style={{textAlign: 'left', width: 70}}>{timerValue}</Text>
    </View>
  );
};

export default Timer;
