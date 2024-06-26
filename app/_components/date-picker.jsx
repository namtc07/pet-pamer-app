import { useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import SvgIcon from '@/assets/svgs';
import ButtonBlockCustom from './menu-tab-block';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  calendarTextStyle: {
    color: '#5A2828',
    fontFamily: 'ExoBold',
  },
  selectedTextStyle: {
    color: '#fff',
    fontFamily: 'bold',
  },
  schedule: {
    position: 'absolute',
    bottom: -20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

function DatePicker() {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateChange = (params) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

    const startDate = params?.startDate
      ? new Date(params.startDate)
      : undefined;
    const endDate = params?.endDate ? new Date(params.endDate) : undefined;

    if (startDate && startDate < today) {
      Alert.alert('Ngày bắt đầu không thể là ngày trong quá khứ');
      return;
    }

    if (endDate && endDate < today) {
      Alert.alert('Ngày kết thúc không thể là ngày trong quá khứ');
      return;
    }

    setRange({
      startDate: params?.startDate,
      endDate: params?.endDate,
    });
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={handleDateChange}
        calendarTextStyle={styles.calendarTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedItemColor="#FFBA69"
        timePickerIndicatorStyle={[styles.timePickerIndicatorStyle]}
      />
      <View style={styles.schedule}>
        <ButtonBlockCustom title="Schedule" icon={<SvgIcon.IconClock />} />
      </View>
    </View>
  );
}

export default DatePicker;
