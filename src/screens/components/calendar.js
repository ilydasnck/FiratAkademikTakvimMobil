import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import React from 'react';
import {Agenda, LocaleConfig} from 'react-native-calendars';

const winWidth = Dimensions.get('window').width;

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
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

const Calendar = ({categories, items}) => {
  // Burada, kullanıcının seçtiği kategorilere göre etkinlikleri filtreliyoruz
  const filteredEvents = Object.keys(items).reduce((filtered, date) => {
    const eventsForDate = items[date].filter(
      event => categories.length === 0 || categories.includes(event.category),
    );
    if (eventsForDate.length > 0) {
      filtered[date] = eventsForDate;
    }
    return filtered;
  }, {});

  // Etkinliği Google Takvime eklemek için URL oluşturma
  const addEventToGoogleCalendar = item => {
    const title = encodeURIComponent(item.name);
    const details = encodeURIComponent(item.data);
    const startDate = '20241104T090000Z'; // örnek başlangıç tarihi
    const endDate = '20241104T100000Z'; // örnek bitiş tarihi

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <Agenda
      items={filteredEvents}
      renderItem={(item, firstItemInDay) => (
        <View>
          <TouchableOpacity
            style={[
              styles.item,
              {
                backgroundColor:
                  item.category === 'Genel'
                    ? '#a890f3'
                    : item.category === 'Tıp Fakültesi'
                    ? '#ed8bbb'
                    : item.category === 'Diş Hekimliği Fakültesi'
                    ? '#ffb981'
                    : item.category === 'Yaz Okulu'
                    ? '#c2f5a2'
                    : item.category ===
                      'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş'
                    ? '#90f3d9'
                    : item.category ===
                      'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş'
                    ? '#c6b3bd'
                    : 'lightblue',
              },
            ]}
            onPress={() => addEventToGoogleCalendar(item)}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemData}>{item.data}</Text>
          </TouchableOpacity>
        </View>
      )}
      renderEmptyData={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Etkinlik Yok</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;
