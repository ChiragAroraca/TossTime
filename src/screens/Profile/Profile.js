import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import { useAuth } from '../../context/AuthContext'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { logout } = useAuth();
      const user=useSelector((state)=>state.user)
  const userData = {
    name: "Alex Rodriguez",
    isPitcher: true,
    isCatcher: false,
    skillLevel: "intermediate",
    throwingArm: "right",
    velocity: 85,
    bio: "Passionate baseball player with 8 years of experience. Love the strategic aspect of pitching and always looking to improve my game. Available for weekend games and practice sessions."
  }

  const renderPosition = () => {
    if (user.isPitcher && user.isCatcher) {
      return "Pitcher & Catcher"
    } else if (user.isPitcher) {
      return "Pitcher"
    } else if (user.isCatcher) {
      return "Catcher"
    } else {
      return "Player"
    }
  }

  const renderSkillLevel = () => {
    return user.skillLevel.charAt(0).toUpperCase() + user.skillLevel.slice(1)
  }

  const profileOptions = [
    {
      title: "Edit Profile",
      icon: "person-outline"
    },
    {
      title: "Change Availability",
      icon: "calendar-outline"
    },
    {
      title: "Change Position",
      icon: "baseball-outline"
    },
    {
      title: "Premium",
      icon: "baseball-sharp",
      isPremium: true
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      isLogout: true
    }
  ]

  const handleLogout = async() => {
    console.log("User logged out")
    await logout()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        </View>
        
        <Text style={styles.playerName}>{user.name}</Text>
        <Text style={styles.playerPosition}>{renderPosition()}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{renderSkillLevel()}</Text>
          <Text style={styles.statLabel}>Skill Level</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.throwingArm.charAt(0).toUpperCase() + userData.throwingArm.slice(1)}</Text>
          <Text style={styles.statLabel}>Throwing Arm</Text>
        </View>
        
        {user.isPitcher && user.velocityTrackingEnabled && (
          <>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.velocity} mph</Text>
              <Text style={styles.statLabel}>Velocity</Text>
            </View>
          </>
        )}
      </View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {profileOptions.map((option, index) => (
          <View key={option.title}>
            <TouchableOpacity 
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={option.isLogout ? handleLogout : undefined}
            >
              <View style={styles.optionLeft}>
                <View style={[
                  styles.optionIconContainer,
                  option?.isPremium && styles.premiumIconContainer,
                  option?.isLogout && styles.logoutIconContainer
                ]}>
                  <Ionicons 
                    name={option.icon} 
                    size={24} 
                    color={
                      option?.isPremium ? '#FFD700' : 
                      option?.isLogout ? '#FF4444' : 
                      styles.optionIcon.color
                    } 
                  />
                </View>
                <Text style={[
                  styles.optionTitle,
                  option.isPremium && styles.premiumTitle,
                  option.isLogout && styles.logoutTitle
                ]}>
                  {option.title}
                </Text>
              </View>
              
              <Ionicons 
                name="chevron-forward-outline" 
                size={20} 
                color={styles.optionArrow.color} 
              />
            </TouchableOpacity>
            
            {index < profileOptions.length - 1 && (
              <View style={styles.optionDivider} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Profile