import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';

const EkleButton = ({setItems}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Date nesnesi olarak başlatıyoruz
  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
  const formatDate = date =>
    new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);

  const addEvent = () => {
    // Get the current date and remove the time part for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (date < today) {
      alert('Geçmiş bir tarihe etkinlik ekleyemezsiniz.');
      return; // Exit the function if the date is in the past
    }
    if (title && date && categories.length > 0) {
      const newEvent = {
        name: title,
        description,
        category: categories,
      };
      setItems(prevItems => {
        const updatedItems = {...prevItems};
        const dateString = date.toISOString().split('T')[0]; // Tarih formatını YYYY-MM-DD yapıyoruz
        if (updatedItems[dateString]) {
          updatedItems[dateString].push(newEvent);
        } else {
          updatedItems[dateString] = [newEvent];
        }
        return updatedItems;
      });
      setTitle('');
      setDescription('');
      setDate(new Date());
      setCategories([]);
      setModalVisible(false);
    } else {
      alert('Lütfen tüm alanları doldurun ve bir kategori seçin.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
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
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                value={date ? formatDate(date) : ''}
                editable={false}
                placeholder="Tarihi seçin"
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Text>Kategori Seçin:</Text>
            <SelectList
              style={styles.kategori}
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
    width: 60,
    height: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonKonum: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  kategori: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EkleButton;
