import React, { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
  const quickActions = [
    { title: 'Scan Med', icon: 'scan-outline', screen: 'Scan' },
    { title: 'Chat Support', icon: 'chatbubble-outline', screen: 'Chat' },
    { title: 'Services', icon: 'medkit-outline', screen: 'Services' },
    { title: 'Profile', icon: 'person-outline', screen: 'Profile' },
  ];

  // Create refs for each quick action
  const actionRefs = useRef(quickActions.map(() => React.createRef()));

  useFocusEffect(
    React.useCallback(() => {
      // Animate each card with a staggered delay
      actionRefs.current.forEach((ref, idx) => {
        setTimeout(() => {
          ref.current?.fadeInUp(600);
        }, idx * 150);
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>Life Link Care</Text>
          <Text style={styles.subtitle}>Your Health Companion</Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Animatable.View
                ref={actionRefs.current[index]}
                key={index}
                style={{ width: '49%' }}
              >
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={() => navigation.navigate(action.screen)}
                >
                  <Ionicons name={action.icon} size={32} color="#007AFF" />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Ionicons name="time-outline" size={24} color="#666" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Last Medicine Scan</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
        </View>

        {/* Health Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="information-circle-outline" size={24} color="#666" />
            <Text style={styles.tipText}>
              Remember to take your medications on time and stay hydrated throughout the day.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#8ef77c',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'rubik-light',
    fontStyle: 'italic',
    color: '#fff',
    opacity: 0.9,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '55%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
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
  actionTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recentActivityContainer: {
    padding: 20,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
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
  activityContent: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tipsContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;