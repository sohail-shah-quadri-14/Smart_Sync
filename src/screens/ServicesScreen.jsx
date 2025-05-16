import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
// import CameraComponent from '../components/CameraComponent'; // Import the CameraComponent
import { useNavigation } from '@react-navigation/native';

const services = [
  {
    id: '1',
    title: 'Exercise',
    description: 'View and track your exercise routines',
    icon: 'fitness-outline',
    color: '#007AFF',
  },
  {
    id: '2',
    title: 'Music Therapy',
    description: 'Relax and unwind with soothing music',
    icon: 'musical-notes-outline',
    color: '#34C759',
  },
  {
    id: '3',
    title: 'Reading Therapy',
    description: 'Improve your reading skills with personalized guidance',
    icon: 'book-outline',
    color: '#FF9500',
  },
  {
    id: '4',
    title: 'Emergency Services',
    description: 'Quick access to emergency medical services',
    icon: 'call-outline',
    color: '#FF3B30',
  },
  {
    id: '5',
    title: 'Health Tips',
    description: 'Daily health tips and wellness advice',
    icon: 'information-circle-outline',
    color: '#5856D6',
  },
  {
    id: '6',
    title: 'Pharmacy Locator',
    description: 'Find nearby pharmacies and their operating hours',
    icon: 'location-outline',
    color: '#FF2D55',
  },
  {
    id: '7',
    title: 'Laugh Therapy',
    description: 'Laugh and smile with our collection of funny videos',
    icon: 'laughing-outline',
    color: '#8E44AD',
  },
];

const ServicesScreen = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const navigation = useNavigation();

  const handleServicePress = (serviceId) => {
    if (serviceId === '1') {
      navigation.navigate('Exercise');
      
    } else if (serviceId === '2') {
      navigation.navigate('Music');
    } else if (serviceId === '3') {
      navigation.navigate('Read');
    } else if (serviceId === '7') {
      navigation.navigate('Laugh');
    }
    // Handle other services here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Medical Services</Text>
          <Text style={styles.subtitle}>Access all your healthcare needs in one place</Text>
        </View>

        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${service.color}15` }]}>
                <Ionicons name={service.icon} size={32} color={service.color} />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.emergencySection}>
          <View style={styles.emergencyCard}>
            <Ionicons name="warning-outline" size={32} color="#FF3B30" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
              <Text style={styles.emergencyNumber}>911</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal for CameraComponent */}
      {/* <Modal
        visible={isCameraVisible}
        animationType="slide"
        onRequestClose={() => setIsCameraVisible(false)}
      >
        <CameraComponent />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsCameraVisible(false)}
        >
          <Ionicons name="close-circle-outline" size={36} color="#FF3B30" />
        </TouchableOpacity>
      </Modal> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  emergencySection: {
    padding: 20,
    paddingBottom: 30,
  },
  emergencyCard: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyContent: {
    marginLeft: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  emergencyNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default ServicesScreen;