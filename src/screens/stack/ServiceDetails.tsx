import React, { useState } from 'react';
//
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Empty from '../../components/Shared/Empty';
import GradientButton from '../../components/Shared/GradientButton';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetServiceByIdQuery } from '../../Redux/Apis/seviceListingApis';
import { generateImageUrl } from '../../Redux/baseApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
import splitTimeRangeByInterval from '../../utils/splitTimeRangeByInterval';
interface IServiceDetails {
  _id: string;
  name: string;
  img: string[];
  reviews: [];
  coordinates: [];
  total_rated: number;
  rating: number;
  business_details: {
    name: string;
    logo: string | null;
    _id: string;
    address: {
      divisions: string;
      districts: string;
      unions: string;
      upazilas: string;
      street_address: string;
      _id: string;
    },
    location: {
      type: string;
      coordinates: [number, number];
    },
    availability: {
      monday: string[];
      tuesday: string[];
      wednesday: string[];
      thursday: string[];
      friday: string[];
      saturday: string[];
      sunday: string[];
    },
  },
  estimated_time: string,
  services: string[],
  description: string,
  price: number,
  owner: {
    name: string;
    email: string;
    phone: string;
    _id: string;
    img: string | null;
  },
  total_bookings: number;
  completed_bookings: number;
  ongoing_bookings: number;
  canceled_bookings: number;
}
type IWeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const ServiceDetails = () => {
  const params = useRoute().params as { id: string };
  const { themeColors, width } = useGlobalContext();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [weekDay, setWeekDay] = useState<IWeekDay>(moment(date).format('dddd')?.toLowerCase() as IWeekDay);
  const { data, isLoading, isFetching } = useGetServiceByIdQuery(params?.id)
  const serviceDetails = data?.data as IServiceDetails;
  // Static data
  const [selectedImage, setSelectedImage] = useState(serviceDetails?.img[0]);
  // Handle book button press
  const handleBookPress = () => {
    //console.log('Book button pressed!');
    // Add your navigation or booking logic here
  };
  const textColor = themeColors.constWhite as string;
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
          styles.name,
          {
            color: themeColors.black as string,
          },
        ]}>
        {serviceDetails?.name}
      </Text>
      <Image source={{ uri: selectedImage }} style={styles.img} />
      <FlatList
        data={serviceDetails?.img}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image
              source={{ uri: item }}
              style={{
                width: 100,
                height: 100,
                margin: 5,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text
        style={[
          styles.sectionTitle,
          {
            color: themeColors.black as string,
          },
        ]}>
        Owner Details
      </Text>
      <View
        style={[
          styles.ownerInfo,
          {
            backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
          },
        ]}>
        <Image
          source={{ uri: generateImageUrl(serviceDetails?.owner?.img as string) }}
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
            {serviceDetails?.owner?.name}
          </Text>
          <Text
            style={[
              styles.ownerEmail,
              {
                color: themeColors.black as string,
              },
            ]}>
            {serviceDetails?.owner?.email}
          </Text>
        </View>
      </View>
      <View style={styles.bookingInfo}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: themeColors.black as string,
            },
          ]}>
          Service Details
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Services: {serviceDetails?.services?.join(', ')}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Price: {serviceDetails?.price}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Description: {serviceDetails?.description}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Estimated Time: {serviceDetails?.estimated_time ?? 0.5} hours
        </Text>
      </View>
      {/* Booking Information */}
      <View style={styles.bookingInfo}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: themeColors.black as string,
            },
          ]}>
          Booking Details
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Completed Booking: {serviceDetails?.completed_bookings}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Ongoing Booking: {serviceDetails?.ongoing_bookings}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Canceled Booking: {serviceDetails?.canceled_bookings}
        </Text>
      </View>

      {/* Shop Timings */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Available Times
      </Text>
      <View style={styles.openDetails}>
        {Object.entries(serviceDetails?.business_details?.availability ? serviceDetails?.business_details?.availability : {})?.map((day, index) => {
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

      {/* Rating & Review */}
      <View style={styles.ratingInfo}>
        <Text
          style={{
            color: textColor,
          }}>
          Total Rated: {serviceDetails?.total_rated}
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Total Rating: {serviceDetails?.rating}
        </Text>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Reviews</Text>
        <Empty data={data?.reviews?.length} />
        {/* <FlatList
          data={serviceDetails?.reviews}
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
              <Image source={{ uri: item.userImage }} style={styles.userImage} />
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
      <View style={{ flexDirection: 'column', gap: 10, marginBottom: 70 }}>
        <GradientButton handler={() => setOpen(true)}>
          <Text
            style={{
              color: textColor,
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Select Date
          </Text>
        </GradientButton>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={splitTimeRangeByInterval(serviceDetails?.business_details?.availability[weekDay], 0.5)}
          renderItem={({ item }) => {
            if (item === 'shop is closed') {
              return (
                <View style={{ flex: 1, gap: 10, justifyContent: 'center', alignItems: 'center', width: width - 40 }}>
                  <Empty data={false} />
                  <Text
                    style={{
                      color: themeColors.red as string,
                      textTransform: 'capitalize',
                      fontSize: 18,
                    }}>
                    No available time please select another date
                  </Text>
                </View>
              )
            }
            return (
              <GradientButton handler={() => { }}>
                <Text
                  style={{
                    color: textColor,
                  }}>
                  {item}
                </Text>
              </GradientButton>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <GradientButton handler={handleBookPress}>
          <Text
            style={{
              color: textColor,
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Book Now
          </Text>
        </GradientButton>
      </View>
    </ScrollView>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
    marginVertical: 0,
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
