import React from 'react';
import styled from 'styled-components';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui-icons/Check';
import CheckBox from 'material-ui-icons/CheckBoxOutlineBlank';
import Delete from 'material-ui-icons/Delete';

const Row = styled.article`
  display: flex;
  flex-flow: row-nowrap;
`;

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
  <Row>
    <TextField
      hintText="New task"
      value={content}
      name={contentFieldName}
      id={contentFieldName}
      onChange={onChangeTextField}
      autoFocus={content === ''}
      fullWidth
    />
    <IconButton
      onClick={onChangeBooleanField('completed')}
      tooltip={`Mark ${completed ? 'in' : ''}complete`}
    >
      {completed ? <Check /> : <CheckBox />}
    </IconButton>
    <IconButton onClick={onRemove} tooltip="Delete task">
      <Delete />
    </IconButton>
  </Row>
);

export default Task;
