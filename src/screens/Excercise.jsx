import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Exercise data organized by body parts
const exerciseData = {
  arms: {
    title: 'Arms Exercises',
    exercises: [
      {
        name: 'Push-ups',
        description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
        sets: '3 sets of 10-15 reps',
        image: require('../../assets/exercises/PushUps.gif'),
      },
    //   {
    //     name: 'Bicep Curls',
    //     description: 'Isolation exercise for biceps using dumbbells or resistance bands',
    //     sets: '3 sets of 12 reps',
    //     image: require('../assets/exercises/bicep-curls.png'),
    //   },
    ],
  },
  legs: {
    title: 'Legs Exercises',
    exercises: [
      {
        name: 'Squats',
        description: 'Compound exercise targeting quadriceps, hamstrings, and glutes',
        sets: '3 sets of 12-15 reps',
        image: require('../../assets/exercises/sitUps.png'),
        
      },
      {
        name: 'Lunges',
        description: 'Unilateral exercise for legs and balance',
        sets: '3 sets of 10 reps per leg',
        image: require('../../assets/exercises/male-bodyweight-forward-lunge-side.gif'),
      },
    ],
  },
  core: {
    title: 'Core Exercises',
    exercises: [
      {
        name: 'Plank',
        description: 'Isometric exercise for core stability',
        sets: '3 sets of 30-60 seconds',
        image: require('../../assets/exercises/plank.png'),
        isGif: false,
      },
    //   {
    //     name: 'Crunches',
    //     description: 'Basic abdominal exercise',
    //     sets: '3 sets of 15-20 reps',
    //     image: require('../assets/exercises/crunches.png'),
    //   },
    ],
  },
  back: {
    title: 'Back Exercises',
    exercises: [
      {
        name: 'Superman Hold',
        description: 'Lower back strengthening exercise',
        sets: '3 sets of 20-30 seconds',
        image: require('../../assets/exercises/superman.png'),
        isGif: false,
      },
    //   {
    //     name: 'Bird Dog',
    //     description: 'Stability exercise for back and core',
    //     sets: '3 sets of 10 reps per side',
    //     image: require('../assets/exercises/bird-dog.png'),
    //   },
    ],
  },
  chest: {
    title: 'Chest Exercises',
    exercises: [
      {
        name: 'Diamond Push-ups',
        description: 'Variation of push-ups targeting inner chest',
        sets: '3 sets of 10-12 reps',
        image: require('../../assets/exercises/diamond.png'),
        isGif: false,
      },
    //   {
    //     name: 'Chest Dips',
    //     description: 'Advanced bodyweight exercise for chest and triceps',
    //     sets: '3 sets of 8-12 reps',
    //     image: require('../assets/exercises/chest-dips.png'),
    //   },
    ],
  },
};

const ExerciseImage = ({ source }) => {
  return (
    <Image
      source={source}
      style={styles.exerciseImage}
      contentFit="cover"
      cachePolicy="memory-disk"
    />
  );
};

const ExerciseScreen = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBodyPartPress = (part) => {
    setSelectedPart(part);
    setModalVisible(true);
  };

  const renderExerciseModal = () => {
    if (!selectedPart || !exerciseData[selectedPart]) return null;

    const { title, exercises } = exerciseData[selectedPart];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.exerciseList}>
              {exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseCard}>
                  <ExerciseImage source={exercise.image} />
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDescription}>
                      {exercise.description}
                    </Text>
                    <Text style={styles.exerciseSets}>{exercise.sets}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Body Part</Text>
      <View style={styles.bodyContainer}>
        <Image
          source={require('../../assets/exercises/bodyDiagram.png')}
          style={styles.bodyDiagram}
          resizeMode="contain"
        />
        <View style={styles.touchableAreas}>
          <TouchableOpacity
            style={[styles.bodyPart, styles.arms]}
            onPress={() => handleBodyPartPress('arms')}
          />
          <TouchableOpacity
            style={[styles.bodyPart, styles.chest]}
            onPress={() => handleBodyPartPress('chest')}
          />
          <TouchableOpacity
            style={[styles.bodyPart, styles.core]}
            onPress={() => handleBodyPartPress('core')}
          />
          <TouchableOpacity
            style={[styles.bodyPart, styles.back]}
            onPress={() => handleBodyPartPress('back')}
          />
          <TouchableOpacity
            style={[styles.bodyPart, styles.legs]}
            onPress={() => handleBodyPartPress('legs')}
          />
        </View>
      </View>
      {renderExerciseModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  bodyDiagram: {
    width: width * 0.8,
    height: width * 1.2,
    marginBottom: 20,
  },
  touchableAreas: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 1.2,
  },
  bodyPart: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(29, 185, 84, 0.3)',
  },
  arms: {
    top: '25%',
    right: '15%',
  },
  chest: {
    top: '20%',
    left: '45%',
  },
  core: {
    top: '40%',
    left: '45%',
  },
  back: {
    top: '30%',
    left: '15%',
  },
  legs: {
    top: '60%',
    left: '45%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1DB954',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  exerciseList: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  exerciseInfo: {
    padding: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#1DB954',
    fontWeight: '600',
  },
});

export default ExerciseScreen;
