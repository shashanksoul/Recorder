import React, {forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type RotatingCircleProps = {
  runningBackgroundColor?: string;
  backgroundColor?: string;
  intitalSpeed?: number;
};

export type RotatingCircleRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  updateSpeed: (speed: number) => void;
};

const RotatingCircle: React.ForwardRefRenderFunction<
  RotatingCircleRef,
  RotatingCircleProps
> = (props, ref) => {
  const {
    runningBackgroundColor = 'white',
    intitalSpeed = 1,
    backgroundColor = 'black',
  } = props;
  const rotateDegree = useSharedValue(0);
  const [rotationSpeed, setRotatingSpeed] = React.useState(intitalSpeed);
  const [isRotating, setIsRotating] = React.useState(false);

  const startAnimation = () => {
    setIsRotating(true);
  };

  React.useEffect(() => {
    if (isRotating) {
      rotateDegree.value = withRepeat(
        withTiming(rotateDegree.value + 360, {
          duration: 10000 / rotationSpeed,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }
  }, [isRotating, rotationSpeed, rotateDegree]);

  const stopAnimation = () => {
    cancelAnimation(rotateDegree);
    setIsRotating(false);
  };

  const reset = () => {
    stopAnimation();
    setRotatingSpeed(intitalSpeed);
    rotateDegree.value = 0;
  };

  const updateSpeed = (speed: number) => {
    setRotatingSpeed(speed);
  };

  useImperativeHandle(ref, () => ({
    start: startAnimation,
    stop: stopAnimation,
    reset,
    updateSpeed,
  }));

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{rotate: `${rotateDegree.value}deg`}]};
  });

  const bGColor = isRotating ? runningBackgroundColor : backgroundColor;

  return (
    <View style={[styles.containerCircle, {borderColor: bGColor}]}>
      <Animated.View
        style={[styles.divider, {backgroundColor: bGColor}, animatedStyle]}
      />
      <View style={styles.innerContainer}>
        <View style={[styles.innerContainerCircle, {borderColor: bGColor}]}>
          <View style={[styles.innerCircle, {backgroundColor: bGColor}]} />
        </View>
      </View>
    </View>
  );
};

export default forwardRef(RotatingCircle);
