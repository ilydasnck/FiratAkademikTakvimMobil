import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Calendar from '../components/calendar';
import DropDownPicker from 'react-native-dropdown-picker';
import EkleButton from '../components/ekleButton';

const winWidth = Dimensions.get('window').width;

const Index = () => {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Başlangıçta dropdown kapalı

  const handleOutsidePress = () => {
    if (isOpen) {
      setIsOpen(false); // Dropdown'u kapat
    }
  };

  const data = [
    {label: 'Genel', value: 'Genel'},
    {label: 'Tıp Fakültesi', value: 'Tıp Fakültesi'},
    {label: 'Dis Hekimliği Fakültesi', value: 'Diş Hekimliği Fakültesi'},
    {label: 'Yaz Okulu', value: 'Yaz Okulu'},
    {
      label: 'Kurumiçi Yatay Geçiş',
      value: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
      data: 'Başvurmayı unutma',
    },
    {
      label: 'Kurumlararası Yatay Geçiş',
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
      '2024-12-12': [
        {
          name: 'Tıp Fakültesi Etkinliği',
          category: 'Tıp Fakültesi',
          description: 'Tıp Fakültesi etkinliği açıklaması',
          data: 'Açıklama',
        },
      ],
      '2024-12-13': [
        {
          name: 'Yaz Okulu Etkinliği',
          category: 'Yaz Okulu',
          description: 'Yaz okulu etkinliği açıklaması',
        },
      ],
      '2024-12-14': [
        {
          name: 'Diş Hekimliği Konferans',
          description: 'Konferans',
          category: 'Diş Hekimliği Fakültesi',
        },
      ],
      '2024-12-15': [
        {
          name: 'Kurumiçi yatay geçiş başvuru',
          description: 'Başvuru',
          category: 'Önlisans ve Lisans Programlarına Kurumiçi Yatay Geçiş',
        },
      ],
      '2024-12-16': [
        {
          name: 'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş Başvuru',
          description: 'Başvuru',
          category:
            'Önlisans ve Lisans Programlarına Kurumlararası Yatay Geçiş',
        },
      ],
      '2024-12-17': [
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
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <View style={styles.selectListWrapper}>
            <View style={styles.box}>
              <Text style={styles.title}>Akademik Takvim</Text>
            </View>
            <View style={{width: '95%'}}>
              <DropDownPicker
                items={data}
                open={isOpen}
                setOpen={setIsOpen}
                value={categories}
                setValue={setCategories}
                multiple={true}
                placeholder="Kategori seçin"
                mode="BADGE"
                badgeColors="grey"
                showBadgeDot={false}
                badgeTextStyle={{color: 'white'}}
                closeOnBlur={false}
                style={styles.dropdownStyles}
                onChangeValue={value => setCategories(value)}
                dropDownContainerStyle={{
                  borderColor: '#ddd',
                }}
              />
            </View>
          </View>
          <Calendar categories={categories} items={items} />
          <View style={{height: '15%'}}>
            <EkleButton setItems={setItems} style={{flex: 0.2}} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  dropdownStyles: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
});

export default Index;
