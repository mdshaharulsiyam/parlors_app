import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { commonStyles } from '../../utils/styles/Styles';
import { IBooking } from '../../utils/types/Types';

const data: IBooking[] = [
  {
    _id: '1',
    parlor: 'Shiny Cuts',
    worker: 'John Doe',
    date: '2025-04-24',
    time: '10:00 AM',
    status: 'accepted',
    service: 'Haircut',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '2',
    parlor: 'Glamour Hair Studio',
    worker: 'Jane Smith',
    date: '2025-04-24',
    time: '11:00 AM',
    status: 'pending',
    service: 'Manicure',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '3',
    parlor: 'Beauty Haven',
    worker: 'Emily Clark',
    date: '2025-04-24',
    time: '12:00 PM',
    status: 'complete',
    service: 'Pedicure',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '4',
    parlor: 'Shiny Cuts',
    worker: 'Mike Johnson',
    date: '2025-04-24',
    time: '1:00 PM',
    status: 'accepted',
    service: 'Facial',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '5',
    parlor: 'Glamour Hair Studio',
    worker: 'Lisa Brown',
    date: '2025-04-24',
    time: '2:00 PM',
    status: 'canceled',
    service: 'Massage',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '6',
    parlor: 'Beauty Haven',
    worker: 'Karen Lee',
    date: '2025-04-24',
    time: '3:00 PM',
    status: 'accepted',
    service: 'Haircut',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '7',
    parlor: 'Shiny Cuts',
    worker: 'John Doe',
    date: '2025-04-25',
    time: '9:00 AM',
    status: 'complete',
    service: 'Manicure',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '8',
    parlor: 'Beauty Haven',
    worker: 'Emily Clark',
    date: '2025-04-25',
    time: '10:00 AM',
    status: 'pending',
    service: 'Pedicure',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '9',
    parlor: 'Glamour Hair Studio',
    worker: 'Jane Smith',
    date: '2025-04-25',
    time: '11:00 AM',
    status: 'accepted',
    service: 'Facial',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '10',
    parlor: 'Shiny Cuts',
    worker: 'Mike Johnson',
    date: '2025-04-25',
    time: '12:00 PM',
    status: 'canceled',
    service: 'Massage',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '11',
    parlor: 'Beauty Haven',
    worker: 'Karen Lee',
    date: '2025-04-25',
    time: '1:00 PM',
    status: 'complete',
    service: 'Haircut',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '12',
    parlor: 'Glamour Hair Studio',
    worker: 'Lisa Brown',
    date: '2025-04-25',
    time: '2:00 PM',
    status: 'pending',
    service: 'Manicure',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '13',
    parlor: 'Shiny Cuts',
    worker: 'John Doe',
    date: '2025-04-26',
    time: '9:00 AM',
    status: 'accepted',
    service: 'Pedicure',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '14',
    parlor: 'Beauty Haven',
    worker: 'Emily Clark',
    date: '2025-04-26',
    time: '10:00 AM',
    status: 'canceled',
    service: 'Facial',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '15',
    parlor: 'Glamour Hair Studio',
    worker: 'Jane Smith',
    date: '2025-04-26',
    time: '11:00 AM',
    status: 'complete',
    service: 'Massage',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '16',
    parlor: 'Shiny Cuts',
    worker: 'Mike Johnson',
    date: '2025-04-26',
    time: '12:00 PM',
    status: 'accepted',
    service: 'Haircut',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '17',
    parlor: 'Beauty Haven',
    worker: 'Karen Lee',
    date: '2025-04-26',
    time: '1:00 PM',
    status: 'pending',
    service: 'Manicure',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
  {
    _id: '18',
    parlor: 'Glamour Hair Studio',
    worker: 'Lisa Brown',
    date: '2025-04-26',
    time: '2:00 PM',
    status: 'accepted',
    service: 'Pedicure',
    parlorImage: 'https://via.placeholder.com/150?text=Glamour+Hair+Studio', // Placeholder image
  },
  {
    _id: '19',
    parlor: 'Shiny Cuts',
    worker: 'John Doe',
    date: '2025-04-27',
    time: '9:00 AM',
    status: 'canceled',
    service: 'Facial',
    parlorImage: 'https://via.placeholder.com/150?text=Shiny+Cuts', // Placeholder image
  },
  {
    _id: '20',
    parlor: 'Beauty Haven',
    worker: 'Emily Clark',
    date: '2025-04-27',
    time: '10:00 AM',
    status: 'complete',
    service: 'Massage',
    parlorImage: 'https://via.placeholder.com/150?text=Beauty+Haven', // Placeholder image
  },
];
const allStatus = ['pending', 'complete', 'accepted', 'canceled'];

const Booking = () => {
  const [status, setStatus] = useState<string>(allStatus[0]);
  const { themeColors } = useGlobalContext();
  const black = themeColors.black as string;
  const white = themeColors.white as string;
  const primary = themeColors.primary as string;
  const yellow = themeColors.yellow as string;
  const red = themeColors.red as string;
  const green = themeColors.green as string;
  return (
    <View style={{
      backgroundColor: hexToRGBA(white, 0.95),
      paddingHorizontal: 10
    }}>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <Text
              style={{
                color: black,
                fontWeight: '600',
                fontSize: 20,
                textTransform: 'capitalize',
                marginTop: 5,
                marginBottom: 10,
              }}>
              {status} Bookings
            </Text>
            <FlatList
              data={allStatus}
              horizontal
              contentContainerStyle={{
                gap: 5,
                marginVertical: 8,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setStatus(item)}
                  activeOpacity={0.7}
                  style={[
                    commonStyles.Button,
                    {
                      backgroundColor:
                        item == status
                          ? primary
                          : yellow,
                      borderRadius: 3,
                    }]}
                  key={item}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      color: black,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )
        }
        contentContainerStyle={{
          padding: 5,
        }}
        data={data?.filter(item => item?.status == status)}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => (
          <View style={[styles.card, {
            backgroundColor: hexToRGBA(black, 0.1),
          }]}>
            {/* Parlor Image */}
            <Image source={{ uri: item.parlorImage }} style={styles.image} />

            {/* Booking Details */}
            <View style={[styles.detailsContainer]}>
              <Text style={[styles.parlor, {
                color: hexToRGBA(black, 0.9),
              }]}>{item.parlor}</Text>
              <Text style={[styles.worker, {
                color: hexToRGBA(black, 0.7),
              }]}>Worker: {item.worker}</Text>
              <Text style={[styles.date, {
                color: hexToRGBA(black, 0.7),
              }]}>Date: {item.date}</Text>
              <Text style={[styles.time, {
                color: hexToRGBA(black, 0.7),
              }]}>Time: {item.time}</Text>
              <Text style={[styles.status, {
                color: item.status == 'canceled' ? red : item.status == 'pending' ? yellow : item.status == 'accepted' ? primary : green,
              }]}>
                Status: {item.status}
              </Text>
              <Text style={[styles.service, {
                color: hexToRGBA(black, 0.7),
              }]}>Service: {item.service}</Text>
            </View>
          </View>
        )}
      />
    </View >
  );
};

export default Booking;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 30,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  parlor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  worker: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  service: {
    fontSize: 16,
    color: '#444',
    marginTop: 5,
  },
  // Status styles (conditional styling based on status)
  accepted: {
    color: '#00b300', // Green for accepted
  },
  pending: {
    color: '#ffcc00', // Yellow for pending
  },
  canceled: {
    color: '#ff3333', // Red for canceled
  },
  complete: {
    color: '#3399ff', // Blue for complete
  },
});
