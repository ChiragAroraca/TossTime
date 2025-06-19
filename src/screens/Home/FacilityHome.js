import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import firstBanner from '../../assets/images/firstBanner.jpg'
import CustomSlider from '../../components/CustomProductSlider'
import CustomBannerSlider from '../../components/CustomBannerSlider'
import CustomPlayerSlider from '../../components/CustomPlayerSlider'
import { useNavigation } from '@react-navigation/native'

const FacilityHome = () => {
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
const playersData = [
  {
    id: '1',
    name: 'John Smith',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
    rating: '4.5',
    distance: '0.5 km away',
    availability: '2:00 to 3:00 PM\nSunday',
    isOnline: true,
    onPress: (player) => console.log('Player pressed:', player.name)
  },
  {
    id: '2',
    name: 'Emily Johnson',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/45.jpg' },
    rating: '4.8',
    distance: '1.2 km away',
    availability: '5:00 to 6:00 PM\nSaturday',
    isOnline: false,
    onPress: (player) => console.log('Player pressed:', player.name)
  },
  {
    id: '3',
    name: 'Michael Brown',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/54.jpg' },
    rating: '4.2',
    distance: '3.0 km away',
    availability: '6:00 to 7:30 PM\nFriday',
    isOnline: true,
    onPress: (player) => console.log('Player pressed:', player.name)
  },
  {
    id: '4',
    name: 'Sophia Davis',
    profileImage: { uri: 'https://randomuser.me/api/portraits/women/60.jpg' },
    rating: '4.7',
    distance: '0.8 km away',
    availability: '11:00 AM to 12:00 PM\nMonday',
    isOnline: false,
    onPress: (player) => console.log('Player pressed:', player.name)
  },
  {
    id: '5',
    name: 'Daniel Wilson',
    profileImage: { uri: 'https://randomuser.me/api/portraits/men/75.jpg' },
    rating: '4.6',
    distance: '2.5 km away',
    availability: '3:30 to 5:00 PM\nWednesday',
    isOnline: true,
    onPress: (player) => console.log('Player pressed:', player.name)
  }
];

const handleSessionPress=()=>{
  navigation.navigate('CreateSession')
}


    return (
        <ScrollView style={styles.container}>
            <CustomBannerSlider data={bannerData} />
           <CustomPlayerSlider data={playersData} sectionDescription={'Explore amazing players located nearby your facility'}/>
             <ImageBackground source={firstBanner} style={styles.firstBannerImage} imageStyle={styles.imageStyle}>
                <Text style={styles.firtBannerHeading}>Create Session</Text>
                <Text style={styles.firstBannerDesc}>Create amazing practice sessions in your facility</Text>
                <TouchableOpacity onPress={handleSessionPress} style={[styles.bannerExploreButton,{marginTop:10}]}>
                    <Text style={styles.bannerExploreButtonText}>Create</Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    )
}

export default FacilityHome