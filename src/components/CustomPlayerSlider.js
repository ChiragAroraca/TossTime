import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Poppins } from '../constants/fonts'
import { colors } from '../constants/colors'

const { width: screenWidth } = Dimensions.get('window')

const CustomPlayerSlider = ({
  sectionHeading = "Players Near You",
  sectionDescription = "",
  data = [],
  onViewAll = () => { },
  showViewAll = true
}) => {
  const navigation = useNavigation()
  
  const renderPlayerCard = (player, index) => (
    <TouchableOpacity
      key={index}
      style={styles.playerCard}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('PlayerProfile', { playerId: player.id })
        player.onPress && player.onPress(player)
      }}
    >
      <View style={styles.imageContainer}>
        {player.profileImage ? (
          <Image source={player.profileImage} style={styles.playerImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>👤</Text>
          </View>
        )}
      </View>

      <View style={styles.playerContent}>
        <Text style={styles.playerName} numberOfLines={1}>
          {player.name}
        </Text>

        <View style={styles.playerDetails}>
          <View style={styles.detailRow}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>📍</Text>
            </View>
            <Text style={styles.distanceText} numberOfLines={1}>
              {player.distance}
            </Text>
          </View>

          <View style={styles.availabilityContainer}>
            <View style={styles.detailRow}>
              <View style={styles.iconPlaceholder}>
                <Text style={styles.iconText}>⏰</Text>
              </View>
              <Text style={styles.availabilityLabel}>Available:</Text>
            </View>
            <Text style={styles.availabilityText} numberOfLines={2}>
              {player.availability}
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
          <Text style={styles.emptyText}>No players available nearby</Text>
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
        snapToInterval={screenWidth * 0.6 + 15}
        snapToAlignment="start"
      >
        {data.map((player, index) => renderPlayerCard(player, index))}
      </ScrollView>
    </View>
  )
}

export default CustomPlayerSlider

const styles = StyleSheet.create({
  container: {
    marginTop: '5%'
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
  playerCard: {
    width: screenWidth * 0.6,
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
    height: 140,
    width: '100%',
  },
  playerImage: {
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
    fontSize: 32,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: colors.white,
  },
  playerContent: {
    padding: 12,
  },
  playerName: {
    fontSize: 14,
    fontFamily: Poppins.bold,
    color: colors.darkGray,
    lineHeight: 18,
    marginBottom: 8,
  },
  playerDetails: {
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 10,
  },
  ratingText: {
    fontSize: 11,
    lineHeight:25,
    color: colors.gray,
    fontFamily: Poppins.medium,
    flex: 1,
  },
  distanceText: {
    fontSize: 11,
    lineHeight:25,
    color: colors.gray,
    fontFamily: Poppins.medium,
    flex: 1,
  },
  availabilityContainer: {
    marginTop: 4,
  },
  availabilityLabel: {
    fontSize: 10,
    lineHeight:25,
    color: colors.gray,
    fontFamily: Poppins.medium,
    marginLeft: 2,
  },
  availabilityText: {
    fontSize: 11,
    color: colors.theme,
    lineHeight:25,
    fontFamily: Poppins.semiBold,
    marginTop: 2,
    marginLeft: 24,
    lineHeight: 14,
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