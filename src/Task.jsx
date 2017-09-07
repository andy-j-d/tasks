import React from 'react';

export type TaskProps = {
  id: string,
  content: string,
  completed: boolean,
  completedFieldName: string,
  onChangeTextField: Function,
  onChangeBooleanField: Function,
  onRemove: Function,
};

const Task = ({
  content,
  contentFieldName,
  completed,
  completedFieldName,
  onChangeTextField,
  onChangeBooleanField,
  onRemove,
}: TaskProps) => (
  <article>
    <div>
      <label htmlFor={contentFieldName}>Task:</label>
      <input
        value={content}
        name={contentFieldName}
        id={contentFieldName}
        onChange={onChangeTextField}
      />
      <button
        onClick={onChangeBooleanField('completed')}
        name={completedFieldName}
      >
        Mark {completed ? 'in' : ''}complete
      </button>
      <button onClick={onRemove}>Delete</button>
    </div>
  </article>
);

export default Task;
