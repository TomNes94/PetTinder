import {PropsWithChildren} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({
  children,
  onSwipeOff,
}: PropsWithChildren<{onSwipeOff: () => void}>) => {
  const translateX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      const toRight = translateX.value > 0;

      if (Math.abs(translateX.value) > 100) {
        translateX.value = withSpring(
          toRight ? SCREEN_WIDTH : -SCREEN_WIDTH,
          {
            duration: 100,
          },
          () => {
            // Run the callback after the swipe off animation
            onSwipeOff();
            translateX.value = toRight ? -SCREEN_WIDTH : SCREEN_WIDTH;
            translateX.value = withSpring(0, {
              mass: 2,
              damping: 42,
              stiffness: 235,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 2,
            });
          },
        );
      } else {
        translateX.value = withSpring(0);
      }
    },
  });
  console.log(translateX.value);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default SwipeableCard;
