import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Item from '../../components/item';
import AddButton from '../../components/AddButton';
import LoggedUser from '../../components/LoggedUser';
import UpdateTask from '../../components/UpdateTask';

interface Tarefa {
  id: string;
  titulo: string;
}

const Page = () => {
  const user = auth().currentUser;

  const [currentScreen, setCurrentScreen] = useState<'list' | 'update'>('list');
  const [taskToEdit, setTaskToEdit] = useState<Tarefa | null>(null);

  const tarefas: Tarefa[] = [
    { id: '1', titulo: "Tarefa 001" },
    { id: '2', titulo: "Tarefa 002" },
    { id: '3', titulo: "Tarefa 003" },
  ];

  const handleEdit = (tarefa: Tarefa) => {
    setTaskToEdit(tarefa);
    setCurrentScreen('update');
  };

  const handleDelete = (tarefa: Tarefa) => {
    Alert.alert('Excluir', `Deseja excluir ${tarefa.titulo}?`);
    // Aqui você colocaria o código real para excluir no Firebase
  };

  const handleBack = () => {
    setCurrentScreen('list');
    setTaskToEdit(null);
  };

  if (currentScreen === 'update' && taskToEdit) {
    return (
      <UpdateTask
        taskId={taskToEdit.id}
        currentTitle={taskToEdit.titulo}
        onBack={handleBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Bem vindo {user?.email}</Text>
      <LoggedUser />
      <Item
        data={tarefas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddButton onPress={() => Alert.alert('Adicionar', 'Nova Tarefa')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});

export default Page;
