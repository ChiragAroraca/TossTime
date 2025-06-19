import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Platform,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from '../../../constants/colors';
import { Poppins } from '../../../constants/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/store/slices/userSlice';
import { useAuth } from '../../../context/AuthContext';
import CustomLoader from '../../../components/CustomLoader';

const StepOnePlayer = ({ route }) => {
  const data = route?.params?.data;
  const { login } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: data?.name,
    email: data?.email,
    role: data?.role,
    password: data?.password,
    positions: '',
    dateOfBirth: '', // Initialize as empty string for API
    skillLevel: '',
    phone: '',
    isPitcher: false,
    isCatcher: false,
    throwingArm: '',
    bio: '',
    velocity: 0,
    availability: [],
    logo: null, // Add profile image field
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [availabilityDay, setAvailabilityDay] = useState('');
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');
  const [loading,setLoading]=useState(false)
  const positions = ['pitcher', 'catcher', 'dual'];
  const skillLevels = ['beginner', 'intermediate', 'advanced', 'professional'];
  const throwingArms = ['left', 'right', 'both'];
  const daysOfWeek = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
  ];
  
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  // Image upload functions
  const handleProfileImageUpload = () => {
    setShowImageModal(true);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos.',
            buttonPositive: 'OK',
          }
        );

        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage to save photos",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        
        return cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
          (storageGranted === PermissionsAndroid.RESULTS.GRANTED || 
           storageGranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const selectFromGallery = () => {
    setShowImageModal(false);

    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true, // Circular crop for profile image
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      includeBase64: false,
      freeStyleCropEnabled: true,
      showCropGuidelines: true,
      showCropFrame: true,
      hideBottomControls: false,
    })
      .then(image => {
        console.log('Selected image:', image);

        // Check file size (5MB limit)
        if (image.size && image.size > 5 * 1024 * 1024) {
          Alert.alert('Error', 'Image size must be less than 5MB');
          return;
        }

        if (image.path) {
          setFormData(prev => ({
            ...prev,
            logo: image.path,
          }));
        }
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled image picker');
        } else {
          Alert.alert('Error', error.message || 'Failed to select image from gallery');
        }
      });
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      setShowImageModal(false);
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }

    setShowImageModal(false);

    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true, // Circular crop for profile image
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      includeBase64: false,
      freeStyleCropEnabled: true,
      showCropGuidelines: true,
      showCropFrame: true,
      hideBottomControls: false,
    })
      .then(image => {
        console.log('Camera image:', image);

        // Check file size (5MB limit)
        if (image.size && image.size > 5 * 1024 * 1024) {
          Alert.alert('Error', 'Image size must be less than 5MB');
          return;
        }

        if (image.path) {
          setFormData(prev => ({
            ...prev,
            logo: image.path,
          }));
        }
      })
      .catch(error => {
        console.log('Camera Error: ', error);
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User cancelled camera');
        } else {
          Alert.alert('Error', error.message || 'Failed to take photo');
        }
      });
  };

  const removeProfileImage = () => {
    // Clean up the cropped image if it exists
    if (formData.logo) {
      ImagePicker.cleanSingle(formData.logo).catch(e => {
        console.log('Error cleaning image:', e);
      });
    }

    setFormData(prev => ({
      ...prev,
      logo: null,
    }));
  };

  const handleDateChange = (date) => {
    // Update both the Date object for picker and string for API
    setSelectedDate(date);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setFormData(prev => ({
      ...prev,
      dateOfBirth: formattedDate,
    }));
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const confirmDate = () => {
    setShowDatePicker(false);
  };

  const handleBioChange = (text) => {
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount <= 50 || text.length < formData.bio.length) {
      setFormData(prev => ({
        ...prev,
        bio: text,
      }));
    }
  };

  const getBioWordCount = () => {
    return formData.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const addAvailability = () => {
    if (!availabilityDay || !availabilityStart || !availabilityEnd) {
      Alert.alert('Error', 'Please fill in all availability fields');
      return;
    }

    const newAvailability = {
      dayOfWeek: parseInt(availabilityDay),
      startTime: availabilityStart,
      endTime: availabilityEnd,
    };

    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, newAvailability],
    }));

    // Reset availability inputs
    setAvailabilityDay('');
    setAvailabilityStart('');
    setAvailabilityEnd('');
  };

  const removeAvailability = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const { positions, skillLevel, throwingArm, bio, dateOfBirth } = formData;

    if (!positions || !skillLevel || !throwingArm) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (!dateOfBirth) {
      Alert.alert('Error', 'Please select your date of birth');
      return false;
    }

    if (!bio.trim()) {
      Alert.alert('Error', 'Please add a bio');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setLoading(true)
    if (validateForm()) {
      // Create FormData for API submission
      const apiFormData = new FormData();
      // Append basic fields
      apiFormData.append('name', formData.name);
      apiFormData.append('email', formData.email);
      apiFormData.append('role', formData.role);
      apiFormData.append('password', formData.password);
      apiFormData.append('positions', formData.positions);
      apiFormData.append('dateOfBirth', formData.dateOfBirth);
      apiFormData.append('skillLevel', formData.skillLevel);
      apiFormData.append('phone', formData.phone || '');
      apiFormData.append('isPitcher', formData.isPitcher.toString());
      apiFormData.append('isCatcher', formData.isCatcher.toString());
      apiFormData.append('throwingArm', formData.throwingArm);
      apiFormData.append('bio', formData.bio);
      apiFormData.append('velocity', formData.velocity.toString());
      
      // Append availability as JSON string
      apiFormData.append('availability', JSON.stringify(formData.availability));
      
      // Append profile image if exists
      if (formData.logo) {
        const uriParts = formData.logo.split('.');
        const fileType = uriParts[uriParts.length - 1];
        apiFormData.append('logo', {
          uri: formData.logo,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      console.log('Form Data for API:', apiFormData);
      
      dispatch(registerUser({ formData: apiFormData, isFormData: true }))
        .unwrap()
        .then(async(res) => {
          console.log('Registration successful:', res);
          await login(res?.token, res?.user);
          setLoading(false)
        })
        .catch((err) => {
          console.log('Registration error:', err?.message);
        });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Select Date of Birth';
    
    // Convert YYYY-MM-DD to a more readable format
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDayName = (dayValue) => {
    return daysOfWeek.find(day => day.value === dayValue)?.label || '';
  };

  // Clean up any temporary images when component unmounts
  React.useEffect(() => {
    return () => {
      if (formData.logo) {
        ImagePicker.cleanSingle(formData.logo).catch(e => {
          console.log('Cleanup error:', e);
        });
      }
    };
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Player Profile</Text>
        <Text style={styles.subtitle}>We require a little more from you in order to create your player profile.</Text>
      </View>

      {/* Profile Image Upload */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Photo</Text>
        <Text style={styles.cardSubtitle}>
          Add a profile photo to help facilities and other players recognize you. The image will be automatically cropped to fit.
        </Text>

        {formData.logo ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: formData.logo }} style={styles.profileImagePreview} />
            <View style={styles.imageActions}>
              <TouchableOpacity style={styles.changeImageButton} onPress={handleProfileImageUpload}>
                <Text style={styles.changeImageText}>Change Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeImageButton} onPress={removeProfileImage}>
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleProfileImageUpload}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>👤</Text>
            </View>
            <Text style={styles.uploadText}>Add Profile Photo</Text>
            <Text style={styles.uploadSubtext}>JPG, PNG up to 5MB • Auto-crop enabled</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Position Selection */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Position</Text>
        <View style={styles.buttonGroup}>
          {positions.map((pos) => (
            <TouchableOpacity
              key={pos}
              style={[
                styles.optionButton,
                formData.positions === pos && styles.selectedButton,
              ]}
              onPress={() => {
                if(pos === 'pitcher'){
                  setFormData(prev => ({...prev, isCatcher: false, isPitcher: true}));
                }
                if(pos === 'catcher'){
                  setFormData(prev => ({...prev, isPitcher: false, isCatcher: true}));
                }
                if(pos === 'dual'){
                  setFormData(prev => ({...prev, isPitcher: true, isCatcher: true}));
                }
                setFormData(prev => ({ ...prev, positions: pos }));
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  formData.positions === pos && styles.selectedText,
                ]}
              >
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date of Birth */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={openDatePicker}
        >
          <Text style={styles.dateText}>{formatDate(formData.dateOfBirth)}</Text>
        </TouchableOpacity>
        
        {/* React Native Date Picker */}
        <DatePicker
          modal
          open={showDatePicker}
          date={selectedDate} // Use the Date object state
          mode="date"
          maximumDate={new Date()}
          onConfirm={(date) => {
            handleDateChange(date);
            confirmDate();
          }}
          onCancel={closeDatePicker}
          title="Select Date of Birth"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      </View>

      {/* Skill Level */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skill Level</Text>
        <View style={styles.buttonGroup}>
          {skillLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                formData.skillLevel === level && styles.selectedButton,
              ]}
              onPress={() => setFormData(prev => ({ ...prev, skillLevel: level }))}
            >
              <Text
                style={[
                  styles.optionText,
                  formData.skillLevel === level && styles.selectedText,
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Throwing Arm */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Throwing Arm</Text>
        <View style={styles.buttonGroup}>
          {throwingArms.map((arm) => (
            <TouchableOpacity
              key={arm}
              style={[
                styles.optionButton,
                formData.throwingArm === arm && styles.selectedButton,
              ]}
              onPress={() => setFormData(prev => ({ ...prev, throwingArm: arm }))}
            >
              <Text
                style={[
                  styles.optionText,
                  formData.throwingArm === arm && styles.selectedText,
                ]}
              >
                {arm.charAt(0).toUpperCase() + arm.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.card}>
        <View style={styles.bioHeader}>
          <Text style={styles.cardTitle}>Bio</Text>
          <Text style={styles.wordCount}>
            {getBioWordCount()}/50 words
          </Text>
        </View>
        <TextInput
          style={styles.bioInput}
          placeholder="Tell us about yourself, your experience, goals, and what makes you unique as a player..."
          placeholderTextColor={colors.gray}
          value={formData.bio}
          onChangeText={handleBioChange}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Availability */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Availability</Text>
        
        {/* Add Availability Form */}
        <View style={styles.availabilityForm}>
          <View style={styles.daySelector}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day.value}
                style={[
                  styles.dayButton,
                  availabilityDay === day.value.toString() && styles.selectedDayButton,
                ]}
                onPress={() => setAvailabilityDay(day.value.toString())}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    availabilityDay === day.value.toString() && styles.selectedDayButtonText,
                  ]}
                >
                  {day.label.substring(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Inputs */}
          <View style={styles.timeRow}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="Start Time"
              placeholderTextColor={colors.gray}
              value={availabilityStart}
              onChangeText={setAvailabilityStart}
            />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="End Time"
              placeholderTextColor={colors.gray}
              value={availabilityEnd}
              onChangeText={setAvailabilityEnd}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addAvailability}>
            <Text style={styles.addButtonText}>+ Add Slot</Text>
          </TouchableOpacity>
        </View>

        {/* Display Added Availability */}
        {formData.availability.length > 0 && (
          <View style={styles.availabilityList}>
            {formData.availability.map((avail, index) => (
              <View key={index} style={styles.availabilityItem}>
                <Text style={styles.availabilityText}>
                  {getDayName(avail.dayOfWeek)}: {avail.startTime} - {avail.endTime}
                </Text>
                <TouchableOpacity
                  onPress={() => removeAvailability(index)}
                >
                  <Text style={styles.removeIcon}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Image Selection Modal */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.imageModalCard}>
            <Text style={styles.modalTitle}>Select Profile Photo</Text>
            <Text style={styles.modalSubtitle}>Choose how you'd like to add your profile photo. You'll be able to crop and adjust the image.</Text>

            <View style={styles.imageOptions}>
              <TouchableOpacity style={styles.imageOption} onPress={openCamera}>
                <View style={styles.imageOptionIcon}>
                  <Text style={styles.imageOptionIconText}>📷</Text>
                </View>
                <Text style={styles.imageOptionText}>Camera</Text>
                <Text style={styles.imageOptionSubtext}>Take a new photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageOption} onPress={selectFromGallery}>
                <View style={styles.imageOptionIcon}>
                  <Text style={styles.imageOptionIconText}>🖼️</Text>
                </View>
                <Text style={styles.imageOptionText}>Gallery</Text>
                <Text style={styles.imageOptionSubtext}>Choose from photos</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowImageModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        {loading?<CustomLoader size={17} color={colors.white}/>
        :
        <Text style={styles.submitButtonText}>Continue</Text>
      }
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(256,256,256,0.1)',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 24,
    fontFamily: Poppins.bold,
    lineHeight: 25,
    color: colors.darkGray,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    lineHeight: 25,
    color: colors.gray,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
imageModalCard: {
  backgroundColor: colors.white,
  borderRadius: 16,
  padding: 24,
  width: '100%',
  maxWidth: 340,
  shadowColor: colors.darkGray,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
},
modalTitle: {
  fontSize: 20,
  fontFamily: Poppins.bold,
  color: colors.darkGray,
  textAlign: 'center',
  marginBottom: 8,
},
modalSubtitle: {
  fontSize: 14,
  fontFamily: Poppins.regular,
  color: colors.gray,
  textAlign: 'center',
  lineHeight: 20,
  marginBottom: 24,
},
imageOptions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 24,
},
imageOption: {
  flex: 1,
  alignItems: 'center',
  padding: 20,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.lighestGray,
  backgroundColor: colors.white,
},
imageOptionIcon: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: colors.theme + '15',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
},
imageOptionIconText: {
  fontSize: 24,
},
imageOptionText: {
  fontSize: 16,
  fontFamily: Poppins.semiBold,
  color: colors.darkGray,
  marginBottom: 4,
},
imageOptionSubtext: {
  fontSize: 12,
  fontFamily: Poppins.regular,
  color: colors.gray,
  textAlign: 'center',
},
modalCancelButton: {
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  alignItems: 'center',
  backgroundColor: colors.lighestGray,
},
modalCancelText: {
  fontSize: 16,
  fontFamily: Poppins.medium,
  color: colors.gray,
},
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.bluishGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Poppins.semiBold,
    color: colors.gray,
    lineHeight: 25,
    marginBottom: 12,
  },
    cardSubtitle: {
    fontSize: 13,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    lineHeight: 18,
    marginBottom: 12,
  },
   imageContainer: {
    alignItems: 'center',
  },
   profileImagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular profile image
    marginBottom: 12,
    backgroundColor: colors.lighestGray,
  },
    imageActions: {
    flexDirection: 'row',
    gap: 12,
  },
    changeImageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.theme,
    backgroundColor: colors.white,
  },
    changeImageText: {
    fontSize: 13,
    fontFamily: Poppins.medium,
    color: colors.theme,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
   removeImageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
   removeImageText: {
    fontSize: 13,
    fontFamily: Poppins.medium,
    color: colors.lightGray,
  },
    uploadButton: {
    borderWidth: 2,
    borderColor: colors.lighestGray,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.theme + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadIconText: {
    fontSize: 20,
  },
  uploadText: {
    fontSize: 15,
    fontFamily: Poppins.semiBold,
    color: colors.darkGray,
    marginBottom: 4,
  },
   uploadSubtext: {
    fontSize: 12,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.lighestGray,
    backgroundColor: colors.white,
  },
  selectedButton: {
    borderColor: colors.theme,
    backgroundColor: colors.theme,
  },
  optionText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: Poppins.medium,
    lineHeight: 25,
  },
  selectedText: {
    color: colors.white,
    fontFamily: Poppins.semiBold,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lighestGray,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  dateText: {
    fontSize: 14,
    color: colors.darkGray,
    fontFamily: Poppins.regular,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lighestGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Poppins.regular,
    backgroundColor: colors.white,
    color: colors.darkGray,
    marginBottom: 12,
  },
  bioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wordCount: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: Poppins.regular,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: colors.lighestGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Poppins.regular,
    backgroundColor: colors.white,
    color: colors.darkGray,
    minHeight: 100,
  },
  availabilityForm: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lighestGray,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lighestGray,
    backgroundColor: colors.white,
  },
  selectedDayButton: {
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
  },
  dayButtonText: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: 25,
    fontFamily: Poppins.medium,
  },
  selectedDayButtonText: {
    color: colors.white,
    fontFamily: Poppins.semiBold,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timeInput: {
    flex: 1,
    marginBottom: 0,
    textAlign: 'center',
  },
  timeSeparator: {
    color: colors.lightGray,
    fontFamily: Poppins.regular,
  },
  addButton: {
    backgroundColor: colors.greenishBlue,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 25,
    fontFamily: Poppins.semiBold,
  },
  availabilityList: {
    marginTop: 8,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.lightBlue + '10',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.lightBlue,
  },
  availabilityText: {
    fontSize: 13,
    color: colors.darkGray,
    fontFamily: Poppins.regular,
    flex: 1,
  },
  removeIcon: {
    color: colors.lightGray,
    fontSize: 20,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: colors.theme,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 16,
    marginBottom: 30,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Poppins.semiBold,
  },
});

export default StepOnePlayer;