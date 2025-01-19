import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// הגדרת headers ברירת מחדל
axios.defaults.headers['Content-Type'] = 'application/json';

// אם יש JWT ב-sessionStorage, הוסף אותו ל-header של כל בקשה
const token = sessionStorage.getItem('token');
if (token) {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

// interceptor לתפיסת שגיאות ב-response
axios.interceptors.response.use(
  (response) => response, // אם אין שגיאה, מחזירים את התגובה כרגיל
  (error) => {
    console.error('API Error:', error.response || error.message);
    if (error.response && error.response.status === 401) {
      // אם השגיאה היא 401, הפנה לדף התחברות אם לא בדף הרישום
      if (!token &&window.location.pathname !== '/signup'&& window.location.pathname !== '/') {
        window.location.href = '/'; // לדף התחברות
      }
    }
    return Promise.reject(error); // מחזירים את השגיאה הלאה
  }
);

const apiUrl = process.env.REACT_APP_API_URL;

export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/Items');
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error; // אתה יכול לטפל בשגיאה בצד הלקוח אם יש צורך
    }
  },

  addTask: async (name) => {
    const newTask = {
      name: name,
      isComplete: false
    };

    try {
      await axios.post('/Item', newTask);  // Send task data to the server
    } catch (error) {
      console.error("Error adding task:", error);
      throw error; // טיפול בשגיאה
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      await axios.put(`/Item/${id}?isComplete=${isComplete}`);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error; // טיפול בשגיאה
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/Item/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error; // טיפול בשגיאה
    }
  }
};