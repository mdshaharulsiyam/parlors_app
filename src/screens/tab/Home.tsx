import { Dimensions, FlatList, Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../../components/Home/Banner';
import Categories from '../../components/Home/Categories';
import Parlors from '../../components/Home/Parlors';
import TopBerber from '../../components/Home/TopBerber';
import FilterOptions from '../../components/Shared/FilterOptions';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
const Home = () => {
  const { width, height } = Dimensions.get('window');
  const { themeColors, modalOpen, setModalOpen } = useGlobalContext();
  const data = [<Banner />, <TopBerber />, <Categories />, <Parlors />];
  return (
    <SafeAreaView style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), }}>
      <FlatList
        data={data}
        renderItem={({ item }) => item}
        ListHeaderComponent={() => <SearchFilterTrigger />}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, gap: 10, paddingHorizontal: 5 }}
      />
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <View
          style={{
            width,
            height, //: height - 200,
            backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
            // bottom: 0,
            // position: 'absolute',
            zIndex: 50000000,
          }}>
          <FilterOptions />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
