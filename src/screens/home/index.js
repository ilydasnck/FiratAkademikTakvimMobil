import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Calendar from '../components/calendar';
import DropDownPicker from 'react-native-dropdown-picker';
import EkleButton from '../components/ekleButton';

const winWidth = Dimensions.get('window').width;

const Index = () => {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]); // categories bir dizi olarak tanımlandı
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    {label: 'Genel', value: 'Genel'},
    {label: 'Tıp Fakültesi', value: 'Tıp Fakültesi'},
    {label: 'Dis Hekimligi', value: 'Diş Hekimliği Fakültesi'},
    {label: 'Yaz Okulu', value: 'Yaz Okulu'},
    {
      label: 'KurumiciYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
      data: 'Başvurmayı unutma',
    },
    {
      label: 'KurumlararasıYatayGecis',
      value: 'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş',
    },
  ];

  useEffect(() => {
    // Burada, önceden kaydedilmiş etkinlikleri simüle ediyoruz.
    const existingEvents = {
      '2024-01-01': [
        {
          name: 'Tıp Fakültesi Etkinliği',
          category: 'Tıp Fakültesi',
          description: 'Tıp Fakültesi etkinliği açıklaması',
          data: 'Açıklama',
        },
      ],
      '2024-11-12': [
        {
          name: 'Tıp Fakültesi Etkinliği',
          category: 'Tıp Fakültesi',
          description: 'Tıp Fakültesi etkinliği açıklaması',
          data: 'Açıklama',
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
      '2024-11-17': [
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
        <View style={{width: '95%'}}>
          <DropDownPicker
            items={data} // items, label ve value içermeli
            open={isOpen}
            setOpen={setIsOpen}
            value={categories} // Kategoriler burada seçili değerler olacak
            setValue={setCategories} // Seçilen değerleri güncellemek için
            multiple={true} // Çoklu seçim aktif
            mode="BADGE"
            placeholder="Kategori seçin"
            showBadgeDot={false}
            dropdownTextStyles={styles.dropdownTextStyles}
            dropdownStyles={styles.dropdownStyles}
            boxStyles={styles.boxStyles}
            searchPlaceholder="Ara"
            showTickIcon={true}
            showArrowIcon={true}
            disableBorderRadius={false}
            autoScroll
            onChangeValue={value => setCategories(value)} // Seçilen kategorileri güncelle
            badgeColors={'grey'} // Seçilen kategorilere göre renkleri atama
            badgeTextStyle={{color: 'white'}}
          />
        </View>
      </View>
      <Calendar categories={categories} items={items} />
      <View style={{height: '15%'}}>
        <EkleButton setItems={setItems} style={{flex: 0.2}} />
      </View>
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
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#ddf',
  },
  dropdownTextStyles: {
    fontSize: winWidth * 0.04,
    color: '#333',
  },
  dropdownStyles: {
    maxHeight: 300,
    width: winWidth * 0.9,
  },
});

export default Index;
