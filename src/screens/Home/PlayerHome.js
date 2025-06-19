import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import firstBanner from '../../assets/images/firstBanner.jpg'
import CustomSlider from '../../components/CustomProductSlider'
import CustomBannerSlider from '../../components/CustomBannerSlider'
import { useNavigation } from '@react-navigation/native'

const PlayerHome = () => {
    const navigation=useNavigation()
    const eventData = [
        {
            title: "New Era Bullspen",
            venue: "Central Park, New York",
            timeSlot: "7:00 PM - 11:00 PM",
            image: { uri: 'https://c1.wallpaperflare.com/preview/703/707/783/baseball-player-game-play.jpg' }, // or require('./assets/event1.jpg')
            onPress: (event) => console.log('Event pressed:', event)
        },
        {
            title: "Starlight Bullspen",
            venue: "Convention Center",
            timeSlot: "9:00 AM - 5:00 PM",
            image: { uri: 'https://e1.pxfuel.com/desktop-wallpaper/751/323/desktop-wallpaper-how-clayton-kershaw-compares-to-the-greatest-pitchers-in-history-clayton-kershaw-thumbnail.jpg' },
            onPress: (event) => console.log('Event pressed:', event)
        },
        {
            title: "Shiny Start Bullspen",
            venue: "Downtown Plaza",
            timeSlot: "6:00 PM - 9:00 PM",
            image: { uri: 'https://w0.peakpx.com/wallpaper/384/111/HD-wallpaper-baseball-stadium-during-evening-time-baseball.jpg' },
            onPress: (event) => console.log('Event pressed:', event)
        }
    ]
     const bannerData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1529768167801-9173d94c2a42?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFzZWJhbGx8ZW58MHx8MHx8fDA%3D',
      title: 'Summer Sale'
    },
    {
      id: 2,
      image: 'https://c4.wallpaperflare.com/wallpaper/725/792/936/baseball-windows-backgrounds-wallpaper-preview.jpg',
      title: 'New Arrivals'
    },
    {
      id: 3,
      title: 'Special Offer',
      image:'https://wallpaperbat.com/img/141000-baseball-background-baseball-wallpaper.jpg',
      subtitle: 'Up to 50% off on all items'
    }
  ]

  const handleViewAll=(type)=>{
    if(type=='facility'){

    }
    else{
        navigation.navigate('SessionListing')
    }
  }
    return (
        <ScrollView style={styles.container}>
            <CustomBannerSlider data={bannerData} />
            <CustomSlider
                sectionHeading="Facilities Nearby"
                sectionDescription='Explore amazing facilities nearby your location for training sessions.'
                data={eventData}
                onViewAll={() => console.log('View all pressed')}
                showViewAll={true}
            />
             <ImageBackground source={firstBanner} style={styles.firstBannerImage} imageStyle={styles.imageStyle}>
                <Text style={styles.firtBannerHeading}>Sessions Near You</Text>
                <Text style={styles.firstBannerDesc}>Explore amazing practice sessions near you according to your availability</Text>
                <TouchableOpacity style={styles.bannerExploreButton}>
                    <Text style={styles.bannerExploreButtonText}>Explore</Text>
                </TouchableOpacity>
            </ImageBackground>
            <CustomSlider
                sectionHeading="Sessions Nearby"
                sectionDescription='These are some of the sessions happening soon around you, join and train better.'
                data={eventData}
                onViewAll={() => handleViewAll('session')}
                showViewAll={true}
            />
        </ScrollView>
    )
}

export default PlayerHome