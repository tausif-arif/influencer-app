import {textScale} from '../utils/responsiveStyles';

const COLORS = {
  primary: '#EE6200', // Main Brand Color
  secondary: '#101729', // Secondary Brand Color
  danger: '#E3380D',
  darkBlue: '#032552',
  blue800: '#234A8E',
  darker:"#222",
  tertiary: '#312651', // Tertiary Brand Color
  lightBlue: '#E8F2FF', // Light Blue
  green: '#47A27A', // Green
  green200: '#EEFFF8', // Light Green
  blue500: '#D6E7FF', // Light Blue
  blue100: '#e8effa', // Light Blue
  orange100: '#f7f4f2', // Light Orange 100
  orange200: '#FFF0E6', // Light Orange 200
  orange500: '#FFDDC5', // Light Orange 500
  grey: '#919191',
  grey800: '#666', // Gray
  lightGrey: '#f0f0f0', // Light Gray
  white: '#ffffff', // White
  black: '#000000', // Black
  lightWhite: '#FAFAFC', // Light White
  grey200: '#f3f2f1', // Light White
  yellow: '#f1b604',
  transparent: '#000000aa', //transparent
};

//font family
const FONT_TYPE = {
  REGULAR: 'Montserrat-Regular',
  MEDIUM: 'Montserrat-Medium',
  SEMI_BOLD: 'Montserrat-SemiBold',
  BOLD: 'Montserrat-Bold',
  EXTRA_BOLD: 'Montserrat-ExtraBold',
};

const SIZES = {
  font6: textScale(6),
  font8: textScale(8),
  font10: textScale(10),
  font12: textScale(12),
  font14: textScale(14),
  font16: textScale(16),
  font18: textScale(18),
  font20: textScale(20),
  font22: textScale(22),
  // font6: Metrics.screenWidth * (6 / 365),
  // font8: Metrics.screenWidth * (8 / 365),
  // font10: Metrics.screenWidth * (10 / 365),
  // font12: Metrics.screenWidth * (12 / 365),
  // font14: Metrics.screenWidth * (14 / 365),
  // font16: Metrics.screenWidth * (16 / 365),
  // font18: Metrics.screenWidth * (18 / 365),
  // font20: Metrics.screenWidth * (20 / 365),
  // font22: Metrics.screenWidth * (22 / 365),
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export {COLORS, FONT_TYPE, SIZES, SHADOWS};
