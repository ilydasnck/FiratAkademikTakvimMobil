import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Calendar from '../components/calendar';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import EkleButton from '../components/ekleButton';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const index = () => {
  const [items, setItems] = useState({}); // Etkinlik verilerini tutan state

  const [categories, setCategories] = useState([]); // categories state'ini burada tanımladık

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

  // categories değiştiğinde konsolda güncel kategori listesini göstermek için useEffect kullanıyoruz
  useEffect(() => {
    console.log('Selected categories:', categories);
  }, [categories]);

  return (
    <View style={styles.container}>
      <View style={styles.selectListWrapper}>
        <View style={styles.box}>
          <Text style={styles.title}>Akademik Takvim</Text>
        </View>

        <MultipleSelectList
          style={styles.selectList}
          placeholder="Seçim yapın"
          searchPlaceholder="ara"
          label="Seçilenler"
          searchText="Ara"
          setSelected={val => setCategories(val)} // Burada setCategories kullanılıyor
          data={data}
          save="value"
          boxStyles={styles.boxStyles}
          search={true}
          inputPlaceholder="Kategori seçin" // Her zaman bu placeholder'ı gösterir
          dropdownTextStyles={styles.dropdownTextStyles}
          dropdownStyles={styles.dropdownStyles}
          badgeStyles={styles.badgeStyles}
        />
      </View>
      <Calendar categories={categories} style={styles.child1} />
      <EkleButton setItems={setItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child1: {},
  selectListWrapper: {
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectList: {
    width: winWidth * 0.8,
    backgroundColor: '#fff',
  },
  boxStyles: {
    width: winWidth * 0.9,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownTextStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
    fontWeight: '500',
  },
  dropdownStyles: {
    maxHeight: winHeight * 0.25,
    width: winWidth * 0.9,
  },
  inputStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
    fontWeight: '500',
  },
  badgeStyles: {
    backgroundColor: '#808080',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    color: 'white',
    fontSize: 14,
  },
});

export default index;
