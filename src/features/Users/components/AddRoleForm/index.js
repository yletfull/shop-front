import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Select from '@/components/Select';
import styles from './styles.module.scss';

const propTypes = {
  roles: PropTypes.arrayOf(PropTypes.any),
  selected: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
};

const defaultProps = {
  roles: [],
  selected: [],
  onChange: () => {},
};

const AddRoleForm = function AddRoleForm({
  roles,
  selected,
  onChange,
}) {
  const handleSubmitForm = (e) => {
    e?.preventDefault();
  };

  console.log(roles, selected, onChange);

  return (
    <form
      className={styles.addRoleForm}
      onSubmit={handleSubmitForm}
    >
      <Select
        options={[]}
        value=""
        placeholder="Выберите роль"
      />
      <Button
        type="submit"
        className={styles.addRoleFormButton}
      >
        Добавить
      </Button>
    </form>
  );
};

AddRoleForm.propTypes = propTypes;
AddRoleForm.defaultProps = defaultProps;

export default AddRoleForm;
