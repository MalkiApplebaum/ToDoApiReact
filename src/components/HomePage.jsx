import React, { useEffect, useState } from 'react';
import service from './service.js';
import './HomePage.css'; // ייבוא קובץ ה-CSS

function HomePage() {
  const [newTodo, setNewTodo] = useState("");  // מצביע על המצב של הקלט
  const [todos, setTodos] = useState([]);  // מצביע על רשימת המשימות

  // פונקציה שמביאה את כל המשימות מה-API
  async function getTodos() {
    try {
      const todos = await service.getTasks();
      if (Array.isArray(todos)) {
        setTodos(todos);  // אם התשובה היא מערך, הגדר אותה בסטייט
      } else {
        console.error("The response is not an array:", todos);
        setTodos([]);  // אם התשובה אינה מערך, הגדר מערך ריק
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTodos([]);  // אם קרתה שגיאה בעת שליפת הנתונים, הגדר מערך ריק
    }
  }

  // פונקציה שמבצעת את פעולת היצירה של משימה חדשה
  async function createTodo(e) {
    e.preventDefault();  // מונע את ההתנהגות ברירת המחדל של שליחת הטופס

    // אם השדה ריק, מציג הודעה
    if (newTodo.trim() === "") {
      alert("Please enter a task.");
      return;  // מפסיק את הפעולה אם אין שם
    }

    // שולח את המשימה החדשה לשרת
    await service.addTask(newTodo);
    setNewTodo("");  // מנקה את השדה אחרי שליחת המשימה
    await getTodos();  // מחדש את רשימת המשימות
  }

  // פונקציה לעדכון הסטטוס של המשימה (האם היא הושלמה או לא)
  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();  // מחדש את רשימת המשימות
  }

  // פונקציה למחיקת משימה
  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();  // מחדש את רשימת המשימות
  }

  // קריאה ל-API בזמן עליית הרכיב
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input 
            className="new-todo" 
            placeholder="Enter your new task" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
        </form>
      </header>

      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map(todo => (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={todo.isComplete} 
                    onChange={(e) => updateCompleted(todo, e.target.checked)} 
                  />
                  <label>{todo.name}</label>
                  <button 
                    className="destroy" 
                    onClick={() => deleteTodo(todo.id)}
                  ></button>
                </div>
              </li>
            ))
          ) : (
            <li className="no-tasks">No tasks available.</li>  // אם אין משימות, מציג הודעה
          )}
        </ul>
      </section>
    </section>
  );
}

export default HomePage;
