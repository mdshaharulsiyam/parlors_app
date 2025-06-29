import React, { useState } from 'react';
//
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import GradientButton from '../../components/Shared/GradientButton';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
const Details = () => {
  const { themeColors } = useGlobalContext();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // Static data
  const shopDetails = {
    id: '1',
    shopName: 'My Amazing Shop',
    shopImage: 'https://placehold.co/400x400.png?text=Shop+Name',
    totalWorkers: 10,
    ownerName: 'John Doe',
    ownerEmail: 'johndoe@example.com',
    ownerImage: 'https://placehold.co/400x400.png?text=shop owner',
    workerImages: [
      'https://placehold.co/400x400.png?text=worker 1',
      'https://placehold.co/400x400.png?text=worker 2',
      'https://placehold.co/400x400.png?text=worker 3',
    ],
    totalBooking: 50,
    openDetails: [
      { day: 'Monday', hours: '9AM-5PM' },
      { day: 'Tuesday', hours: '9AM-5PM' },
      { day: 'Wednesday', hours: '9AM-5PM' },
      { day: 'Thursday', hours: '9AM-5PM' },
      { day: 'Friday', hours: '9AM-5PM' },
      { day: 'Saturday', hours: '10AM-4PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    completedBooking: 20,
    ongoingBooking: 15,
    canceledBooking: 5,
    totalRated: 100,
    totalRating: 4.5,
    reviews: [
      {
        userImage: 'https://placehold.co/100x100.png?text=user1',
        userName: 'Alice Smith',
        rating: 5,
        review: 'Amazing service! Highly recommend this place!',
      },
      {
        userImage: 'https://placehold.co/100x100.png?text=user2',
        userName: 'Bob Johnson',
        rating: 4,
        review: 'Great experience, but could improve the waiting time.',
      },
      {
        userImage: 'https://placehold.co/100x100.png?text=user3',
        userName: 'Charlie Brown',
        rating: 4.5,
        review: 'Friendly staff and nice ambiance.',
      },
    ],
  };

  // Handle book button press
  const handleBookPress = () => {
    //console.log('Book button pressed!');
    // Add your navigation or booking logic here
  };
  const textColor = themeColors.black as string;
  return (
    <ScrollView style={[styles.container, {
      backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
    }]}>
      <Text style={[styles.shopName, {
        color: themeColors.black as string,
      }]}>{shopDetails.shopName}</Text>
      <Image source={{ uri: shopDetails.shopImage }} style={styles.shopImage} />

      <View style={[styles.ownerInfo, {
        backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
      }]}>
        <Image
          source={{ uri: shopDetails.ownerImage }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerDetails}>
          <Text style={[styles.ownerName, {
            color: themeColors.black as string,
          }]}>{shopDetails.ownerName}</Text>
          <Text style={[styles.ownerEmail, {
            color: themeColors.black as string,
          }]}>{shopDetails.ownerEmail}</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {
        color: themeColors.black as string,
      }]}>
        Total Workers: {shopDetails.totalWorkers}
      </Text>

      {/* Worker Images Slider */}
      <Text style={[styles.sectionTitle, {
        color: themeColors.black as string,
      }]}>Workers</Text>
      <FlatList
        data={shopDetails.workerImages}
        horizontal
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.workerImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Booking Information */}
      <View style={styles.bookingInfo}>
        <Text style={{
          color: textColor
        }}>
          Total Booking Possible at a Time: {[shopDetails.totalBooking]}
        </Text>
        <Text style={{
          color: textColor
        }}>Completed Booking: {shopDetails.completedBooking}</Text>
        <Text style={{
          color: textColor
        }}>Ongoing Booking: {shopDetails.ongoingBooking}</Text>
        <Text style={{
          color: textColor
        }}>Canceled Booking: {shopDetails.canceledBooking}</Text>
      </View>

      {/* Shop Timings */}
      <Text style={[styles.sectionTitle, { color: textColor }]}>Opening Hours</Text>
      <View style={styles.openDetails}>
        {shopDetails.openDetails.map((day, index) => (
          <Text key={index} style={[styles.openingTime, {
            color: textColor
          }]}>
            {day.day} - {day.hours}
          </Text>
        ))}
      </View>

      {/* Rating & Review */}
      <View style={styles.ratingInfo}>
        <Text style={{
          color: textColor
        }}>Total Rated: {shopDetails.totalRated}</Text>
        <Text style={{
          color: textColor
        }}>Total Rating: {shopDetails.totalRating}</Text>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <FlatList
          data={shopDetails.reviews}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20
          }}
          renderItem={({ item }) => (
            <View style={[styles.reviewCard, {
              backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
            }]}>
              <Image source={{ uri: item.userImage }} style={styles.userImage} />
              <View style={styles.reviewContent}>
                <Text style={[styles.userName, {
                  color: textColor
                }]}>{item.userName}</Text>
                <Text numberOfLines={2} style={[styles.reviewText, {
                  color: textColor
                }]}>
                  {item.review}
                </Text>
                <Text style={[styles.rating, {
                  color: hexToRGBA(themeColors.yellow as string, 0.8)
                }]}>Rating: {item.rating} ★</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ flexDirection: "column", gap: 10, marginBottom: 70 }}>
        <GradientButton handler={() => setOpen(true)}>
          <Text style={{
            color: textColor,
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
          }}>
            Select Date
          </Text>
        </GradientButton>
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
          <Text style={{
            color: textColor,
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
          }}>
            Book Now
          </Text>
        </GradientButton>
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
    borderRadius: 5
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
