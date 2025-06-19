import { StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'
import { Poppins } from '../../constants/fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Profile Header Styles
  profileHeader: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  avatarContainer: {
    marginBottom: 16,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  avatarText: {
    fontSize: 30,
    lineHeight: 25,
    fontFamily: Poppins.bold,
    color: colors.white,
  },

  playerName: {
    fontSize: 23,
    lineHeight: 30,
    fontFamily: Poppins.bold,
    color: colors.darkGray,
    marginBottom: 4,
    textAlign: 'center',
  },

  playerPosition: {
    fontSize: 15,
    lineHeight: 25,
    fontFamily: Poppins.medium,
    color: colors.theme,
    textAlign: 'center',
  },

  // Stats Section Styles
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statDivider: {
    width: 1,
    backgroundColor: colors.lighestGray,
    marginHorizontal: 5,
  },

  statValue: {
    fontSize: 13,
    lineHeight: 25,
    fontFamily: Poppins.bold,
    color: colors.darkGray,
    marginBottom: 4,
    textAlign: 'center',
  },

  statLabel: {
    fontSize: 12,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    textAlign: 'center',
  },

  // Bio Section Styles
  bioContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
  },

  bioTitle: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: Poppins.semiBold,
    color: colors.darkGray,
    marginBottom: 12,
  },

  bioText: {
    fontSize: 13,
    lineHeight: 25,
    fontFamily: Poppins.regular,
    color: colors.gray,
  },

  // Options Section Styles
  optionsContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 40,
  },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lighestGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  premiumIconContainer: {
    backgroundColor: '#FFF8E1',
  },

  optionIcon: {
    color: colors.gray,
  },

  optionTitle: {
    fontSize: 16,
    fontFamily: Poppins.medium,
    color: colors.darkGray,
    flex: 1,
  },

  premiumTitle: {
    color: '#B8860B',
  },

  optionArrow: {
    color: colors.lightGray,
  },

  optionDivider: {
    height: 1,
    backgroundColor: colors.lighestGray,
    marginLeft: 76,
  },
  logoutIconContainer: {
  backgroundColor: '#FFEBEB',
},

logoutTitle: {
  color: '#FF4444',
},
})