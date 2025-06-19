import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../constants/colors'
import {styles} from './styles'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get('window')


const FacilityDetail = () => {
  const navigation=useNavigation()
  const facility = {
    id: 1,
    name: "Diamond Elite Baseball Academy",
    location: "1234 Baseball Drive, Sports City, CA 90210",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop", // Baseball field image
    rating: 4.8,
    reviewCount: 127,
    pricePerHour: "$25",
    description: "Premier indoor baseball training facility featuring state-of-the-art equipment, professional coaching staff, and climate-controlled environment perfect for year-round training.",
    amenities: [
      "Indoor Batting Cages",
      "Pitching Mounds", 
      "Video Analysis",
      "Professional Coaching",
      "Equipment Rental",
      "Parking Available"
    ],
    availability: "Open 7 Days a Week",
    phone: "(555) 123-4567"
  }

  const handleBack=()=>{
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.theme} />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: facility.image }}
            style={styles.facilityImage}
            resizeMode="cover"
          />
          {/* <View style={styles.imageOverlay}>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{facility.pricePerHour}/hr</Text>
            </View>
          </View> */}
        </View>

        {/* Facility Info */}
        <View style={styles.infoContainer}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.facilityName}>{facility.name}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons 
                    key={star}
                    name={star <= Math.floor(facility.rating) ? "star" : "star-outline"} 
                    size={16} 
                    color={colors.yellow} 
                  />
                ))}
                <Text style={styles.ratingText}>{facility.rating}</Text>
              </View>
              <Text style={styles.reviewText}>({facility.reviewCount} reviews)</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationSection}>
            <MaterialIcons name="location-on" size={20} color={colors.theme} style={{marginTop:1}}/>
            <Text style={styles.locationText}>{facility.location}</Text>
          </View>

          {/* Availability */}
          <View style={styles.availabilitySection}>
            <MaterialIcons name="schedule" size={20} color={colors.greenishBlue} />
            <Text style={styles.availabilityText}>{facility.availability}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Facility</Text>
            <Text style={styles.descriptionText}>{facility.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Amenities & Features</Text>
            <View style={styles.amenitiesGrid}>
              {facility.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <MaterialIcons name="check-circle" size={16} color={colors.greenishBlue} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity style={styles.contactItem}>
              <MaterialIcons name="phone" size={20} color={colors.lightBlue} />
              <Text style={styles.contactText}>{facility.phone}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.requestButton}>
          <MaterialIcons name="event" size={24} color={colors.white} />
          <Text style={styles.requestButtonText}>Request Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default FacilityDetail