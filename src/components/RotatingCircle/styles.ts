import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 containerCircle: {
          height: 350,
          width: 350,
          borderRadius: 175,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'white',
        },
innerContainerCircle: {
          height: 80,
          width: 80,
          borderRadius: 40,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'white',

          },
innerContainer: {
            height: 160,
            width: 160,
            borderRadius: 80,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          },
innerCircle: {
              height: 24,
              width: 24,
              borderRadius: 12,
            },
divider: {
            height: 2,
            width: 280,
            position: 'absolute',
          },
});





export default styles;
