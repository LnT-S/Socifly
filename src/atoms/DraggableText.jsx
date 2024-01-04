import React, { useRef } from 'react';
import { View, Text, PanResponder, Animated , StyleSheet} from 'react-native';
import { getResponsiveValue } from '../styles/responsive';
import { BLACK, POST2, PRIMARY, SECONDARY, WHITE, POST, POST1 } from '../styles/colors';

const DraggableText = (props) => {
  const textColorStyle = { color: props.textColor || WHITE };
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const { dx, dy } = gesture;
      const newX = dx;
      const newY = dy;

      // Define the boundaries for the movable area
      const minX = -115;
      const maxX = 115; // Adjust as needed
      const minY = -135;
      const maxY = 145; // Adjust as needed

      // Update the animated values only if within the boundaries
      if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
        pan.setValue({ x: newX, y: newY });
      }
    },
    onPanResponderRelease: () => {
      // You can perform additional actions when the user releases the text
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , ...styles.textBox}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Text style={[styles.nameC, textColorStyle]}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameC: {
    fontSize: getResponsiveValue(25, 15),
    color: BLACK,
    fontWeight: "900",
    letterSpacing: getResponsiveValue(1, 0.5),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
    //  backgroundColor: BLACK,
    // position: 'absolute',
    // left:getResponsiveValue("20%","20%"),
    // top: getResponsiveValue('34.5%', '34.5%'),
  },
  textBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "3%",
    // backgroundColor:'black',
    position: "absolute",
    height: "85%",
    width: "100%",
    left: "3%",
  }
})

export default DraggableText;
