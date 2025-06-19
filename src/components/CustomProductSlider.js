import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Poppins } from '../constants/fonts'
import { useNavigation } from '@react-navigation/native'

const { width: screenWidth } = Dimensions.get('window')
const CustomSlider = ({
  sectionHeading = "Events Near You",
  sectionDescription = "",
  data = [],
  onViewAll = () => { },
  showViewAll = true
}) => {
  const navigation=useNavigation()
  const renderEventCard = (event, index) => (
    <TouchableOpacity
      key={index}
      style={styles.eventCard}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('FacilityDetail')
        event.onPress && event.onPress(event)}}
    >
      <View style={styles.imageContainer}>
        {event.image ? (
          <Image source={event.image} style={styles.eventImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🎉</Text>
          </View>
        )}
      </View>

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>📍</Text>
            </View>
            <Text style={styles.venueText} numberOfLines={1}>
              {event.venue}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>⏰</Text>
            </View>
            <Text style={styles.timeText} numberOfLines={1}>
              {event.timeSlot}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sectionHeading}>{sectionHeading}</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No events available</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.sectionHeading}>{sectionHeading}</Text>
          {sectionDescription ? (
            <Text style={styles.sectionDescription}>{sectionDescription}</Text>
          ) : null}
        </View>
        {showViewAll && (
          <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={screenWidth * 0.65 + 15}
        snapToAlignment="start"
      >
        {data.map((event, index) => renderEventCard(event, index))}
      </ScrollView>
    </View>
  )
}

export default CustomSlider

const styles = StyleSheet.create({
  container: {
    marginTop:'5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerText: {
    flex: 1,
    marginRight: 10,
  },
  sectionHeading: {
    fontSize: 15,
    fontFamily: Poppins.bold,
    color: colors.darkGray,
    letterSpacing: -0.3,
  },
  sectionDescription: {
    fontSize: 12,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    marginTop: 2,
    lineHeight: 16,
  },
  viewAllText: {
    fontSize: 12,
    color: colors.theme,
    fontFamily: Poppins.semiBold,
  },
  scrollContent: {
    paddingLeft: 20,
    paddingRight: 5,
    paddingBottom: 10,
  },
  eventCard: {
    width: screenWidth * 0.65,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginRight: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 5,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lighestGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: Poppins.bold,
    color: colors.darkGray,
    lineHeight: 18,
    marginBottom: 8,
  },
  eventDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.lighestGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 8,
  },
  venueText: {
    fontSize: 11,
    color: colors.gray,
    fontFamily: Poppins.medium,
    flex: 1,
  },
  timeText: {
    fontSize: 11,
    color: colors.gray,
    fontFamily: Poppins.medium,
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: colors.lightGray,
    fontFamily: Poppins.regular,
    fontStyle: 'italic',
  },
})
