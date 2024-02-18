import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';
import { Link } from 'expo-router';

const SmallCard = React.memo(({ imgUrl, name }) => {

    return (
        <Link href="/play" asChild>
            <TouchableOpacity style={styles.container} activeOpacity={0.4}>
                <Image source={{ uri: imgUrl }} style={styles.img} contentFit='cover' />
                <Text style={{ color: COLORS.FRENCH_GRAY, fontSize: 12, paddingTop: 8, fontWeight: '600' }} numberOfLines={2}>{name}</Text>
            </TouchableOpacity>
        </Link>
    );
});

const styles = StyleSheet.create({
    container: {
        width: 150,
        borderColor: COLORS.FRENCH_GRAY,
        borderRadius: 10,
        elevation: 5,
    },
    background: {
        flex: 1,
        borderRadius: 10,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 4,
    }
});

export default SmallCard;