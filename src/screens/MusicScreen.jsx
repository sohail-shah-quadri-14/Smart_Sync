import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// Sample songs array - Replace with your actual songs
const SAMPLE_SONGS = [
  {
    id: '1',
    title: 'Sample Song 1',
    artist: 'Artist 1',
    uri: require('../../assets/songs/sample1.mp3'), // Add your songs in the assets/songs folder
  },
  {
    id: '2',
    title: 'Sample Song 2',
    artist: 'Artist 2',
    uri: require('../../assets/songs/sample2.mp3'),
  },
];

const MusicScreen = () => {
  const [sound, setSound] = useState(null);
  const [songs, setSongs] = useState(SAMPLE_SONGS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAudio = async (song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(song.uri, {
        shouldPlay: true,
        volume: volume,
      });
      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);
      
      // Get and set duration
      const status = await newSound.getStatusAsync();
      setDuration(status.durationMillis);

      // Update position while playing
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          if (status.didJustFinish) {
            handlePlaybackFinish();
          }
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to load the audio file.');
    }
  };

  const handlePlaybackFinish = () => {
    if (isRepeat) {
      playCurrentSong();
    } else {
      playNextSong();
    }
  };

  const playCurrentSong = async () => {
    if (currentSong) {
      await loadAudio(currentSong);
    }
  };

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else if (songs.length > 0) {
      await loadAudio(songs[0]);
    }
  };

  const playNextSong = async () => {
    if (!currentSong || !songs.length) return;
    
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * songs.length)
      : (currentIndex + 1) % songs.length;
    
    await loadAudio(songs[nextIndex]);
  };

  const playPreviousSong = async () => {
    if (!currentSong || !songs.length) return;
    
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    
    await loadAudio(songs[previousIndex]);
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
    setPosition(value);
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => loadAudio(item)}
    >
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      {currentSong?.id === item.id && (
        <Ionicons
          name={isPlaying ? 'musical-notes' : 'pause'}
          size={24}
          color="#1DB954"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Song List */}
      <View style={styles.songList}>
        <Text style={styles.sectionTitle}>Your Songs</Text>
        <FlatList
          data={songs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Player Controls */}
      <View style={styles.playerControls}>
        {currentSong && (
          <View style={styles.nowPlaying}>
            <Text style={styles.nowPlayingTitle}>{currentSong.title}</Text>
            <Text style={styles.nowPlayingArtist}>{currentSong.artist}</Text>
          </View>
        )}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={handleSliderChange}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#777"
            thumbTintColor="#1DB954"
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
            <Ionicons
              name="shuffle"
              size={24}
              color={isShuffle ? '#1DB954' : '#777'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPreviousSong}>
            <Ionicons name="play-skip-back" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={playPause}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNextSong}>
            <Ionicons name="play-skip-forward" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
            <Ionicons
              name="repeat"
              size={24}
              color={isRepeat ? '#1DB954' : '#777'}
            />
          </TouchableOpacity>
        </View>

        {/* Volume Control */}
        <View style={styles.volumeContainer}>
          <Ionicons name="volume-low" size={24} color="#777" />
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#777"
            thumbTintColor="#1DB954"
          />
          <Ionicons name="volume-high" size={24} color="#777" />
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setIsSettingsVisible(true)}
      >
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal
        visible={isSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Shuffle</Text>
              <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
                <Ionicons
                  name={isShuffle ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="#1DB954"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Repeat</Text>
              <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
                <Ionicons
                  name={isRepeat ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="#1DB954"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.settingHeader}>How to Add Songs:</Text>
            <ScrollView style={styles.instructionsContainer}>
              <Text style={styles.instructionText}>
                1. Create an 'assets/songs' folder in your project root
              </Text>
              <Text style={styles.instructionText}>
                2. Add your MP3 files to the songs folder
              </Text>
              <Text style={styles.instructionText}>
                3. Import them in the SAMPLE_SONGS array at the top of this file
              </Text>
              <Text style={styles.instructionText}>
                4. Update the song information (title, artist) accordingly
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
  songList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  songArtist: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  playerControls: {
    padding: 20,
    backgroundColor: '#282828',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  nowPlaying: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nowPlayingTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  nowPlayingArtist: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    color: '#777',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#1DB954',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#282828',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
  },
  settingHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  instructionsContainer: {
    maxHeight: 200,
  },
  instructionText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MusicScreen;
