import React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';
import guid from 'guid';
import storage from 'safe-localstorage';
import Task from './Task';

const Tasks = ({
  visibleTasks,
  showCompleted,
  showCompletedToggle,
  toggleShowCompleted,
  onAdd,
}) => (
  <section>
    <button onClick={onAdd}>New task</button>
    {showCompletedToggle && (
      <button onClick={toggleShowCompleted}>
        {showCompleted ? 'Hide' : 'Show'} Completed
      </button>
    )}
    {visibleTasks.map(task => <Task {...task} key={task.id} />)}
  </section>
);

const updateById = (tasks, id, key, value) =>
  tasks.map(task => (task.id === id ? { ...task, [key]: value } : task));

const newTask = () => ({ id: guid.raw(), content: '', completed: false });

const parseFieldName = fieldName => fieldName.split('-')[0];

const saveTasks = tasks => {
  storage.set('tasks', JSON.stringify(tasks));
};

export default compose(
  withState(
    'tasks',
    'setTasks',
    storage.get('tasks') ? JSON.parse(storage.get('tasks')) : [],
  ),
  withState(
    'showCompleted',
    'updateShowCompleted',
    storage.get('showCompleted') === 'false' ? false : true,
  ),
  withHandlers({
    onAdd: ({ tasks, setTasks }) => () => {
      setTasks([...tasks, newTask()]);
    },
    updateTasks: ({ setTasks }) => tasks => {
      saveTasks(tasks);
      setTasks(tasks);
    },
    toggleShowCompleted: ({ showCompleted, updateShowCompleted }) => () => {
      const newValue = !showCompleted;
      storage.set('showCompleted', newValue.toString());
      updateShowCompleted(newValue);
    },
  }),
  withProps(({ tasks, updateTasks, showCompleted }) => {
    const tasksToShow = showCompleted
      ? tasks
      : tasks.filter(({ completed }) => !completed);
    const visibleTasks = tasksToShow.map(task => ({
      ...task,
      onChangeTextField: ({ target: { name, value } }) => {
        updateTasks(updateById(tasks, task.id, parseFieldName(name), value));
      },
      onChangeBooleanField: key => () => {
        updateTasks(updateById(tasks, task.id, key, !task[key]));
      },
      onRemove: () => {
        updateTasks(tasks.filter(t => t.id !== task.id));
      },
      contentFieldName: `content-${task.id}`,
      completedFieldName: `completed-${task.id}`,
    }));
    return {
      visibleTasks,
      showCompletedToggle:
        !!tasks.length && tasks.some(({ completed }) => completed),
    };
  }),
)(Tasks);
