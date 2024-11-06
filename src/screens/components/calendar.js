import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import React from 'react';
import {Agenda, LocaleConfig} from 'react-native-calendars';

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

const calendar = () => {
  // Fonksiyon: Google Takvim'e yönlendir
  const addEventToGoogleCalendar = item => {
    const title = encodeURIComponent(item.name);
    const details = encodeURIComponent(item.data);
    const startDate = '20241104T090000Z'; // Başlangıç tarihi (örnek)
    const endDate = '20241104T100000Z'; // Bitiş tarihi (örnek)

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;

    // Google Takvim URL'sine yönlendirme
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.container}>
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
            {name: 'Tıp Kategorisi', data: 'Tatil', category: 'TipF'},
          ],
          '2024-11-08': [
            {name: 'Yaz Okulu Kategorisi', data: 'Tatil', category: 'YazOkulu'},
          ],

          '2024-10-29': [
            {
              name: 'Cumhuriyet Bayramı',
              data: 'Tatil',
              category: 'Genel',
            },
          ],
          '2024-10-30': [
            {
              name: 'Tıp Konferansı',
              data: 'İç Hastalıklar',
              category: 'TipF',
            },
          ],
          '2024-12-31': [
            {
              name: 'Yılbaşı',
              data: 'Tatil',
              category: 'Genel',
            },
          ],
        }}
        minDate={'2012-01-01'}
        maxDate={'2030-01-01'}
        renderItem={item => (
          <TouchableOpacity
            style={[
              styles.item,
              {
                backgroundColor:
                  item.category === 'YazOkulu'
                    ? 'lightyellow'
                    : item.category === 'TipF'
                    ? 'lightgreen'
                    : 'lightblue',
              },
            ]}
            onPress={() => addEventToGoogleCalendar(item)}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemData}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
