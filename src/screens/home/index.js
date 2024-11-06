//home/index.js

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Calendar from '../components/calendar';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import EkleButton from '../components/ekleButton';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const index = () => {
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

  // categories değiştiğinde konsolda güncel kategori listesini göstermek için useEffect kullanıyoruz
  useEffect(() => {
    console.log('Selected categories:', categories);
  }, [categories]);

  return (
    <View style={styles.container}>
      <View style={styles.selectListWrapper}>
        <MultipleSelectList
          style={styles.selectList}
          setSelected={val => setCategories(val)}
          data={data}
          save="value"
          boxStyles={styles.boxStyles}
          search={true}
          inputPlaceholder="Kategori seçin" // Her zaman bu placeholderı gösterir
          inputStyles={styles.inputStyles} // Varsayılan olarak bir placeholder gösterir
          dropdownTextStyles={styles.dropdownTextStyles}
          dropdownStyles={styles.dropdownStyles}
        />
      </View>
      <Calendar categories={categories} style={styles.child1} />
      <EkleButton />
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
    marginVertical: winWidth * 0.05,
  },
  selectList: {
    width: winWidth * 0.8,
    backgroundColor: '#fff',
  },
  boxStyles: {
    width: winWidth * 0.8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  dropdownTextStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
    fontWeight: '500',
  },
  dropdownStyles: {
    maxHeight: winHeight * 0.25,
    width: winWidth * 0.8,
  },
  inputStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
    fontWeight: '500',
  },
});

export default index;
