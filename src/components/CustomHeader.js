import { StyleSheet, Text, View, TouchableOpacity, Animated, TextInput, Dimensions, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../constants/colors'
import { Poppins } from '../constants/fonts'
import { Icons } from '../constants/icons'

const { width: screenWidth } = Dimensions.get('window')

const CustomHeader = ({ 
    cityName = "New York", 
    showSearchIcon = true, 
    onLocationPress, 
    onLogoPress, 
    onSearchPress, 
    onChatPress,
    onSearchTextChange,
    searchValue = ""
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [searchText, setSearchText] = useState(searchValue)
    const searchInputRef = useRef(null)
    
    // Animation values
    const searchAnimation = useRef(new Animated.Value(0)).current
    const searchOpacity = useRef(new Animated.Value(0)).current
    const rightSectionOpacity = useRef(new Animated.Value(1)).current
    const leftSectionOpacity = useRef(new Animated.Value(1)).current

    const handleSearchPress = () => {
        if (!isSearchActive) {
            setIsSearchActive(true)
            
            // Start animations
            Animated.parallel([
                Animated.timing(searchAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(searchOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(rightSectionOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
                Animated.timing(leftSectionOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                })
            ]).start(() => {
                // Focus the input after animation completes
                setTimeout(() => {
                    searchInputRef.current?.focus()
                }, 50)
            })
        }
        
        if (onSearchPress) {
            onSearchPress()
        }
    }

    const handleSearchCancel = () => {
        setIsSearchActive(false)
        setSearchText("")
        
        // Reverse animations
        Animated.parallel([
            Animated.timing(searchAnimation, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }),
            Animated.timing(searchOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(rightSectionOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(leftSectionOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            })
        ]).start()
        
        // Blur the input
        searchInputRef.current?.blur()
    }

    const handleSearchTextChange = (text) => {
        setSearchText(text)
        if (onSearchTextChange) {
            onSearchTextChange(text)
        }
    }

    // Calculate search input width animation
    const searchInputWidth = searchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [44, screenWidth - 80], // From button width to reasonable width
    })

    // Calculate search input position from right
    const searchInputRight = searchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 20], // Keep consistent right margin
    })

    return (
        <View style={styles.container}>
            {/* Background gradient effect */}
            <View style={styles.backgroundGradient} />
            
            {/* Left side - Location with enhanced styling */}
            <Animated.View style={[styles.leftSection, { opacity: leftSectionOpacity }]}>
                <TouchableOpacity onPress={onLocationPress}>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationIconContainer}>
                            <Icon name="location-on" size={20} color={colors.theme} />
                        </View>
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationLabel}>Location</Text>
                            <Text style={styles.cityText}>{cityName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            {/* Animated Search Logo */}
            <Animated.View 
                style={[
                    styles.searchLogoOverlay,
                    {
                        opacity: searchOpacity,
                    }
                ]}
                pointerEvents={isSearchActive ? 'auto' : 'none'}
            >
                <TouchableOpacity onPress={onLogoPress} style={styles.searchLogoContainer}>
                    {/* <Text style={styles.searchLogoText}>TT</Text> */}
                    <Image source={Icons.ball} style={styles.ballLogo}/>
                </TouchableOpacity>
            </Animated.View>

            {/* Animated Search Input Overlay */}
            <Animated.View 
                style={[
                    styles.searchOverlay,
                    {
                        width: searchInputWidth,
                        opacity: searchOpacity,
                    }
                ]}
                pointerEvents={isSearchActive ? 'auto' : 'none'}
            >
                <View style={styles.searchInputContainer}>
                    <Icon name="search" size={20} color={colors.gray} style={styles.searchIcon} />
                    <TextInput
                        ref={searchInputRef}
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor={colors.lightGray}
                        value={searchText}
                        onChangeText={handleSearchTextChange}
                        returnKeyType="search"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TouchableOpacity onPress={handleSearchCancel} style={styles.cancelButton}>
                        <Icon name="close" size={18} color={colors.gray} />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Right side - Enhanced icon buttons */}
            <Animated.View style={[styles.rightSection, { opacity: rightSectionOpacity }]}>
                {showSearchIcon && (
                    <TouchableOpacity style={styles.searchInputButton} onPress={handleSearchPress}>
                        <View style={styles.searchInputButtonContainer}>
                            <Icon name="search" size={16} color={colors.lightGray} style={{marginTop:1}}/>
                            <Text style={styles.searchInputButtonText}>Search...</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.iconButton} onPress={onChatPress}>
                    <View style={styles.iconContainer}>
                        <Icon name="notifications" size={20} color={colors.gray} />
                        <View style={styles.notificationDot} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.lighestGray,
        elevation: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        position: 'relative',
        minHeight: 70,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        opacity: 0.95,
    },
    leftSection: {
        flex: 1,
        zIndex: 2,
        maxWidth: '35%',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 14,
        backgroundColor: `${colors.theme}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    locationTextContainer: {
        flex: 1,
        marginTop:3
    },
    locationLabel: {
        fontSize: 9,
        fontFamily: Poppins.medium,
        color: colors.lightGray,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: -5,
    },
    cityText: {
        fontSize: 13,
        fontFamily: Poppins.semiBold,
        color: colors.darkGray,
        letterSpacing: 0.3,
    },
    rightSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    iconButton: {
        marginLeft: 12,
        transform: [{ scale: 1 }],
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: `${colors.gray}05`,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: `${colors.lighestGray}50`,
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.theme,
        borderWidth: 1.5,
        borderColor: colors.white,
    },
    // New search input-looking button styles
    searchInputButton: {
        marginRight: 12,
    },
    searchInputButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${colors.gray}03`,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: `${colors.lighestGray}80`,
        minWidth: 130,
        height: 36,
    },
    searchInputButtonText: {
        fontSize: 13,
        fontFamily: Poppins.regular,
        color: colors.lightGray,
        marginLeft: 6,
        flex: 1,
    },
    // New search overlay styles
    searchLogoOverlay: {
        position: 'absolute',
        top: 16,
        left: 20,
        height: 44,
        width: 44,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchOverlay: {
        position: 'absolute',
        top: 16,
        right: 20,
        height: 44,
        zIndex: 10,
        justifyContent: 'center',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 22,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: colors.theme,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    searchLogoContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.theme,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.theme,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginRight:15
    },
    ballLogo:{
            width:40,
            height:40,
            resizeMode:'contain'
        },
    searchLogoText: {
        fontSize: 14,
        fontFamily: Poppins.bold,
        color: colors.white,
        letterSpacing: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: Poppins.regular,
        color: colors.darkGray,
        paddingVertical: 0,
    },
    cancelButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${colors.gray}10`,
        marginLeft: 8,
    },
});