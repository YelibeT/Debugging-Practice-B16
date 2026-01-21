function TaskItem({ task, onToggle, onDelete }) {
  console.log('[TaskItem] Rendering task:', task.id);

  const handleCheckboxChange = () => {
    console.log('[TaskItem] Checkbox clicked for task:', task.id);
    // BUG: Component expects onToggle prop but App passes handleToggle
    // This will cause "onToggle is not a function" error
    onToggle(task.id);
  };

  const handleDelete = () => {
    console.log('[TaskItem] Delete clicked for task:', task.id);
    onDelete(task.id);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <span className="task-text">{task.text}</span>
      <span className={`priority-badge priority-${task.priority}`}>
        {task.priority}
      </span>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </li>
  );
}

export default TaskItem
