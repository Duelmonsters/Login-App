import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface UpdateTaskProps {
  taskId: string;
  currentTitle: string;
  onBack: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ taskId, currentTitle, onBack }) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleUpdate = async () => {
    if (newTitle.trim() === '') {
      Alert.alert('Erro', 'O título da tarefa não pode estar vazio.');
      return;
    }

    try {
      await firestore().collection('tarefas').doc(taskId).update({
        titulo: newTitle,
      });

      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
      onBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar a tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Tarefa</Text>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder="Digite o novo título"
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
      <Button title="Cancelar" onPress={onBack} color="#888" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default UpdateTask;
