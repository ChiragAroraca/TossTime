import { Dimensions, StyleSheet } from "react-native"
import { colors } from "../../constants/colors"
import { Poppins } from "../../constants/fonts"
const { width, height } = Dimensions.get('window')

export const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed button
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    position: 'relative',
  },
  facilityImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  priceTag: {
    backgroundColor: colors.theme,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    fontFamily: Poppins.semiBold,
    fontSize: 16,
    color: colors.white,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: colors.white,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleSection: {
    marginBottom: 15,
  },
  facilityName: {
    fontFamily: Poppins.bold,
    fontSize: 24,
    color: colors.darkGray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: Poppins.medium,
    fontSize: 14,
    lineHeight:25,
    color: colors.darkGray,
    marginLeft: 5,
  },
  reviewText: {
    fontFamily: Poppins.regular,
    fontSize: 14,
    lineHeight:25,
    color: colors.lightGray,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: colors.lighestGray,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  locationText: {
    fontFamily: Poppins.medium,
    fontSize: 14,
    color: colors.gray,
    lineHeight:22,
    marginLeft: 10,
    flex: 1,
  },
  availabilitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  availabilityText: {
    fontFamily: Poppins.medium,
    fontSize: 14,
    lineHeight:25,
    color: colors.greenishBlue,
    marginLeft: 8,
  },
  descriptionSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: Poppins.semiBold,
    fontSize: 18,
    lineHeight:25,
    color: colors.darkGray,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: Poppins.regular,
    fontSize:12,
    lineHeight:25,
    color: colors.gray,
    lineHeight: 22,
  },
  amenitiesSection: {
    marginBottom: 25,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  amenityText: {
    fontFamily: Poppins.regular,
    fontSize: 12,
    color: colors.gray,
    width:width/2.5,
    lineHeight:22,
    marginLeft: 8,
  },
  contactSection: {
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactText: {
    fontFamily: Poppins.medium,
    fontSize: 16,
    color: colors.lightBlue,
    marginLeft: 10,
  },
  
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: colors.lighestGray,
  },
  requestButton: {
    backgroundColor: colors.theme,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  requestButtonText: {
    fontFamily: Poppins.semiBold,
    fontSize: 18,
    color: colors.white,
    marginLeft: 8,
  },
})