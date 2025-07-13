import React from 'react';
//
import { useRoute } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Parlors from '../../components/Home/Parlors';
import Loader from '../../components/Shared/Loader';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorByIdQuery } from '../../Redux/Apis/vendorApis';
import { generateImageUrl } from '../../Redux/baseApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
interface IDetails {
  _id: string;
  logo: string | null;
  name: string;
  banner: string;
  address: {
    divisions: string;
    districts: string;
    unions: string;
    upazilas: string;
    street_address: string;
    _id: string;
  },
  business_category: string;
  business_sub_admins: [];
  email: string | null;
  phone: string;
  reviews: [];
  coordinates: [
    number,
    number
  ],
  total_rated: number;
  rating: number;
  owner: {
    name: string;
    email: string;
    phone: string;
    img: string;
    _id: string;
  },
  availability: {
    sunday: string[];
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string;
  }
  total_bookings: number;
  completed_bookings: number;
  ongoing_bookings: number;
  canceled_bookings: number;
}
const Details = () => {
  const params = useRoute().params as { id: string };
  const { themeColors } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetVendorByIdQuery(params.id);
  console.log(data)
  // Static data
  const shopDetails = data?.data as IDetails;
  // workerImages: [
  //   'https://placehold.co/400x400.png?text=worker 1',
  //   'https://placehold.co/400x400.png?text=worker 2',
  //   'https://placehold.co/400x400.png?text=worker 3',
  // ],
  const textColor = themeColors.constWhite as string;
  if (isLoading || isFetching) {
    return <Loader />
  }
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        },
      ]}>
      <Text
        style={[
          styles.shopName,
          {
            color: themeColors.black as string,
          },
        ]}>
        {shopDetails?.name}
      </Text>
      <Image source={{ uri: generateImageUrl(shopDetails?.banner) }} style={styles.shopImage} />

      <View
        style={[
          styles.ownerInfo,
          {
            backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
          },
        ]}>
        <Image
          source={{ uri: generateImageUrl(shopDetails?.owner?.img) }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerDetails}>
          <Text
            style={[
              styles.ownerName,
              {
                color: themeColors.black as string,
              },
            ]}>
            {shopDetails?.owner?.name}
          </Text>
          <Text
            style={[
              styles.ownerEmail,
              {
                color: themeColors.black as string,
              },
            ]}>
            {shopDetails?.owner?.email}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          {
            color: themeColors.black as string,
          },
        ]}>
        Total Workers: {shopDetails?.total_bookings}
      </Text>
      {/* 
      <FlatList
        data={shopDetails.business_sub_admins}
        horizontal
        renderItem={({ item }) => (
          <Image source={{ uri: generateImageUrl(item.img) }} style={styles.workerImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}

      {/* Booking Information */}
      <View style={styles.bookingInfo}>
        <Text
          style={{
            color: textColor,
          }}>
          Completed Booking: {shopDetails?.completed_bookings}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Ongoing Booking: {shopDetails?.ongoing_bookings}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Canceled Booking: {shopDetails?.canceled_bookings}
        </Text>
      </View>

      {/* Shop Timings */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Opening Hours
      </Text>
      <View style={styles.openDetails}>
        {Object.entries(shopDetails?.availability ? shopDetails?.availability : {})?.map((day, index) => {
          return (
            <Text
              key={index}
              style={[
                styles.openingTime,
                {
                  color: textColor,
                },
              ]}>
              {`${day[0]} - ${day[1].length > 0 ? `from ${day[1]?.[0]} to ${day[1]?.[1]}` : 'Closed'}`}
            </Text>
          )
        })}
      </View>
      {/* sevicess */}
      <Parlors horizontal={true} />
      {/* Rating & Review */}
      <View style={styles.ratingInfo}>
        <Text
          style={{
            color: textColor,
          }}>
          Total Rated: {shopDetails?.total_rated}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Total Rating: {shopDetails?.rating}
        </Text>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {/* <FlatList
          data={shopDetails.reviews}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.reviewCard,
                {
                  backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
                },
              ]}>
              <Image source={{ uri: item.owner.img }} style={styles.userImage} />
              <View style={styles.reviewContent}>
                <Text
                  style={[
                    styles.userName,
                    {
                      color: textColor,
                    },
                  ]}>
                  {item.userName}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.reviewText,
                    {
                      color: textColor,
                    },
                  ]}>
                  {item.review}
                </Text>
                <Text
                  style={[
                    styles.rating,
                    {
                      color: hexToRGBA(themeColors.yellow as string, 0.8),
                    },
                  ]}>
                  Rating: {item.rating} ★
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </View>

    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  shopImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  ownerInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerDetails: {
    justifyContent: 'center',
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ownerEmail: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  workerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  bookingInfo: {
    marginTop: 15,
    marginBottom: 15,
  },
  openDetails: {
    marginBottom: 20,
  },
  openingTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingInfo: {
    marginTop: 20,
    marginBottom: 100,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
    width: 300, // Adjust width for slider view
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewContent: {
    justifyContent: 'center',
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
    overflow: 'hidden',
  },
  rating: {
    fontSize: 14,
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: '#f39c12', // Gold color for the button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
