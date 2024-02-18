import { Image } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

const imgurl1 = "https://i.ibb.co/3cVw6PN/artificial-intelligence-jpg.png";

const MediumCard = React.memo(() => {
    return (
        <TouchableOpacity style={{width: "100%", height: 120, flexDirection: "row", padding: 4, alignItems: "center"}} activeOpacity={0.4}>
            <Image style={{height: "80%", aspectRatio: 1}} source={{uri: imgurl1}} />
            <View style={{flex: 1, padding: 4, flexDirection: 'column', alignItems: "flex-start", marginLeft: 8}}>
                <Text style={{color: COLORS.FRENCH_GRAY, fontSize: 10, paddingBottom: 8}}>February 17, 2024</Text>
                <Text style={{color: COLORS.FRENCH_GRAY, lineHeight: 24, fontSize: 12, fontWeight: "bold"}} numberOfLines={2}>OptiMUS: Scalable Optimization Modeling with (MI)LP Solvers and Large Language Models</Text>
            </View>
        </TouchableOpacity>
    );
});
 
export default MediumCard;