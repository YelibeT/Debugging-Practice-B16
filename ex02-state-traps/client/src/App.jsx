import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[App] Component mounted, fetching tasks...');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('[App] Fetching tasks from:', `${API_BASE}/tasks`);
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/tasks`);
      console.log('[App] Fetch response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[App] Received data:', data);

      setTasks(data.tasks);
      console.log('[App] Tasks set to state');
    } catch (err) {
      console.error('[App] Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    console.log('[App] Toggling task:', taskId);

    // BUG: Mutating state directly instead of creating new array
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setTasks(tasks); // This won't trigger re-render properly
      console.log('[App] Task toggled in state (buggy)');
    }

    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task');
      }

      console.log('[App] Task toggled on server');
    } catch (err) {
      console.error('[App] Error toggling task:', err);
      setError(err.message);
      // Should revert the optimistic update here, but won't work due to mutation bug
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log('[App] Deleting task:', taskId);

    // BUG: Stale closure - this captures the current tasks value
    // If this is called multiple times quickly, it can cause issues
    setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        console.log('[App] Task deleted on server');

        // BUG: Using stale tasks value from closure
        setTasks(tasks.filter(t => t.id !== taskId));
      } catch (err) {
        console.error('[App] Error deleting task:', err);
        setError(err.message);
      }
    }, 100); // Artificial delay to expose the stale closure bug
  };

  // BUG: Missing event.preventDefault() - will cause page refresh on form submit
  const handleAddTask = async (event) => {
    // event.preventDefault(); // Missing!

    console.log('[App] Adding new task, text:', newTaskText);

    if (!newTaskText.trim()) {
      console.warn('[App] Task text is empty, not submitting');
      return;
    }

    try {
      console.log('[App] POST request to:', `${API_BASE}/tasks`);
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newTaskText,
          priority: newTaskPriority,
        }),
      });

      console.log('[App] POST response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add task');
      }

      const data = await response.json();
      console.log('[App] New task created:', data.task);

      // Update local state
      setTasks([...tasks, data.task]);
      setNewTaskText('');
      setNewTaskPriority('medium');
      console.log('[App] Task added to local state');
    } catch (err) {
      console.error('[App] Error adding task:', err);
      setError(err.message);
    }
  };

  // Derived state: filtered tasks
  // BUG: Incorrect filtering logic - will show wrong tasks for some filters
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.completed; // Wrong! Should be !task.completed
    if (filter === 'completed') return !task.completed; // Wrong! Should be task.completed
    return true;
  });

  // Derived state: counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <div className="container">
        <h1>Exercise 02 - Task Manager</h1>
        <p className="loading">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Exercise 02 - Task Manager</h1>

      <div className="stats">
        <div className="stat">
          Total: <strong>{totalTasks}</strong>
        </div>
        <div className="stat">
          Active: <strong>{activeTasks}</strong>
        </div>
        <div className="stat">
          Completed: <strong>{completedTasks}</strong>
        </div>
      </div>

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => {
            console.log('[App] Filter changed to: all');
            setFilter('all');
          }}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => {
            console.log('[App] Filter changed to: active');
            setFilter('active');
          }}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => {
            console.log('[App] Filter changed to: completed');
            setFilter('completed');
          }}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              // BUG: Wrong prop name - component expects onToggle but passing handleToggle
              handleToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </ul>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Enter task description"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default App
