<template>
  <div class="todo-list">
    <h1 class="title">Todo List</h1>

    <!-- Add Todo Form -->
    <form @submit.prevent="createTodo" class="todo-form">
      <input
        v-model="newTodo.title"
        placeholder="Todo title"
        required
        class="form-input"
      >
      <textarea
        v-model="newTodo.description"
        placeholder="Description"
        class="form-input"
      ></textarea>
      <button type="submit" class="submit-btn">Add Todo</button>
    </form>

    <!-- Todo List -->
    <div class="todos">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo)"
        >
        <div class="todo-content">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
        </div>
        <button @click="deleteTodo(todo.id)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const todos = ref([])
const newTodo = ref({
  title: '',
  description: '',
  completed: false
})

const fetchTodos = async () => {
  try {
    const response = await api.getTodos()
    todos.value = response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}

const createTodo = async () => {
  try {
    await api.createTodo(newTodo.value)
    // Reset form
    newTodo.value = {
      title: '',
      description: '',
      completed: false
    }
    // Refresh todo list
    await fetchTodos()
  } catch (error) {
    console.error('Error creating todo:', error)
    // Add error handling here if needed
  }
}

const toggleTodo = async (todo) => {
  try {
    await api.updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed
    })
    await fetchTodos()
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

const deleteTodo = async (id) => {
  try {
    await api.deleteTodo(id)
    await fetchTodos()
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

onMounted(() => {
  fetchTodos()
})
</script>

<style scoped>
.title {
  text-align: center;

}

.todo-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #45a049;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-content {
  flex: 1;
}

.todo-content h3 {
  margin: 0;
  font-size: 18px;
}

.todo-content p {
  margin: 5px 0 0;
  color: #666;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
