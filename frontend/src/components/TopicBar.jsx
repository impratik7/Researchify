import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { COLORS } from '../utils/constants';
import { Link } from 'expo-router';

const mlIcon = require('../../assets/icons/machine-learning.png');
const blockchainIcon = require('../../assets/icons/blockchain.png');
const virtualIcon = require('../../assets/icons/virtual.png');
const quantumIcon = require('../../assets/icons/quantum-computing.png');

const TopicBar = React.memo(() => {
    return (
        <View style={{ flexDirection: 'row', padding: 16, justifyContent: "space-evenly", gap: 16 }}>
            <Link href={{ pathname: "/list", params: { headText: "Artificial Intelligence" } }} asChild>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.4}>
                    <LinearGradient colors={[COLORS.PERSIAN_BLUE, COLORS.FRENCH_GRAY]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.6 }} style={{ flex: 1, aspectRatio: 1, padding: 12, borderRadius: 10000 }}>
                        <Image source={mlIcon} style={{ flex: 1 }} contentFit='cover' />
                    </LinearGradient>
                    <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 12, paddingTop: 8, fontWeight: '600', textAlign: "center" }}>Artificial Intelligence</Text>
                </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "/list", params: { headText: "Blockchain Technology" } }} asChild>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.4}>
                    <LinearGradient colors={[COLORS.PERSIAN_BLUE, COLORS.FRENCH_GRAY]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.6 }} style={{ flex: 1, aspectRatio: 1, padding: 12, borderRadius: 10000 }}>
                        <Image source={blockchainIcon} style={{ flex: 1 }} contentFit='cover' />
                    </LinearGradient>
                    <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 12, paddingTop: 8, fontWeight: '600', textAlign: "center" }}>Blockchain Technology</Text>
                </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "/list", params: { headText: "Virtual Reality" } }} asChild>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.4}>
                    <LinearGradient colors={[COLORS.PERSIAN_BLUE, COLORS.FRENCH_GRAY]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.6 }} style={{ flex: 1, aspectRatio: 1, padding: 12, borderRadius: 1000 }}>
                        <Image source={virtualIcon} style={{ flex: 1 }} contentFit='cover' />
                    </LinearGradient>
                    <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 12, paddingTop: 8, fontWeight: '600', textAlign: "center" }}>Virtual Reality</Text>
                </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "/list", params: { headText: "Quantum Computing" } }} asChild>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.4}>
                    <LinearGradient colors={[COLORS.PERSIAN_BLUE, COLORS.FRENCH_GRAY]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.6 }} style={{ flex: 1, aspectRatio: 1, padding: 12, borderRadius: 1000 }}>
                        <Image source={quantumIcon} style={{ flex: 1 }} contentFit='cover' />
                    </LinearGradient>
                    <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 12, paddingTop: 8, fontWeight: '600', textAlign: "center" }}>Quantum Computing</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
});

export default TopicBar;