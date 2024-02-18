import { ScrollView, View } from "react-native";
import React from 'react';
import MediumCard from "./MediumCard";
import { COLORS } from "../utils/constants";


const LatestPaper = React.memo(() => {
    return (
        <ScrollView horizontal style={{ paddingVertical: 16 }}>
            <View style={{ width: 16 }} />
            <View style={{ width: 240, flexDirection: "column", gap: 4 }} >
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ width: 240, flexDirection: "column", gap: 4}} >
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ width: 240, flexDirection: "column", gap: 4 }} >
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
                <View style={{width: "100%", borderBottomColor: COLORS.FRENCH_GRAY, borderBottomWidth: 0.5}}/>
                <MediumCard />
            </View>
            <View style={{ width: 16 }} />
        </ScrollView>
    );
});

export default LatestPaper;