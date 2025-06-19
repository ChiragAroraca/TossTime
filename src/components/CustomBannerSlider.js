import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { Poppins } from '../constants/fonts'
import { colors } from '../constants/colors'

const { width: screenWidth } = Dimensions.get('window')



const CustomBannerSlider = ({ 
  data = [], 
  autoPlay = true, 
  autoPlayInterval = 3000,
  showPagination = true,
  height = 200,
  borderRadius = 10
}) => {
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || data.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1
        
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * screenWidth,
            animated: true
          })
        }
        
        return nextIndex
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, data.length])

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth)
    setCurrentIndex(slideIndex)
  }

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.noDataText}>No banners to display</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={item.id || index} style={[styles.slide, { width: screenWidth }]}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={[styles.bannerImage, { height, borderRadius }]}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.placeholderBanner, { height, borderRadius }]}>
                <Text style={styles.bannerTitle}>{item.title || `Banner ${index + 1}`}</Text>
                {item.subtitle && (
                  <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {showPagination && data.length > 1 && (
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex ? colors.theme : colors.lighestGray,
                  transform: [{ scale: index === currentIndex ? 1.2 : 1 }]
                }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default CustomBannerSlider

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop:'4%',
  },
  slide: {
    paddingHorizontal: 15,
  },
  bannerImage: {
    width: '100%',
  },
  placeholderBanner: {
    width: '100%',
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Poppins.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontFamily: Poppins.regular,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
})