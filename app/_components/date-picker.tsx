import dayjs from 'dayjs';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Svgs from '@/assets/svgs';
import MenuTabBlock from './menu-tab-block';

interface Range {
  startDate?: Date;
  endDate?: Date;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 6,
    marginBottom: 30,
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
  weekDaysTextStyle: {
    color: '#5A2828',
  },
});

function DatePicker() {
  const [range, setRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateChange = (params: any) => {
    setRange({
      startDate: params?.startDate,
      endDate: params?.endDate,
    });
  };

  const yesterday = dayjs().subtract(1, 'day').toDate();

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={handleDateChange}
        calendarTextStyle={styles.calendarTextStyle as any}
        selectedTextStyle={styles.selectedTextStyle as any}
        minDate={yesterday}
        selectedItemColor="#FFBA69"
        firstDayOfWeek={1}
        weekDaysTextStyle={styles.weekDaysTextStyle as any}
      />
      <View style={styles.schedule}>
        <MenuTabBlock title="Schedule" icon={<Svgs.IconClock />} />
      </View>
    </View>
  );
}

export default DatePicker;
