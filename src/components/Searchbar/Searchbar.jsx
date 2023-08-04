import { useState } from 'react';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Label className="button-label">Search</Label>
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
