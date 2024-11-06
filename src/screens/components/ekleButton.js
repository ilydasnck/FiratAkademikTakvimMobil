// components/EkleButton.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list'; // Kategori seçimi için

const EkleButton = ({setItems}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [categories, setCategories] = useState([]); // Kategori seçimi için state

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
    if (title && date && time && categories.length > 0) {
      const newEvent = {
        name: title,
        description: description,
        date,
        time,
        category: categories,
      };
      setItems(prevItems => {
        const updatedItems = {...prevItems}; // önceki etkinlikleri kopyala
        if (updatedItems[date]) {
          updatedItems[date].push(newEvent); // aynı tarih varsa yeni etkinliği ekle
        } else {
          updatedItems[date] = [newEvent]; // yeni tarih için etkinlik oluştur
        }
        return updatedItems; // güncellenmiş etkinlikleri döndür
      });

      // Alanları temizle
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setCategories([]);
      setModalVisible(false); // Modalı kapat
    } else {
      alert('Lütfen tüm alanları doldurun ve bir kategori seçin.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Etkinlik Ekle</Text>
      </TouchableOpacity>

      {/* Modal */}
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
            <Text>Saat:</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
            />

            {/* Kategori Seçimi */}
            <Text>Kategori Seçin:</Text>
            <MultipleSelectList
              setSelected={setCategories}
              data={categoryData}
              label="Kategori"
              save="value"
              placeholder="Kategori Seçin"
            />

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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#cf2525',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: 380,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: '#cf2525',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: 300,
    marginBottom: 50,
  },
  modalContainer: {
    alignItems: 'center',
    marginTop: 100,
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
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default EkleButton;
