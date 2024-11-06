import React from 'react';
import {View, Text} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

const App = () => {
  const [categories, setCategories] = React.useState('Genel');

  const data = [
    {key: 'Genel', value: 'Genel'},
    {key: 'TipF', value: 'Tıp Fakültesi'},
    {key: 'DisHekimligiF', value: 'Diş Hekimliği Fakültesi'},
    {key: 'YazOkulu', value: 'Yaz Okulu'},
    {key: 'Lisansustu', value: 'LisansÜstü'},
    {
      key: 'KurumiciYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
    },
    {
      key: 'KurumlararasıYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş',
    },
    {
      key: 'MerkeziYerlestirmeYatayGecis',
      value:
        'Önlisasns ve Lisans Programlarına Merkezi Yerleştirme Puanı (ÖSYM) ile Yatay Geçiş',
    },
    {key: 'CiftveYandalP', value: 'Çift Anadal ve Yandal Programları'},
    {
      key: 'OzelOgrenci',
      value: 'Önlisans ve Lisans Programlarına Özel Öğrenci',
    },
  ];
  console.log(categories);

  return (
    <View style={{paddingHorizontal: 15, marginTop: 15}}>
      <MultipleSelectList
        setSelected={val => setCategories(val)}
        data={data}
        save="value"
        label="Seçilenler"
        boxStyles={{marginTop: 25}}
      />
    </View>
  );
};

export default App;
