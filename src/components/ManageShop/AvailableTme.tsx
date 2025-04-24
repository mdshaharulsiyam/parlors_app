import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';

interface Time {
  checked: boolean;
  from: Date | null;
  to: Date | null;
}

interface SelectedTime {
  friday: Time;
  saturday: Time;
  sunday: Time;
  monday: Time;
  tuesday: Time;
  wednesday: Time;
  thursday: Time;
}

const AvailableTime: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    friday: { checked: false, from: null, to: null },
    saturday: { checked: false, from: null, to: null },
    sunday: { checked: false, from: null, to: null },
    monday: { checked: false, from: null, to: null },
    tuesday: { checked: false, from: null, to: null },
    wednesday: { checked: false, from: null, to: null },
    thursday: { checked: false, from: null, to: null },
  });

  const [openFromPicker, setOpenFromPicker] = useState(false);
  const [openToPicker, setOpenToPicker] = useState(false);
  const [currentDayForPicker, setCurrentDayForPicker] = useState<keyof SelectedTime | null>(null);

  const handleCheckboxChange = (day: keyof SelectedTime): void => {
    setSelectedTime((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], checked: !prevState[day].checked },
    }));
    if (!selectedTime[day].checked) {
      setCurrentDayForPicker(day);
      setOpenFromPicker(true);
    }
  };

  const handleSelectSameTimeForAll = (): void => {
    const { from, to } = selectedTime.friday;
    setSelectedTime((prevState) => {
      const updatedState: SelectedTime = { ...prevState };
      Object.keys(updatedState).forEach((day) => {
        updatedState[day as keyof SelectedTime] = { checked: true, from, to };
      });
      return updatedState;
    });
  };

  const handleFromTimeChange = (date: Date): void => {
    if (currentDayForPicker) {
      setSelectedTime((prevState) => ({
        ...prevState,
        [currentDayForPicker]: { ...prevState[currentDayForPicker], from: date },
      }));
    }
    setOpenFromPicker(false);
  };

  const handleToTimeChange = (date: Date): void => {
    if (currentDayForPicker) {
      setSelectedTime((prevState) => ({
        ...prevState,
        [currentDayForPicker]: { ...prevState[currentDayForPicker], to: date },
      }));
    }
    setOpenToPicker(false);
  };

  const openFromTimePicker = (day: keyof SelectedTime): void => {
    setCurrentDayForPicker(day);
    setOpenFromPicker(true);
  };

  const openToTimePicker = (day: keyof SelectedTime): void => {
    setCurrentDayForPicker(day);
    setOpenToPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sameTimeButton} onPress={handleSelectSameTimeForAll}>
        <Text style={styles.sameTimeButtonText}>Set Same Time for All Days</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Availability</Text>

      {Object.entries(selectedTime).map(([day, time]) => (
        <View key={day} style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <BouncyCheckbox
              size={22}
              fillColor="#2ecc71"
              // unfillColor="#fff"
              text={day.charAt(0).toUpperCase() + day.slice(1)}
              textStyle={styles.dayText}
              isChecked={time.checked}
              onPress={() => handleCheckboxChange(day as keyof SelectedTime)}
              bounceEffect={1.3}
              iconStyle={{ borderColor: '#ccc', borderRadius: 4 }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            />
          </View>

          {time.checked && (
            <View style={styles.timeButtonsContainer}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => openFromTimePicker(day as keyof SelectedTime)}
              >
                <Text style={styles.timeButtonText}>
                  From: {time.from ? time.from.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => openToTimePicker(day as keyof SelectedTime)}
              >
                <Text style={styles.timeButtonText}>
                  To: {time.to ? time.to.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Date Picker for "From" time */}
          {Platform.OS !== 'web' && (
            <DatePicker
              modal
              open={openFromPicker}
              date={selectedTime[day as keyof SelectedTime]?.from || new Date()}
              mode="time"
              // textColor="#333"
              // androidVariant="nativeAndroid"
              onConfirm={handleFromTimeChange}
              onCancel={() => setOpenFromPicker(false)}
            />
          )}

          {/* Date Picker for "To" time */}
          {Platform.OS !== 'web' && (
            <DatePicker
              modal
              open={openToPicker}
              date={selectedTime[day as keyof SelectedTime]?.to || new Date()}
              mode="time"
              // textColor="#333"
              // androidVariant="nativeAndroid"
              onConfirm={handleToTimeChange}
              onCancel={() => setOpenToPicker(false)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default AvailableTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  sameTimeButton: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#b2ebf2',
    alignItems: 'center',
  },
  sameTimeButtonText: {
    color: '#00bcd4',
    fontSize: 16,
    fontWeight: '500',
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dayHeader: {
    marginBottom: 15,
  },
  dayText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  timeButtonsContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});