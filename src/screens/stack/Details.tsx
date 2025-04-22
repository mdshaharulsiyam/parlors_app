import React, {useState} from 'react';
// 785669277913-bueehevd1kl1ea8q7s4765iq2iantk38.apps.googleusercontent.com
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
const Details = () => {
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
      {day: 'Monday', hours: '9AM-5PM'},
      {day: 'Tuesday', hours: '9AM-5PM'},
      {day: 'Wednesday', hours: '9AM-5PM'},
      {day: 'Thursday', hours: '9AM-5PM'},
      {day: 'Friday', hours: '9AM-5PM'},
      {day: 'Saturday', hours: '10AM-4PM'},
      {day: 'Sunday', hours: 'Closed'},
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
    console.log('Book button pressed!');
    // Add your navigation or booking logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.shopName}>{shopDetails.shopName}</Text>
      <Image source={{uri: shopDetails.shopImage}} style={styles.shopImage} />

      <View style={styles.ownerInfo}>
        <Image
          source={{uri: shopDetails.ownerImage}}
          style={styles.ownerImage}
        />
        <View style={styles.ownerDetails}>
          <Text style={styles.ownerName}>{shopDetails.ownerName}</Text>
          <Text style={styles.ownerEmail}>{shopDetails.ownerEmail}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Total Workers: {shopDetails.totalWorkers}
      </Text>

      {/* Worker Images Slider */}
      <Text style={styles.sectionTitle}>Workers</Text>
      <FlatList
        data={shopDetails.workerImages}
        horizontal
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.workerImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Booking Information */}
      <View style={styles.bookingInfo}>
        <Text>
          Total Booking Possible at a Time: {shopDetails.totalBooking}
        </Text>
        <Text>Completed Booking: {shopDetails.completedBooking}</Text>
        <Text>Ongoing Booking: {shopDetails.ongoingBooking}</Text>
        <Text>Canceled Booking: {shopDetails.canceledBooking}</Text>
      </View>

      {/* Shop Timings */}
      <Text style={styles.sectionTitle}>Opening Hours</Text>
      <View style={styles.openDetails}>
        {shopDetails.openDetails.map((day, index) => (
          <Text key={index} style={styles.openingTime}>
            {day.day} - {day.hours}
          </Text>
        ))}
      </View>

      {/* Rating & Review */}
      <View style={styles.ratingInfo}>
        <Text>Total Rated: {shopDetails.totalRated}</Text>
        <Text>Total Rating: {shopDetails.totalRating}</Text>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <FlatList
          data={shopDetails.reviews}
          horizontal
          renderItem={({item}) => (
            <View style={styles.reviewCard}>
              <Image source={{uri: item.userImage}} style={styles.userImage} />
              <View style={styles.reviewContent}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text numberOfLines={2} style={styles.reviewText}>
                  {item.review}
                </Text>
                <Text style={styles.rating}>Rating: {item.rating} ★</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Button title="Select Date" onPress={() => setOpen(true)} />
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
      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
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
    color: '#f39c12', // Golden color for rating
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
