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
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from '../../../constants/colors';
import { Poppins } from '../../../constants/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registerUserFacility } from '../../../redux/store/slices/userSlice';
import { useAuth } from '../../../context/AuthContext';
import CustomLoader from '../../../components/CustomLoader';

const StepOneFacility = ({ navigation, route }) => {
  const previousData = route?.params?.data;
  const { login } = useAuth();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    facilityName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contact: {
      phone: '',
      email: '',
      website: '',
    },
    logo: null,
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleLogoUpload = () => {
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
        console.log(storageGranted, 'STORAGE<><><>')
        return cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
          storageGranted === PermissionsAndroid.RESULTS.GRANTED || storageGranted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
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
      cropperCircleOverlay: false,
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
      cropperCircleOverlay: false,
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

  const removeLogo = () => {
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

  const validateForm = () => {
    const { facilityName, address, contact } = formData;

    if (!facilityName.trim()) {
      Alert.alert('Error', 'Please enter facility name');
      return false;
    }

    if (!address.street || !address.city || !address.state || !address.zipCode) {
      Alert.alert('Error', 'Please fill in all address fields');
      return false;
    }

    if (!contact.phone || !contact.email) {
      Alert.alert('Error', 'Please enter phone number and email address');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    // Basic phone validation (at least 10 digits)
    const phoneRegex = /\d{10,}/;
    if (!phoneRegex.test(contact.phone.replace(/\D/g, ''))) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setLoading(true)
    if (validateForm()) {
      const data = new FormData();

      data.append('name', formData.facilityName);
      data.append('role', 'facility'); // or another role value
      data.append('phone', formData.contact.phone);
      data.append('email', formData.contact.email);
      data.append('website', formData.contact.website || '');
      data.append('city', formData.address.city);
      data.append('state', formData.address.state);
      data.append('pincode', formData.address.zipCode);
      data.append('addLine1', formData.address.street);
      data.append('password', previousData.password);

      if (formData.logo) {
        const uriParts = formData.logo.split('.');
        const fileType = uriParts[uriParts.length - 1];
        data.append('logo', {
          uri: formData.logo,
          name: `logo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      dispatch(registerUserFacility({ formData: data, isFormData: true }))
        .unwrap()
        .then(async (res) => {
          console.log(res, 'RESPONSE OF REGISTER<><>')
          await login(res?.token, res?.user);
          setLoading(false)

        })
        .catch((err) => {
          console.log(err, 'ERROR IN REGISTER<><>')
        });

    }
  };

  const formatPhoneNumber = (text) => {
    return text
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    handleContactChange('phone', formatted);
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
        <Text style={styles.title}>Facility Profile</Text>
        <Text style={styles.subtitle}>
          Tell us about your facility to help players find and connect with you.
        </Text>
      </View>

       {/* Logo Upload */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Facility Logo</Text>
        <Text style={styles.cardSubtitle}>
          Upload your facility logo to help players recognize your brand. The image will be automatically cropped to fit.
        </Text>

        {formData.logo ? (
          <View style={styles.logoContainer}>
            <Image source={{ uri: formData.logo }} style={styles.logoPreview} />
            <View style={styles.logoActions}>
              <TouchableOpacity style={styles.changeLogoButton} onPress={handleLogoUpload}>
                <Text style={styles.changeLogoText}>Change Logo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeLogoButton} onPress={removeLogo}>
                <Text style={styles.removeLogoText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleLogoUpload}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>📷</Text>
            </View>
            <Text style={styles.uploadText}>Upload Logo</Text>
            <Text style={styles.uploadSubtext}>JPG, PNG up to 5MB • Auto-crop enabled</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Facility Name */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Facility Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter facility name"
          placeholderTextColor={colors.gray}
          value={formData.facilityName}
          onChangeText={(value) => setFormData(prev => ({ ...prev, facilityName: value }))}
        />
      </View>

      {/* Address */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          placeholderTextColor={colors.gray}
          value={formData.address.street}
          onChangeText={(value) => handleAddressChange('street', value)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="City"
            placeholderTextColor={colors.gray}
            value={formData.address.city}
            onChangeText={(value) => handleAddressChange('city', value)}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="State"
            placeholderTextColor={colors.gray}
            value={formData.address.state}
            onChangeText={(value) => handleAddressChange('state', value)}
            autoCapitalize="characters"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          placeholderTextColor={colors.gray}
          value={formData.address.zipCode}
          onChangeText={(value) => handleAddressChange('zipCode', value)}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information *</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={colors.gray}
          value={formData.contact.phone}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          maxLength={14}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={colors.gray}
          value={formData.contact.email}
          onChangeText={(value) => handleContactChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Website (Optional)"
          placeholderTextColor={colors.gray}
          value={formData.contact.website}
          onChangeText={(value) => handleContactChange('website', value)}
          keyboardType="url"
          autoCapitalize="none"
        />
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
            <Text style={styles.modalTitle}>Select Logo</Text>
            <Text style={styles.modalSubtitle}>Choose how you'd like to add your facility logo. You'll be able to crop and adjust the image.</Text>

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

      {/* Additional Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          <Text style={styles.infoTextBold}>Next Steps:</Text> After completing this profile,
          you'll be able to add facility details, pricing, and availability to attract players.
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        {loading ?
          <CustomLoader size={17} color={colors.white} />
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
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
  logoContainer: {
    alignItems: 'center',
  },
  logoPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.lighestGray,
  },
  logoActions: {
    flexDirection: 'row',
    gap: 12,
  },
  changeLogoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.theme,
    backgroundColor: colors.white,
  },
  changeLogoText: {
    fontSize: 13,
    fontFamily: Poppins.medium,
    color: colors.theme,
  },
  removeLogoButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  removeLogoText: {
    fontSize: 13,
    fontFamily: Poppins.medium,
    color: colors.lightGray,
  },
  infoCard: {
    backgroundColor: colors.lightBlue + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.lightBlue,
  },
  infoText: {
    fontSize: 13,
    fontFamily: Poppins.regular,
    color: colors.darkGray,
    lineHeight: 20,
  },
  infoTextBold: {
    fontFamily: Poppins.semiBold,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageModalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: colors.lighestGray,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Poppins.semiBold,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: Poppins.regular,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  imageOption: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.lighestGray,
    backgroundColor: colors.white,
  },
  imageOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.theme + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageOptionIconText: {
    fontSize: 20,
  },
  imageOptionText: {
    fontSize: 15,
    fontFamily: Poppins.semiBold,
    color: colors.darkGray,
    marginBottom: 4,
  },
  imageOptionSubtext: {
    fontSize: 12,
    fontFamily: Poppins.regular,
    color: colors.lightGray,
    textAlign: 'center',
  },
  modalCancelButton: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lighestGray,
    backgroundColor: colors.white,
  },
  modalCancelText: {
    color: colors.gray,
    fontSize: 15,
    fontFamily: Poppins.medium,
    textAlign: 'center',
  },
});

export default StepOneFacility;