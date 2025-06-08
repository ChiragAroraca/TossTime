import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { Poppins } from "../../constants/fonts";
const { width, height } = Dimensions.get('window')

export const styles=StyleSheet.create({
    mainContainer: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'ab solute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: colors.theme,
    top: -50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: colors.greenishBlue,
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: colors.yellow,
    top: '40%',
    right: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  baseballIcon: {
    marginBottom: 20,
  },
  baseball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  baseballStitch1: {
    position: 'absolute',
    width: 3,
    height: 30,
    backgroundColor: colors.theme,
    borderRadius: 1,
    transform: [{ rotate: '15deg' }],
    left: 25,
  },
  baseballStitch2: {
    position: 'absolute',
    width: 3,
    height: 30,
    backgroundColor: colors.theme,
    borderRadius: 1,
    transform: [{ rotate: '-15deg' }],
    right: 25,
  },
  appTitle: {
    fontSize: 36,
    color: colors.white,
    fontFamily:Poppins.bold,
    marginBottom: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.bluishGray,
    fontFamily:Poppins.semiBold
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily:Poppins.semiBold,
    color: colors.gray,
    textAlign: 'center',
  },
  signInText: {
    fontSize: 16,
    fontFamily:Poppins.regular,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme,
    borderRadius: 12,
    margin: 4,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontFamily:Poppins.regular,
    color: colors.gray,
    paddingLeft: 16,
  },
  iconText: {
    fontSize: 18,
  },

  termsContainer: {
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  termsText: {
    fontSize: 12,
    color: colors.bluishGray,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily:Poppins.regular
  },
  termsSubContainer:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    marginTop:3
  },
  termsLink: {
    color: colors.lightBlue,
    textDecorationLine: 'underline',
  },
  and:{
    fontSize: 12,
    color: colors.bluishGray,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily:Poppins.regular,
    marginHorizontal:5
  },
  eyeIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily:Poppins.semiBold,
    color: colors.theme,
  },
  loginButton: {
    backgroundColor: colors.theme,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonText: {
    fontSize: 15,
    fontFamily:Poppins.bold,
    color: colors.white,
    marginRight: 8,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.theme,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontFamily:Poppins.regular,
    fontSize: 14,
    color: colors.gray,
  },
  socialButton: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    height: 50,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.white,
  },
  googleIcon:{
    width:20,
    height:20,
    marginLeft:10,
    resizeMode:'contain'
  },
  socialButtonText: {
    fontSize: 13,
    fontFamily:Poppins.regular,
    color: colors.gray,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    fontFamily:Poppins.regular,
    color: colors.lightGray,
  },
  signUpLink: {
    fontSize: 16,
    color: colors.theme,
    fontFamily:Poppins.semiBold,
  },
})
