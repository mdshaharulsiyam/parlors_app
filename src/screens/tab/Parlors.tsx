import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IParlor} from '../../utils/types/Types';
import ParlorCard from '../../components/Shared/ParlorCard';
import SearchInput from '../../components/Shared/SearchInput';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {OtherIcons} from '../../constant/images';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
const Barbers: IParlor[] = [
  {
    _id: '1',
    name: 'John Doe',
    rating: 4.8,
    address: '123 Main St, New York, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=John+Doe',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    rating: 4.7,
    address: '456 Oak Ave, Los Angeles, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/400x400.png?text=Jane+Smith',
  },
  {
    _id: '3',
    name: 'Michael Brown',
    rating: 4.9,
    address: '789 Pine Blvd, Chicago, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=Michael+Brown',
  },
  {
    _id: '4',
    name: 'Emily Davis',
    rating: 4.6,
    address: '101 Maple Rd, Houston, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=Emily+Davis',
  },
  {
    _id: '5',
    name: 'Chris Wilson',
    rating: 4.5,
    address: '202 Birch Ln, Miami, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/400x400.png?text=Chris+Wilson',
  },
  {
    _id: '6',
    name: 'Sarah Lee',
    rating: 4.7,
    address: '303 Cedar St, San Francisco, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=Sarah+Lee',
  },
  {
    _id: '7',
    name: 'David Kim',
    rating: 4.8,
    address: '404 Elm Dr, Boston, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=David+Kim',
  },
  {
    _id: '8',
    name: 'Olivia Taylor',
    rating: 4.9,
    address: '505 Willow Ct, Dallas, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=Olivia+Taylor',
  },
  {
    _id: '9',
    name: 'William Clark',
    rating: 4.6,
    address: '606 Redwood Ave, Seattle, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/400x400.png?text=William+Clark',
  },
  {
    _id: '10',
    name: 'Sophia Martinez',
    rating: 4.7,
    address: '707 Pinecrest Rd, Denver, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/400x400.png?text=Sophia+Martinez',
  },
];
const Parlors = () => {
  const {width, height} = Dimensions.get('window');
  const {themeColors, modalOpen, setModalOpen} = useGlobalContext();
  return (
    <View>
      <FlatList
        onEndReached={e => {
          console.log(e);
        }}
        ListHeaderComponent={() => <SearchFilterTrigger />}
        stickyHeaderIndices={[0]}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        data={Barbers}
        keyExtractor={item => item?._id}
        renderItem={({item}) => (
          <ParlorCard
            key={item?._id}
            item={item}
            width={width / 2 - 30}
            height={100}
          />
        )}
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
            backgroundColor: themeColors.background,
            // bottom: 0,
            // position: 'absolute',
          }}></View>
      </Modal>
    </View>
  );
};

export default Parlors;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
  },
});
