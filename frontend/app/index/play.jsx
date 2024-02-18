import { StyleSheet, Text, TouchableOpacity, View, Share, Linking } from 'react-native';
import { COLORS } from '../../src/utils/constants';
import Constants from "expo-constants";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const imgurl1 = "https://i.ibb.co/3cVw6PN/artificial-intelligence-jpg.png";
const mp3url = "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3";

export default function Play() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      if (sound === null) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: mp3url },
          { shouldPlay: true, getProgressUpdateIntervalMillis: 100 }
        );
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(sound);
        setIsPlaying(true);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status && status.durationMillis && status.positionMillis) {
      setProgress(status.positionMillis / status.durationMillis);
    }
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: "This is share message. ",
        url: "test.com",
        title: `Check out this paper: `
      },
        {
          dialogTitle: `Check out this paper: `,
          subject: `Check out this paper: `
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReadClick = () => {
    Linking.openURL("https://www.google.com").catch((err) => console.error('An error occurred', err));
  }

  const pauseSound = async () => {
    try {
      if (sound !== null) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log('Error pausing sound: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[COLORS.PERSIAN_BLUE, "transparent"]}
        style={styles.background}
      >
        <View style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}><Text style={{ flex: 1, textAlign: "center", fontSize: 20, padding: 10, color: COLORS.FRENCH_GRAY, fontWeight: "bold" }}>Playing Now</Text></View>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", position: "absolute" }} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={COLORS.FRENCH_GRAY} /><Text style={{ color: COLORS.FRENCH_GRAY }}>Return</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", paddingVertical: 40, alignItems: "center" }}>
          <Image source={{ uri: imgurl1 }} style={{ width: "60%", aspectRatio: 1, borderRadius: 10 }} />
        </View>
        <View>
          <Text style={{ color: COLORS.VISTERIA, fontSize: 12, paddingLeft: 24, marginBottom: 12, fontWeight: "bold" }}>FEBRUARY 17, 2024</Text>
          <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 22, paddingHorizontal: 24 }} numberOfLines={2}>OptiMUS: Scalable Optimization Modeling with (MI)LP Solvers and Large Language Models</Text>
          <Text style={{ color: COLORS.VISTERIA, fontSize: 16, paddingLeft: 24, marginVertical: 12, fontWeight: "bold" }}>By Viral Damaniya, Et al.</Text>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 32 }} onPress={isPlaying ? pauseSound : playSound}>
          <View style={{backgroundColor: COLORS.VISTERIA, paddingVertical: 8, borderRadius: 4, width: "65%"}}>
            <Text style={{fontSize: 20, textAlign: "center", color: COLORS.PERSIAN_BLUE}}><Ionicons style={{ flex: 1 }} name={isPlaying ? 'pause' : 'play'} size={20} color={COLORS.PERSIAN_BLUE} />{isPlaying ? ' Pause' : ' Play'}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 32 }}>
          <TouchableOpacity onPress={() => setFav(!fav)}>
            <View style={{ backgroundColor: COLORS.VISTERIA, width: 50, height: 50, borderRadius: 25, alignItems: "center", padding: 10 }}>
              <Ionicons style={{ flex: 1 }} name={fav ? 'heart' : 'heart-outline'} size={30} color={fav ? "red" : COLORS.PERSIAN_BLUE} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            <View style={{ backgroundColor: COLORS.VISTERIA, width: 50, height: 50, borderRadius: 25, alignItems: "center", padding: 10 }}>
              <Ionicons style={{ flex: 1 }} name={isPlaying ? 'pause' : 'play'} size={30} color={COLORS.PERSIAN_BLUE} />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleReadClick}>
            <View style={{ backgroundColor: COLORS.VISTERIA, width: 50, height: 50, borderRadius: 25, alignItems: "center", padding: 10 }}>
              <Ionicons style={{ flex: 1 }} name={"download-outline"} size={30} color={COLORS.PERSIAN_BLUE} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareData}>
            <View style={{ backgroundColor: COLORS.VISTERIA, width: 50, height: 50, borderRadius: 25, alignItems: "center", padding: 10 }}>
              <Ionicons style={{ flex: 1 }} name={"share-outline"} size={30} color={COLORS.PERSIAN_BLUE} />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  background: {
    paddingTop: Constants.statusBarHeight + 4,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: COLORS.FRENCH_GRAY,
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PERSIAN_BLUE,
  },
});
