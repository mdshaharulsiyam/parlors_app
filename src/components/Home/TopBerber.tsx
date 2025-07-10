import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorQuery } from '../../Redux/Apis/vendorApis';
import { commonStyles } from '../../utils/styles/Styles';
import { IParlor } from '../../utils/types/Types';
import BusinessCard from '../Shared/BusinessCard';
const topBarbers: IParlor[] = [
  {
    _id: '1',
    name: 'John Doe',
    rating: 4.8,
    address: '123 Main St, New York, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=John+Doe',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    rating: 4.7,
    address: '456 Oak Ave, Los Angeles, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/250x188.png?text=Jane+Smith',
  },
  {
    _id: '3',
    name: 'Michael Brown',
    rating: 4.9,
    address: '789 Pine Blvd, Chicago, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=Michael+Brown',
  },
  {
    _id: '4',
    name: 'Emily Davis',
    rating: 4.6,
    address: '101 Maple Rd, Houston, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=Emily+Davis',
  },
  {
    _id: '5',
    name: 'Chris Wilson',
    rating: 4.5,
    address: '202 Birch Ln, Miami, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/250x188.png?text=Chris+Wilson',
  },
  {
    _id: '6',
    name: 'Sarah Lee',
    rating: 4.7,
    address: '303 Cedar St, San Francisco, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=Sarah+Lee',
  },
  {
    _id: '7',
    name: 'David Kim',
    rating: 4.8,
    address: '404 Elm Dr, Boston, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=David+Kim',
  },
  {
    _id: '8',
    name: 'Olivia Taylor',
    rating: 4.9,
    address: '505 Willow Ct, Dallas, USA',
    category: "Women's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=Olivia+Taylor',
  },
  {
    _id: '9',
    name: 'William Clark',
    rating: 4.6,
    address: '606 Redwood Ave, Seattle, USA',
    category: 'Beard Styling', // Added category
    img: 'https://placehold.co/250x188.png?text=William+Clark',
  },
  {
    _id: '10',
    name: 'Sophia Martinez',
    rating: 4.7,
    address: '707 Pinecrest Rd, Denver, USA',
    category: "Men's Haircuts", // Added category
    img: 'https://placehold.co/250x188.png?text=Sophia+Martinez',
  },
];

const TopBerber = () => {
  const { themeColors } = useGlobalContext();
  const { data } = useGetVendorQuery({ sort: 'rating', order: 'desc', top: true });
  return (
    <View style={{ paddingHorizontal: 5 }}>
      <View>
        <Text style={[commonStyles.headerText, { color: themeColors.black as string }]}>
          Top Vendors
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data?.data || []}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => <BusinessCard item={item} height={188} />}
      />
    </View>
  );
};

export default TopBerber;
