import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated } from "react-native";

const localStyles = StyleSheet.create({
  defaultContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "black"
  }
});

class Pulse extends React.Component {
  constructor(props) {
    super(props);

    this.pulseAnimation = null;
    this.opacityAnimation = null;

    this.state = {
      pulseAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.startAnimations();
  }

  startAnimations = () => {
    const { duration, scale, useNativeDriver } = this.props;

    this.pulseAnimation = Animated.timing(
      // Animate over time
      this.state.pulseAnim, // The animated value to drive
      {
        toValue: scale,
        duration,
        useNativeDriver
      }
    );

    this.opacityAnimation = Animated.timing(
      // Animate over time
      this.state.opacityAnim, // The animated value to drive
      {
        toValue: 0,
        duration,
        useNativeDriver
      }
    );

    this.pulseAnimation.start(this.resetAndRunAnimation);
    this.opacityAnimation.start(this.resetAndRunAnimation);
  };

  resetAndRunAnimation = o => {
    if (o.finished) {
      this.setState(
        {
          pulseAnim: new Animated.Value(1),
          opacityAnim: new Animated.Value(1)
        },
        this.startAnimations
      );
    }
  };

  render() {
    const { pulseAnim, opacityAnim } = this.state;
    const { diameter, style } = this.props;

    return (
      <Animated.View
        style={[
          style,
          {
            height: diameter,
            width: diameter,
            borderRadius: diameter / 2,
            transform: [
              {
                scale: pulseAnim
              }
            ],
            opacity: opacityAnim
          }
        ]}
      />
    );
  }
}

Pulse.propTypes = {
  scale: PropTypes.number,
  diameter: PropTypes.number,
  duration: PropTypes.number,
  useNativeDriver: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

Pulse.defaultProps = {
  diameter: 40,
  duration: 2150,
  scale: 2.5,
  useNativeDriver: true,
  style: localStyles.defaultContainer
};

export default Pulse;
