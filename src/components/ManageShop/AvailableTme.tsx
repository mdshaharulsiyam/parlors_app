import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { commonStyles } from '../../utils/styles/Styles';

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
  const { themeColors } = useGlobalContext()
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
    setTimeout(() => setOpenToPicker(true), 300); // Optional: Automatically open "to" picker next
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
    <View style={[styles.container, {
      backgroundColor: themeColors.background
    }]}>
      <TouchableOpacity style={[commonStyles.Button, {
        backgroundColor: themeColors.green as string2,
        borderColor: themeColors.green as string2,
        marginBottom: 20
      }]} onPress={handleSelectSameTimeForAll}>
        <Text style={[commonStyles.ButtonText, {
          color: themeColors.green as string
        }]}>Set Same Time for All Days</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Availability</Text>

      {Object.entries(selectedTime).map(([day, time]) => (
        <View key={day} style={[styles.dayCard, {
          backgroundColor: themeColors.background,
          shadowColor: themeColors.black as string,
          borderColor: themeColors.white as string
        }]}>
          <View style={styles.dayHeader}>
            <BouncyCheckbox
              size={26}
              fillColor={themeColors.green as string}
              text={day.charAt(0).toUpperCase() + day.slice(1)}
              textStyle={[styles.dayText, { textDecorationLine: 'none', color: themeColors.black as string }]}
              isChecked={time.checked}
              onPress={() => handleCheckboxChange(day as keyof SelectedTime)}
              bounceEffect={1.3}
              iconStyle={{ borderColor: themeColors.green as string, borderRadius: 4 }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            />
          </View>

          {time.checked && (
            <View style={styles.timeButtonsContainer}>
              <TouchableOpacity
                style={[commonStyles.Button, {
                  backgroundColor: themeColors.green as string2,
                  borderColor: themeColors.green as string2
                }]}
                onPress={() => openFromTimePicker(day as keyof SelectedTime)}
              >
                <Text style={[
                  commonStyles.ButtonText,
                  {
                    color: themeColors.green as string
                  }
                ]}>
                  From: {time.from ? time.from.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.Button, {
                  backgroundColor: themeColors.green as string2,
                  borderColor: themeColors.green as string2
                }]}
                onPress={() => openToTimePicker(day as keyof SelectedTime)}
              >
                <Text style={[
                  commonStyles.ButtonText,
                  {
                    color: themeColors.green as string
                  }
                ]}>
                  To: {time.to ? time.to.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {/* Render single DatePickers outside of the loop */}
      {Platform.OS !== 'web' && currentDayForPicker && (
        <>
          <DatePicker
            modal
            open={openFromPicker}
            date={selectedTime[currentDayForPicker]?.from || new Date()}
            mode="time"
            onConfirm={handleFromTimeChange}
            onCancel={() => setOpenFromPicker(false)}
          />
          <DatePicker
            modal
            open={openToPicker}
            date={selectedTime[currentDayForPicker]?.to || new Date()}
            mode="time"
            onConfirm={handleToTimeChange}
            onCancel={() => setOpenToPicker(false)}
          />
        </>
      )}
    </View>
  );
};

export default AvailableTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  dayCard: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  dayHeader: {
    marginBottom: 15,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeButtonsContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },

});
