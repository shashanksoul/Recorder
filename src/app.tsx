import {RotatingCircle, Timer} from '@components';
import React, {useRef} from 'react';
import {Button, View, Text} from 'react-native';
import {RotatingCircleRef} from './components/RotatingCircle';
import {useTimer} from '@hooks';

const App = () => {
  const {isRunning, start, getFormattedTime, stop} = useTimer();
  const rotatingCricleRef = useRef<RotatingCircleRef>(null);

  const startig = () => {
    if (isRunning) {
      stop();
      rotatingCricleRef.current?.stop();
      return;
    }
    start();
    rotatingCricleRef.current?.start();
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Timer
        containerStyle={{marginTop: 100}}
        isRunning={isRunning}
        timerValue={getFormattedTime()}
      />
      <RotatingCircle ref={rotatingCricleRef} runningBackgroundColor="red" />
      <Button title="start" onPress={startig} />
    </View>
  );
};

export default App;
