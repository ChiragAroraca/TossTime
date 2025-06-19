import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { Poppins } from "../../constants/fonts";

export const styles=StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    color: colors.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.theme,
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: colors.lighestGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuresSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    color: colors.darkGray,
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: colors.lighestGray,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureItemText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
  plansSection: {
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.lighestGray,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  selectedPlan: {
    borderWidth: 3,
    elevation: 8,
    shadowOpacity: 0.2,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    right: 20,
    borderRadius: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  popularText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: Poppins.bold,
  },
  savingsBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  savingsText: {
    color: colors.darkGray,
    fontSize: 12,
    fontFamily: Poppins.semiBold,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  planTitle: {
    fontSize: 24,
    color: colors.darkGray,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 28,
  },
  planPeriod: {
    fontSize: 16,
    color: colors.lightGray,
  },
  planDescription: {
    fontSize: 16,
    color: colors.lightGray,
    marginBottom: 20,
    lineHeight: 22,
  },
  featuresContainer: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: colors.darkGray,
    flex: 1,
  },
  footer: {
    paddingBottom: 30,
  },
  subscribeButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  subscribeButtonText: {
    color: colors.white,
    fontSize: 18,
  },
  termsText: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 15,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: colors.lightBlue,
    textDecorationLine: 'underline',
  },
  separator: {
    marginHorizontal: 10,
    color: colors.lightGray,
  },
})