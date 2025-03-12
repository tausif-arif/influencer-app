import { StyleSheet } from 'react-native';
import metrics from './metrics';
import { COLORS, FONT_TYPE, SIZES } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: "center"
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  rowV: {
    flexDirection: 'row',
    alignItems: "center"
  },
  rowVSpread: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowCenterV: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',

  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  headerTitle: {
    fontSize: SIZES.font18,
    fontFamily: FONT_TYPE.BOLD,
    color: COLORS.secondary,
    textAlign:"center"
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: COLORS.lightGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  borderRadiusSmall: {
    borderRadius: 8
  },
  borderRadiusMedium: {
    borderRadius: 16
  },
  paddingHSmall: {
    paddingHorizontal: metrics.screenHeight*0.02
  },
  paddingHMedium: {
    paddingHorizontal: metrics.screenHeight*0.03
  }

  // Add more styles as needed
});
