import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  

  function addGoalHandler(enteredGoalText)
  {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {text: enteredGoalText, 
    id: Math.random().toString()}]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setCourseGoals(currentCourseGoals=>{
      return currentCourseGoals.filter((goal)=> goal.id !== id);
    });

  }
  
  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#a065ec' onPress={startAddGoalHandler}></Button>
      <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}></GoalInput>
      <View style={styles.goalsContainer}>

      <FlatList data={courseGoals} renderItem={(itemData)=> {
        return <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler}
         id={itemData.item.id}></GoalItem>;
      }} 
      keyExtractor={(item,index)=>{
        return item.id;
      }
      }>
        
         </FlatList>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1,
    padding:50,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex:5
  }
 

});