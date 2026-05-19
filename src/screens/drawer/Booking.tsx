import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {OtherIcons} from '../../constant/images';
import {hexToRGBA} from '../../utils/hexToRGBA';

type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'no-show'
  | 'cancelled';

type BookingItem = {
  id: string;
  reference: string;
  salon: string;
  service: string;
  worker: string;
  date: string;
  time: string;
  capacity: string;
  status: BookingStatus;
};

const bookings: BookingItem[] = [
  {
    id: '1',
    reference: 'PB-1048',
    salon: 'Shiny Cuts',
    service: 'Haircut and styling',
    worker: 'John Doe',
    date: 'May 20, 2026',
    time: '10:00 AM',
    capacity: '2 slots left',
    status: 'confirmed',
  },
  {
    id: '2',
    reference: 'PB-1049',
    salon: 'Glamour Hair Studio',
    service: 'Manicure',
    worker: 'Jane Smith',
    date: 'May 21, 2026',
    time: '11:30 AM',
    capacity: 'Full after this booking',
    status: 'pending',
  },
  {
    id: '3',
    reference: 'PB-1032',
    salon: 'Beauty Haven',
    service: 'Pedicure',
    worker: 'Emily Clark',
    date: 'May 14, 2026',
    time: '12:00 PM',
    capacity: 'Completed',
    status: 'completed',
  },
  {
    id: '4',
    reference: 'PB-1026',
    salon: 'Shiny Cuts',
    service: 'Facial',
    worker: 'Mike Johnson',
    date: 'May 12, 2026',
    time: '1:00 PM',
    capacity: 'Released for rebooking',
    status: 'cancelled',
  },
  {
    id: '5',
    reference: 'PB-1018',
    salon: 'Glamour Hair Studio',
    service: 'Massage',
    worker: 'Lisa Brown',
    date: 'May 8, 2026',
    time: '2:00 PM',
    capacity: 'Flagged for review',
    status: 'no-show',
  },
];

const filters: Array<'all' | BookingStatus> = [
  'all',
  'pending',
  'confirmed',
  'in-progress',
  'completed',
  'cancelled',
];

const statusColors: Record<BookingStatus, string> = {
  pending: '#D97706',
  confirmed: '#0F766E',
  'in-progress': '#2563EB',
  completed: '#16A34A',
  'no-show': '#7C2D12',
  cancelled: '#DC2626',
};

const Booking = () => {
  const [status, setStatus] = useState<'all' | BookingStatus>('all');
  const {themeColors} = useGlobalContext();
  const textColor = themeColors.black as string;
  const border = hexToRGBA(textColor, 0.08);
  const filteredBookings = useMemo(() => {
    if (status === 'all') return bookings;
    return bookings.filter(item => item.status === status);
  }, [status]);

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: themeColors.white as string}]}>
      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={[styles.summaryPanel, {borderColor: border}]}>
              <Text
                style={[
                  styles.eyebrow,
                  {color: themeColors.primary as string},
                ]}>
                Booking lifecycle
              </Text>
              <Text style={[styles.title, {color: textColor}]}>
                Upcoming slots, cancellation rules, and service history.
              </Text>
              <View style={styles.summaryRow}>
                <SummaryMetric label="Active" value="2" color={textColor} />
                <SummaryMetric
                  label="Reviews due"
                  value="1"
                  color={textColor}
                />
                <SummaryMetric label="Points" value="120" color={textColor} />
              </View>
            </View>
            <FlatList
              data={filters}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
              keyExtractor={item => item}
              renderItem={({item}) => {
                const active = item === status;
                return (
                  <TouchableOpacity
                    activeOpacity={0.78}
                    onPress={() => setStatus(item)}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: active
                          ? (themeColors.primary as string)
                          : hexToRGBA(textColor, 0.06),
                      },
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.filterText,
                        {color: active ? '#FFFFFF' : textColor},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        renderItem={({item}) => (
          <BookingCard item={item} textColor={textColor} border={border} />
        )}
      />
    </SafeAreaView>
  );
};

type SummaryMetricProps = {
  label: string;
  value: string;
  color: string;
};

const SummaryMetric = ({label, value, color}: SummaryMetricProps) => (
  <View style={styles.metric}>
    <Text style={[styles.metricValue, {color}]}>{value}</Text>
    <Text style={[styles.metricLabel, {color: hexToRGBA(color, 0.62)}]}>
      {label}
    </Text>
  </View>
);

type BookingCardProps = {
  item: BookingItem;
  textColor: string;
  border: string;
};

const BookingCard = ({item, textColor, border}: BookingCardProps) => {
  const statusColor = statusColors[item.status];
  return (
    <View style={[styles.card, {borderColor: border}]}>
      <View style={styles.cardTop}>
        <View style={styles.logoWrap}>
          <Image
            source={OtherIcons.Logo as ImageSourcePropType}
            style={styles.logo}
          />
        </View>
        <View style={styles.cardTitleWrap}>
          <Text numberOfLines={1} style={[styles.salon, {color: textColor}]}>
            {item.salon}
          </Text>
          <Text style={[styles.reference, {color: hexToRGBA(textColor, 0.56)}]}>
            {item.reference}
          </Text>
        </View>
        <View
          style={[
            styles.statusPill,
            {backgroundColor: hexToRGBA(statusColor, 0.12)},
          ]}>
          <Text style={[styles.statusText, {color: statusColor}]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailGrid}>
        <Detail label="Service" value={item.service} color={textColor} />
        <Detail label="Worker" value={item.worker} color={textColor} />
        <Detail label="Date" value={item.date} color={textColor} />
        <Detail label="Time" value={item.time} color={textColor} />
      </View>

      <View
        style={[
          styles.policyNote,
          {backgroundColor: hexToRGBA(textColor, 0.05)},
        ]}>
        <Text style={[styles.policyText, {color: hexToRGBA(textColor, 0.68)}]}>
          {item.capacity}. Free cancellation is available until 2 hours before
          the slot.
        </Text>
      </View>
    </View>
  );
};

type DetailProps = {
  label: string;
  value: string;
  color: string;
};

const Detail = ({label, value, color}: DetailProps) => (
  <View style={styles.detail}>
    <Text style={[styles.detailLabel, {color: hexToRGBA(color, 0.52)}]}>
      {label}
    </Text>
    <Text numberOfLines={1} style={[styles.detailValue, {color}]}>
      {value}
    </Text>
  </View>
);

export default Booking;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 96,
    gap: 12,
  },
  header: {
    gap: 14,
    marginBottom: 2,
  },
  summaryPanel: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    gap: 14,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metric: {
    flex: 1,
    minWidth: 0,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  filterRow: {
    gap: 8,
    paddingRight: 16,
  },
  filterButton: {
    height: 36,
    minWidth: 78,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  cardTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  salon: {
    fontSize: 16,
    fontWeight: '800',
  },
  reference: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '700',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detail: {
    width: '47%',
    minWidth: 0,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  detailValue: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '700',
  },
  policyNote: {
    borderRadius: 8,
    padding: 11,
  },
  policyText: {
    fontSize: 12,
    lineHeight: 17,
  },
});
