import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';

const EkleButton = () => {
  // State tanımları
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [items, setItems] = useState({});

  // Etkinlik ekleme fonksiyonu
  const addEvent = () => {
    if (title && date && time) {
      const newEvent = {name: title, data: description, category: 'Genel'};
      setItems(prevItems => {
        const updatedItems = {...prevItems};
        if (updatedItems[date]) {
          updatedItems[date].push(newEvent);
        } else {
          updatedItems[date] = [newEvent];
        }
        return updatedItems;
      });

      // Alanları temizle
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setModalVisible(false); // Modalı kapat
    } else {
      alert('Lütfen tüm alanları doldurun.');
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
            <TouchableOpacity style={styles.button2} onPress={() => addEvent}>
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
    marginTop: 20,
  },
  modalContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
});

export default EkleButton;
