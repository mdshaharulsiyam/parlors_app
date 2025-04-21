import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../components/Home/Banner';
import TopBerber from '../../components/Home/TopBerber';
import Categories from '../../components/Home/Categories';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import Parlors from '../../components/Home/Parlors';
import Input from '../../components/Shared/Input';

const Home = () => {
  const {themeColors} = useGlobalContext();
  const data = [
    <Input
      placeholder="Enter your name"
      inputType="password"
      validate={true}
      style={{marginBottom: 10}}
    />,
    <Banner />,
    <TopBerber />,
    <Categories />,
    <Parlors />,
  ];
  return (
    <SafeAreaView style={{backgroundColor: themeColors.background2}}>
      <FlatList
        data={data}
        renderItem={({item}) => item}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20, gap: 10}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
