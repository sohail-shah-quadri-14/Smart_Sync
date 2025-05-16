import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
// import './LaughCompo.css';

const LaughCompo = () => {
  const [sound, setSound] = useState();

  const soundCards = [
    {
      id: 1,
      icon: <FontAwesome5 name="laugh" size={50} color="#4a90e2" />,
      sound: require('../../assets/sounds/6.mp3'),
      title: 'Happy Laugh'
    },
    {
      id: 2,
      icon: <FontAwesome5 name="grin-squint-tears" size={50} color="#4a90e2" />,
      sound: require('../../assets/sounds/6.mp3'),
      title: 'Crying Laugh'
    },
    {
      id: 3,
      image: require('../../assets/funny/6img.gif'),
      sound: require('../../assets/sounds/6.mp3'),
      title: 'Funny Moment 1'
    },
    {
      id: 4,
      icon: <FontAwesome5 name="grin-tears" size={50} color="#4a90e2" />,
      sound: require('../../assets/sounds/6.mp3'),
      title: 'Rolling Laugh'
    },
    {
      id: 5,
      image: require('../../assets/funny/GettyImages.jpg'),
      sound: require('../../assets/sounds/6.mp3'),
      title: 'Funny Moment 2'
    }
  ];

  async function playSound(soundFile) {
    // Unload the current sound if it exists
    if (sound) {
      await sound.unloadAsync();
    }

    // Load and play the new sound
    const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  // Cleanup sound when component unmounts
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.laughContainer}>
        <Text style={styles.title}>Fun Sound Board</Text>
        <View style={styles.cardGrid}>
          {soundCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.soundCard}
              onPress={() => playSound(card.sound)}
            >
              {card.icon ? (
                <View style={styles.iconContainer}>{card.icon}</View>
              ) : (
                <View style={styles.imageContainer}>
                  <Image
                    source={card.image}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                  />
                </View>
              )}
              <Text style={styles.cardTitle}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    flex: 1,
    width: '100%',
  },
  laughContainer: {
    padding: 32,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    padding: 16,
  },
  soundCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    width: 200,
    margin: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  imageContainer: {
    width: 150,
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
};

export default LaughCompo;
