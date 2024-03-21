import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  FlatList,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  function taskInputHandler(enteredText) {
    setTask(enteredText);
  }

  function addTaskHandler() {
    console.log(task);
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        text: task,
        id: Math.random().toString(),
      },
    ]);
    setTask("");
  }

  function deleteTaskHandler(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tasks</Text>
        </View>
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type what you need to do..."
            value={task}
            onChangeText={taskInputHandler}
          />
          <Pressable style={styles.button} onPress={addTaskHandler}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        style={styles.listContainer}
        data={tasks}
        renderItem={(itemData) => {
          return (
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.taskItem, styles.pressedItem]
                  : styles.taskItem
              }
              onPress={() => deleteTaskHandler(itemData.item.id)}
            >
              <Text>{itemData.item.text}</Text>
            </Pressable>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3EAC0",
  },
  headContainer: {
    marginTop: 72,
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: "flex-start",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E2640",
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#DC9750",
    height: 42,
    width: 42,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F3EAC0",
  },
  input: {
    backgroundColor: "#FEF8DE",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    width: "80%",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 32,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  pressedItem: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
});
