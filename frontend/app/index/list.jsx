import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "../../src/utils/constants";
import MediumCard from "../../src/components/MediumCard";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ListScreen = () => {
    const params = useLocalSearchParams();
    const { headText } = params;
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}><Text style={{ flex: 1, textAlign: "center", fontSize: 20, padding: 10, color: COLORS.FRENCH_GRAY, fontWeight: "bold" }}>{headText}</Text></View>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", position: "absolute" }} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.FRENCH_GRAY} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={
                    ({ item }) => (<MediumCard />)
                }
                ItemSeparatorComponent={
                    <View style={{ borderBottomColor: COLORS.FRENCH_GRAY, borderWidth: 0.5 }} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: COLORS.BLACK,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 24,
        color: COLORS.FRENCH_GRAY,
        paddingTop: 32,
        fontWeight: "bold",
        paddingBottom: 20,
    },
});

export default ListScreen;