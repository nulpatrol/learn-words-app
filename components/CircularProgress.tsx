import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const generateArc = (initialPercentage: number, radius: number): string => {
  const percentage = (initialPercentage === 100) ? initialPercentage : 99.999;

  const angle = (percentage * 2 * Math.PI) / 100;
  const x = radius + (radius * Math.sin(angle));
  const y = radius - (radius * Math.cos(angle));

  const largeArcFlag = (percentage <= 50) ? 0 : 1;
  return `A${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}`;
};

type CircularProgressProps = {
  percentage: number;
  blankColor: string;
  donutColor: string;
  fillColor: string;
  progressWidth: number;
  size: number;
  children: React.ReactNode | undefined;
};

const CircularProgress: FunctionComponent<CircularProgressProps> = ({
  percentage,
  blankColor,
  donutColor,
  fillColor,
  progressWidth,
  size,
  children,
}) => {
  const half = size / 2;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={half} cy={half} r={half} fill={blankColor} />
        <Path
          d={`M${half} ${half} L${half} 0 ${generateArc(percentage, half)} Z`}
          fill={donutColor}
        />
        <Circle cx={half} cy={half} r={progressWidth} fill={fillColor} />
      </Svg>
      <View style={styles.textView}>
        {children}
      </View>
    </View>
  );
};

CircularProgress.defaultProps = {
  percentage: 40,
  blankColor: '#eaeaea',
  donutColor: '#43cdcf',
  fillColor: 'white',
  progressWidth: 35,
  size: 100,
  children: undefined,
};

export {
  CircularProgress,
};
