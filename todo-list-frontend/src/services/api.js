import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export default {
  getTodos() {
    return api.get('/todos')
  },

  getTodo(id) {
    return api.get(`/todos/${id}`)
  },

  createTodo(todo) {
    return api.post('/todos', { todo })
  },

  updateTodo(id, todo) {
    return api.put(`/todos/${id}`, { todo })
  },

  deleteTodo(id) {
    return api.delete(`/todos/${id}`)
  }
}
