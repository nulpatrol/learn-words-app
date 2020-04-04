import React, { memo } from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

type FlagIconProps = {
    width: number;
    height: number;
    type: string;
}

export const FlagIcon = memo((props: FlagIconProps) => {
  const { type, width, height } = props;
  switch (type) {
    case 'de':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Path
            d="M15.923 345.043C52.094 442.527 145.929 512 256 512s203.906-69.473 240.077-166.957L256 322.783l-240.077 22.26z"
            fill="#ffda44"
          />
          <Path d="M256 0C145.929 0 52.094 69.472 15.923 166.957L256 189.217l240.077-22.261C459.906 69.472 366.071 0 256 0z" />
          <Path
            d="M15.923 166.957C5.633 194.69 0 224.686 0 256s5.633 61.31 15.923 89.043h480.155C506.368 317.31 512 287.314 512 256s-5.632-61.31-15.923-89.043H15.923z"
            fill="#d80027"
          />
        </Svg>
      );
    case 'en':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#f0f0f0" />
          <G fill="#0052b4">
            <Path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z" />
          </G>
          <G fill="#d80027">
            <Path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 0 0 256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 0 0 0 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0 0 66.783 0V289.392h220.442A258.533 258.533 0 0 0 512 256c0-11.317-.744-22.461-2.167-33.391z" />
            <Path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0 0 15.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0 0 16.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 0 0-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 0 0-16.435-15.047l-97.802 97.803v31.482z" />
          </G>
        </Svg>
      );
    case 'da':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#f0f0f0" />
          <G fill="#d80027">
            <Path d="M200.349 222.609h309.484C493.47 97.002 386.067 0 256 0a256.902 256.902 0 0 0-55.652 6.085v216.524h.001zM133.565 222.608V31.127C63.272 69.481 12.95 139.832 2.167 222.609h131.398v-.001zM133.564 289.391H2.167c10.783 82.777 61.105 153.128 131.398 191.481l-.001-191.481zM200.348 289.392v216.523A256.902 256.902 0 0 0 256 512c130.067 0 237.47-97.002 253.833-222.609H200.348v.001z" />
          </G>
        </Svg>
      );
    case 'uk':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#ffda44" />
          <Path
            d="M0 256C0 114.616 114.616 0 256 0s256 114.616 256 256"
            fill="#338af3"
          />
        </Svg>
      );
    case 'pl':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#f0f0f0" />
          <Path
            d="M512 256c0 141.384-114.616 256-256 256S0 397.384 0 256"
            fill="#d80027"
          />
        </Svg>
      );
    case 'fr':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#f0f0f0" />
          <Path
            d="M512 256c0-110.071-69.472-203.906-166.957-240.077v480.155C442.528 459.906 512 366.071 512 256z"
            fill="#d80027"
          />
          <Path
            d="M0 256c0 110.071 69.473 203.906 166.957 240.077V15.923C69.473 52.094 0 145.929 0 256z"
            fill="#0052b4"
          />
        </Svg>
      );
    case 'ru':
      return (
        <Svg viewBox="0 0 512 512" width={width} height={height}>
          <Circle cx={256} cy={256} r={256} fill="#f0f0f0" />
          <Path
            d="M496.077 345.043C506.368 317.31 512 287.314 512 256s-5.632-61.31-15.923-89.043H15.923C5.633 194.69 0 224.686 0 256s5.633 61.31 15.923 89.043L256 367.304l240.077-22.261z"
            fill="#0052b4"
          />
          <Path
            d="M256 512c110.071 0 203.906-69.472 240.077-166.957H15.923C52.094 442.528 145.929 512 256 512z"
            fill="#d80027"
          />
        </Svg>
      );
    default: return null;
  }
});
