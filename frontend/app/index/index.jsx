import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../src/utils/constants';
import BigCard from '../../src/components/BigCard';
import SmallCard from '../../src/components/SmallCard';
import TopicBar from '../../src/components/TopicBar';
import LatestPaper from '../../src/components/LatestPaper';


const imgurl1 = "https://i.ibb.co/3cVw6PN/artificial-intelligence-jpg.png";
const imgurl2 = "https://bau.edu/blog/wp-content/uploads/2021/11/why-study-economics-and-finance-ba-benefits-and-career-paths-e1637329020419.jpg";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Listen Now</Text>
      <TouchableOpacity style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Popular</Text>
        <Ionicons name="chevron-forward-sharp" size={20} color={COLORS.FRENCH_GRAY} />
      </TouchableOpacity>
      <View style={styles.flatListWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => { return (<BigCard {...item} />) }}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ItemSeparatorComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          data={[{ imgUrl: imgurl1, name: "OptiMUS: Scalable Optimization Modeling with (MI)LP Solvers and Large Language Models" }, { imgUrl: imgurl2, name: "A game theoretic approach to lowering incentives to violate speed limits in Finland" }]} // Dummy data for now
        />
      </View>
      <TouchableOpacity style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Recently Listened</Text>
        <Ionicons name="chevron-forward-sharp" size={20} color={COLORS.FRENCH_GRAY} />
      </TouchableOpacity>
      <View style={styles.flatListWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ index, item }) => { return (<SmallCard {...item} />) }}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ItemSeparatorComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          data={[{ imgUrl: imgurl1, name: "OptiMUS: Scalable Optimization Modeling with (MI)LP Solvers and Large Language Models" }, { imgUrl: imgurl2, name: "A game theoretic approach to lowering incentives to violate speed limits in Finland" }]} // Dummy data for now
        />
      </View>
      <View style={styles.subHeaderContainer} >
        <Text style={styles.subHeaderText}>Trending Topics</Text>
      </View>
     <TopicBar />
     <TouchableOpacity style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Latest Papers</Text>
        <Ionicons name="chevron-forward-sharp" size={20} color={COLORS.FRENCH_GRAY} />
      </TouchableOpacity>
      <LatestPaper />
      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingTop: Constants.statusBarHeight,
  },
  headerText: {
    fontSize: 32,
    color: COLORS.FRENCH_GRAY,
    paddingHorizontal: 16,
    paddingTop: 32,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: COLORS.FRENCH_GRAY,
    fontSize: 20,
    marginRight: 4,
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  flatListWrapper: {
    paddingVertical: 16
  }
});
