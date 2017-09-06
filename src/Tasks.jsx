import React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';
import guid from 'guid';
import Task from './Task';

const showCompletedToggle = tasks =>
  !!tasks.length && tasks.some(({ completed }) => completed);

const Tasks = ({ visibleTasks, showCompleted, toggleShowCompleted, onAdd }) => (
  <section>
    <button onClick={onAdd}>New task</button>
    {showCompletedToggle(visibleTasks) && (
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

export default compose(
  withState('tasks', 'updateTasks', []),
  withState('showCompleted', 'updateShowCompleted', true),
  withHandlers({
    onAdd: ({ tasks, updateTasks }) => () => {
      updateTasks([...tasks, newTask()]);
    },
    toggleShowCompleted: ({ showCompleted, updateShowCompleted }) => () => {
      updateShowCompleted(!showCompleted);
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
    };
  }),
)(Tasks);
