import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { Poppins } from "../../constants/fonts";
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    mainContainerView: {
        flex:1,
        backgroundColor: colors.white
    },
    firstBannerImage: {
        width: width / 1.1,
        alignSelf: 'center',
        marginVertical: height * 0.03,
        borderRadius: width * 0.03,
        height: width / 2,
        padding: 10,
        paddingVertical:height*0.04,
        resizeMode: 'contain'
    },
    imageStyle: {
        borderRadius: width * 0.03,
    },
    firtBannerHeading:{
        fontFamily:Poppins.semiBold,
        color:colors.white,
        fontSize:19,
    },
    firstBannerDesc:{
        fontFamily:Poppins.semiBold,
        color:colors.white,
        fontSize:12,
        width:width/2,
        lineHeight:18,
    },
    bannerExploreButton:{
        backgroundColor:colors.white,
        width:width/3.15,
        height:height*0.04,
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:width*0.01,
    },
    bannerExploreButtonText:{
        color:colors.black,
        fontFamily:Poppins.semiBold,
        lineHeight:25
    }
})