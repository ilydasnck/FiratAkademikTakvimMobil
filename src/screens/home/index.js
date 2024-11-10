import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Calendar from '../components/calendar';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import EkleButton from '../components/ekleButton';

const winWidth = Dimensions.get('window').width;

const Index = () => {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]);

  const data = [
    {key: 'Genel', value: 'Genel'},
    {key: 'Tıp Fakültesi', value: 'Tıp Fakültesi'},
    {key: 'Dis Hekimligi', value: 'Diş Hekimliği Fakültesi'},
    {key: 'Yaz Okulu', value: 'Yaz Okulu'},
    {
      key: 'KurumiciYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
    },
    {
      key: 'KurumlararasıYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş',
    },
  ];

  useEffect(() => {
    // Burada, önceden kaydedilmiş etkinlikleri simüle ediyoruz.
    const existingEvents = {
      '2024-11-12': [
        {
          name: 'Tıp Fakültesi Etkinliği',
          category: 'Tıp Fakültesi',
          description: 'Tıp Fakültesi etkinliği açıklaması',
        },
      ],
      '2024-11-13': [
        {
          name: 'Yaz Okulu Etkinliği',
          category: 'Yaz Okulu',
          description: 'Yaz okulu etkinliği açıklaması',
        },
      ],
      '2024-11-14': [
        {
          name: 'Diş Hekimliği Konferans',
          description: 'Konferans',
          category: 'Diş Hekimliği Fakültesi',
        },
      ],
      '2024-11-15': [
        {
          name: 'Kurumiçi yatay geçiş başvuru',
          description: 'Başvuru',
          category: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
        },
      ],
      '2024-11-16': [
        {
          name: 'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş Başvuru',
          description: 'Başvuru',
          category:
            'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş',
        },
      ],
      '2024-11-16': [
        {
          name: 'Tatil',
          description: 'Genel',
          category: 'Genel',
        },
      ],
    };
    setItems(existingEvents);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.selectListWrapper}>
        <View style={styles.box}>
          <Text style={styles.title}>Akademik Takvim</Text>
        </View>
        <MultipleSelectList
          setSelected={val => setCategories(val)}
          data={data}
          save="value"
          search
          placeholder="Kategori seçin"
          badgeStyles={styles.badgeStyles}
          dropdownTextStyles={styles.dropdownTextStyles}
          dropdownStyles={styles.dropdownStyles}
          boxStyles={styles.boxStyles}
        />
      </View>
      <Calendar categories={categories} items={items} />
      <EkleButton setItems={setItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectListWrapper: {
    width: winWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#cf2525',
    width: winWidth,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  boxStyles: {
    width: winWidth * 0.9,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  dropdownTextStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
  },
  dropdownStyles: {
    maxHeight: 300,
    width: winWidth * 0.9,
  },
  badgeStyles: {
    backgroundColor: '#808080',
    paddingHorizontal: 12,
    borderRadius: 15,
    color: 'white',
  },
});

export default Index;
