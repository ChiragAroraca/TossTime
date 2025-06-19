import { View, Text, ScrollView, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { colors } from '../../constants/colors'
import { Poppins } from '../../constants/fonts'
import CustomHeader from '../../components/CustomHeader'

const SessionListing = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sessionType: 'all',
    skillLevel: 'all',
    distance: 'all',
    availability: 'all'
  })

  // Mock session data
  const sessions = [
    {
      id: 1,
      type: 'Bullpen',
      title: 'Evening Bullpen Session',
      facility: 'Diamond Sports Complex',
      time: 'Today 6:00 PM',
      duration: '90 min',
      skillLevel: 'Intermediate',
      distance: '2.3 miles',
      participants: 3,
      maxParticipants: 6,
      price: 'Free',
      image: '', // placeholder
    },
    {
      id: 2,
      type: 'Catch Play',
      title: 'Morning Catch Session',
      facility: 'Riverside Baseball Park',
      time: 'Tomorrow 8:00 AM',
      duration: '60 min',
      skillLevel: 'Beginner',
      distance: '4.1 miles',
      participants: 2,
      maxParticipants: 4,
      price: 'Free',
      image: '', // placeholder
    },
    {
      id: 3,
      type: 'Group Throws',
      title: 'Weekend Group Practice',
      facility: 'Central Athletic Center',
      time: 'Sat 10:00 AM',
      duration: '120 min',
      skillLevel: 'Advanced',
      distance: '1.8 miles',
      participants: 8,
      maxParticipants: 12,
      price: '$5',
      image:'', // placeholder
    },
    {
      id: 4,
      type: 'Bullpen',
      title: 'Private Bullpen Training',
      facility: 'Elite Training Facility',
      time: 'Wed 4:00 PM',
      duration: '45 min',
      skillLevel: 'All Levels',
      distance: '6.2 miles',
      participants: 1,
      maxParticipants: 2,
      price: '$15',
      image: '', // placeholder
    }
  ]

  const SessionCard = ({ session }) => (
    <TouchableOpacity style={cardStyles.container}>
      <View style={cardStyles.imageContainer}>
        <Image source={session.image} style={cardStyles.image} />
        <View style={cardStyles.typeTag}>
          <Text style={cardStyles.typeText}>{session.type}</Text>
        </View>
        {session.price === 'Free' ? (
          <View style={cardStyles.freeTag}>
            <Text style={cardStyles.freeText}>FREE</Text>
          </View>
        ) : (
          <View style={cardStyles.priceTag}>
            <Text style={cardStyles.priceText}>{session.price}</Text>
          </View>
        )}
      </View>
      
      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{session.title}</Text>
        <Text style={cardStyles.facility}>{session.facility}</Text>
        
        <View style={cardStyles.infoRow}>
          <Text style={cardStyles.time}>{session.time}</Text>
          <Text style={cardStyles.duration}>{session.duration}</Text>
        </View>
        
        <View style={cardStyles.detailsRow}>
          <View style={cardStyles.skillBadge}>
            <Text style={cardStyles.skillText}>{session.skillLevel}</Text>
          </View>
          <Text style={cardStyles.distance}>{session.distance}</Text>
        </View>
        
        <View style={cardStyles.participantsRow}>
          <Text style={cardStyles.participants}>
            {session.participants}/{session.maxParticipants} participants
          </Text>
          <View style={cardStyles.participantsBar}>
            <View 
              style={[
                cardStyles.participantsProgress, 
                { width: `${(session.participants / session.maxParticipants) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const FilterModal = () => (
    <Modal visible={showFilters} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={filterStyles.container}>
        <View style={filterStyles.header}>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={filterStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={filterStyles.title}>Filters</Text>
          <TouchableOpacity>
            <Text style={filterStyles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={filterStyles.content}>
          <View style={filterStyles.section}>
            <Text style={filterStyles.sectionTitle}>Session Type</Text>
            {['All', 'Bullpen', 'Catch Play', 'Group Throws'].map((option) => (
              <TouchableOpacity key={option} style={filterStyles.option}>
                <Text style={filterStyles.optionText}>{option}</Text>
                <View style={[
                  filterStyles.radio,
                  filters.sessionType === option.toLowerCase() && filterStyles.radioSelected
                ]} />
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={filterStyles.section}>
            <Text style={filterStyles.sectionTitle}>Skill Level</Text>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((option) => (
              <TouchableOpacity key={option} style={filterStyles.option}>
                <Text style={filterStyles.optionText}>{option}</Text>
                <View style={[
                  filterStyles.radio,
                  filters.skillLevel === option.toLowerCase() && filterStyles.radioSelected
                ]} />
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={filterStyles.section}>
            <Text style={filterStyles.sectionTitle}>Distance</Text>
            {['All', 'Under 2 miles', '2-5 miles', '5-10 miles', '10+ miles'].map((option) => (
              <TouchableOpacity key={option} style={filterStyles.option}>
                <Text style={filterStyles.optionText}>{option}</Text>
                <View style={[
                  filterStyles.radio,
                  filters.distance === option.toLowerCase() && filterStyles.radioSelected
                ]} />
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={filterStyles.section}>
            <Text style={filterStyles.sectionTitle}>Availability</Text>
            {['All', 'Today', 'This Week', 'This Weekend'].map((option) => (
              <TouchableOpacity key={option} style={filterStyles.option}>
                <Text style={filterStyles.optionText}>{option}</Text>
                <View style={[
                  filterStyles.radio,
                  filters.availability === option.toLowerCase() && filterStyles.radioSelected
                ]} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <View style={filterStyles.footer}>
          <TouchableOpacity 
            style={filterStyles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={filterStyles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )

  return (
    <View style={mainStyles.container}>
     <CustomHeader/>
      
      <ScrollView 
        style={mainStyles.scrollView}
        contentContainerStyle={mainStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </ScrollView>
      
      <View style={mainStyles.filterButtonContainer}>
        <TouchableOpacity 
          style={mainStyles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={mainStyles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>
      
      <FilterModal />
    </View>
  )
}

const mainStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontFamily: Poppins.bold,
    color: colors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
  },
  scrollView: {
    flex: 1,
    marginTop:25
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for fixed button
  },
  filterButtonContainer: {
    position: 'absolute',
    bottom: 34,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: colors.theme,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  filterButtonText: {
    fontSize: 18,
    fontFamily: Poppins.semiBold,
    color: colors.white,
  },
}

const cardStyles = {
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lighestGray, // Placeholder background
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.theme,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    fontFamily: Poppins.semiBold,
    color: colors.white,
  },
  freeTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.greenishBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  freeText: {
    fontSize: 12,
    fontFamily: Poppins.bold,
    color: colors.white,
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 12,
    fontFamily: Poppins.bold,
    color: colors.black,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Poppins.semiBold,
    color: colors.black,
    marginBottom: 4,
  },
  facility: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    fontFamily: Poppins.medium,
    color: colors.theme,
  },
  duration: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillBadge: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 12,
    fontFamily: Poppins.medium,
    color: colors.white,
  },
  distance: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participants: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    flex: 1,
  },
  participantsBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.lighestGray,
    borderRadius: 2,
    marginLeft: 12,
    overflow: 'hidden',
  },
  participantsProgress: {
    height: '100%',
    backgroundColor: colors.greenishBlue,
  },
}

const filterStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighestGray,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
  },
  title: {
    fontSize: 20,
    fontFamily: Poppins.semiBold,
    color: colors.black,
  },
  resetText: {
    fontSize: 16,
    fontFamily: Poppins.medium,
    color: colors.theme,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Poppins.semiBold,
    color: colors.black,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighestGray,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Poppins.regular,
    color: colors.black,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighestGray,
  },
  radioSelected: {
    borderColor: colors.theme,
    backgroundColor: colors.theme,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lighestGray,
  },
  applyButton: {
    backgroundColor: colors.theme,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 18,
    fontFamily: Poppins.semiBold,
    color: colors.white,
  },
}

export default SessionListing