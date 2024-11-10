import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const EkleButton = ({setItems}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

  const categoryData = [
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

  const addEvent = () => {
    if (title && date && categories.length > 0) {
      const newEvent = {
        name: title,
        description,
        category: categories[0],
      };
      setItems(prevItems => {
        const updatedItems = {...prevItems};
        if (updatedItems[date]) {
          updatedItems[date].push(newEvent);
        } else {
          updatedItems[date] = [newEvent];
        }
        return updatedItems;
      });
      setTitle('');
      setDescription('');
      setDate('');
      setCategories([]);
      setModalVisible(false);
    } else {
      alert('Lütfen tüm alanları doldurun ve bir kategori seçin.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonKonum}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText2}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Başlık:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Etkinlik Başlığı"
            />
            <Text>Açıklama:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Açıklama"
            />
            <Text>Tarih:</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
            <Text>Kategori Seçin:</Text>
            <SelectList
              setSelected={setCategories}
              data={categoryData}
              save="value"
              placeholder="Kategori Seçin"
            />
            <View style={styles.yanyana}>
              <TouchableOpacity style={styles.button2} onPress={addEvent}>
                <Text style={styles.buttonText}>Etkinliği Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  yanyana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  button: {
    width: 60, // Kare yapmak için genişlik
    height: 60, // Kare yapmak için yükseklik
    backgroundColor: 'grey', // Arka plan rengi (isteğe bağlı)
    justifyContent: 'center', // Dikey merkezleme
    alignItems: 'center', // Yatay merkezleme
    borderRadius: 8, // Köşeleri yuvarlatmak için (isteğe bağlı)
  },
  buttonKonum: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '90%',
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    fontSize: 24, // Artı işaretinin boyutu
    color: '#fff', // Artı işaretinin rengi
    fontWeight: 'bold', // Artı işaretini kalın yapmak için
  },
  button2: {
    backgroundColor: '#cf2525',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EkleButton;
