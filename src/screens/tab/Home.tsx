import {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../components/Home/Banner';
import Categories from '../../components/Home/Categories';
import Parlors from '../../components/Home/Parlors';
import TopBerber from '../../components/Home/TopBerber';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';
const Home = () => {
  const {themeColors, height} = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const data = [
    <Banner refreshing={refreshing} />,
    <TopBerber refreshing={refreshing} />,
    <Categories refreshing={refreshing} />,
    <Parlors refreshing={refreshing} />,
  ];
  return (
    <SafeAreaView
      style={{
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        height: height,
      }}>
      <FlatList
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 500);
        }}
        refreshing={refreshing}
        data={data}
        renderItem={({item}) => item}
        ListHeaderComponent={() => <SearchFilterTrigger />}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          gap: 30,
          paddingHorizontal: 5,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
