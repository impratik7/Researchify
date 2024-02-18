import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Constants from "expo-constants";
import { COLORS } from '../src/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import React from 'react';

const chem = require('../assets/discover/ce.jpeg');
const crypto = require('../assets/discover/cg.jpeg');
const elec = require('../assets/discover/ee.jpeg');
const math = require('../assets/discover/me.webp');
const nucl = require('../assets/discover/ne.jpeg');
const phys = require('../assets/discover/ph.jpeg');
const qubi = require('../assets/discover/qb.webp');
const quco = require('../assets/discover/qc.jpeg');
const econ = require('../assets/discover/ec.jpeg');
const robo = require('../assets/discover/rb.jpeg');

const Discover = React.memo(() => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Discover</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="search" style={{ marginLeft: 4 }} size={22} color={COLORS.VISTERIA} />
        <TextInput style={styles.input} placeholder='Papers, Topics, Ideas' placeholderTextColor={`${COLORS.VISTERIA}66`} returnKeyType="search" />
      </View>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={chem} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Chemistry</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={crypto} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Cryptography</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={nucl} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Nuclear</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={phys} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Physics</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={qubi} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Quantum Biology</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={quco} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Quantum Computing</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={elec} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={math} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Mathemmatics</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={econ} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Economics</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}  style={styles.card}>
          <Image source={robo} style={styles.image} />
          <View style={styles.tint}></View>
          <Text style={styles.cardText}>Robotics</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 60 }} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020300',
    color: '#CFCCD6',
    paddingTop: Constants.statusBarHeight,
  },
  headerText: {
    fontSize: 32,
    color: COLORS.FRENCH_GRAY,
    paddingHorizontal: 16,
    paddingTop: 32,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    fontSize: 22,
    color: COLORS.VISTERIA,
    marginLeft: 8,
  },
  inputContainer: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    padding: 6,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    aspectRatio: 3 / 2,
    backgroundColor: "white",
    borderRadius: 4,
    // borderColor: "gray",
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
  cardText: {
    padding: 4,
    position: "absolute",
    bottom: 0,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    // backgroundColor: COLORS.VISTERIA
  },
  tint: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.BLACK,
    opacity: 0.4,
    position: "absolute",
    bottom: 0
  }
});

export default Discover;