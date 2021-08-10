import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Select from '@/components/Select';
import styles from './styles.module.scss';

const roleType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
};

const propTypes = {
  roles: PropTypes.arrayOf(roleType),
  selected: PropTypes.arrayOf(roleType),
  isDisabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  roles: [],
  selected: [],
  isDisabled: false,
  onSubmit: () => {},
};

const AddRoleForm = function AddRoleForm({
  roles,
  selected,
  isDisabled,
  onSubmit,
}) {
  const [role, setRole] = useState('');

  const selectedNames = selected
    .map((role) => role.name);
  const selectOptions = roles
    .filter((role) => Boolean(role.name)
      && !selectedNames.includes(role.name))
    .map((role) => ({
      text: role.title,
      value: role.name,
    }));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const values = Array.from(new FormData(e.target).entries())
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
    onSubmit(values);
  };

  return (
    <form
      className={styles.addRoleForm}
      onSubmit={handleSubmitForm}
    >
      <Select
        name="role"
        value={role}
        options={selectOptions}
        placeholder="Выберите роль"
        disabled={isDisabled}
        onChange={setRole}
      />
      <Button
        type="submit"
        className={styles.addRoleFormButton}
        disabled={isDisabled}
      >
        Добавить
      </Button>
    </form>
  );
};

AddRoleForm.propTypes = propTypes;
AddRoleForm.defaultProps = defaultProps;

export default AddRoleForm;
