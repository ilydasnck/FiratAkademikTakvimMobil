//components/calendar.js

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Agenda, LocaleConfig} from 'react-native-calendars';
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  dayNames: [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ],
  dayNamesShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'tr';

const calendar = props => {
  const {categories} = props;
  console.log('calendar.js', categories);

  const addEventToGoogleCalendar = item => {
    const title = encodeURIComponent(item.name);
    const details = encodeURIComponent(item.data);
    const startDate = '20241104T090000Z';
    const endDate = '20241104T100000Z';

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;

    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={{
          '2024-01-01': [{name: 'Yılbaşı', data: 'Tatil', category: 'Genel'}],
          '2024-03-11': [{name: 'Ramazan başlangıcı', category: 'Genel'}],
          '2024-04-09': [
            {name: 'Ramazan Bayramı Arifesi', data: 'Tatil', category: 'Genel'},
          ],
          '2024-04-10': [
            {name: 'Ramazan Bayramı 1. gün', data: 'Tatil', category: 'Genel'},
          ],
          '2024-11-06': [
            {name: 'Genel Kategorisi', data: 'Tatil', category: 'Genel'},
          ],
          '2024-11-07': [
            {name: 'Tıp Kategorisi', data: 'Tatil', category: 'Tıp Fakültesi'},
          ],
          '2024-11-08': [
            {
              name: 'Yaz Okulu Kategorisi',
              data: 'Tatil',
              category: 'Yaz Okulu',
            },
          ],
          '2024-10-29': [
            {name: 'Cumhuriyet Bayramı', data: 'Tatil', category: 'Genel'},
          ],
          '2024-10-30': [
            {
              name: 'Tıp Konferansı',
              data: 'İç Hastalıklar',
              category: 'Tıp Fakültesi',
            },
          ],
          '2024-12-31': [{name: 'Yılbaşı', data: 'Tatil', category: 'Genel'}],
        }}
        minDate={'2012-01-01'}
        maxDate={'2030-01-01'}
        renderItem={item => {
          // Display item only if its category is included in the categories prop
          if (categories.includes(item.category)) {
            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      item.category === 'Yaz Okulu'
                        ? 'lightyellow'
                        : item.category === 'Tıp Fakültesi'
                        ? 'lightgreen'
                        : 'lightblue',
                  },
                ]}
                onPress={() => addEventToGoogleCalendar(item)}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemData}>{item.data}</Text>
              </TouchableOpacity>
            );
          }
          return null; // Do not render if category does not match
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: winWidth,
    height: winHeight * 0.7,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemData: {
    fontSize: 15,
  },
  item: {
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
});

export default calendar;
