import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, FormSpy, Field } from 'react-final-form';
import { useDebounce } from '@/hooks';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.shape({
      attributeName: PropTypes.string,
      profileId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      options: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      type: PropTypes.string,
    })),
  })),
  onSubmit: PropTypes.func,
};

const defaultProps = {
  data: [],
  onSubmit: () => {},
};

const ParamsForm = function ParamsForm({ data, onSubmit }) {
  const searchRef = useRef(null);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [filteredParams, setFilteredParams] = useState(data);

  const delayedSearchRequest = useDebounce(searchPhrase, 300);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const filterAttributes = (attribute) => {
      const searched = attribute.title || attribute.attributeName;
      if (!searched) {
        return false;
      }
      return searched.includes(delayedSearchRequest);
    };
    const reduceGroups = (acc, { group, attributes }) => {
      if (!attributes && !Array.isArray(attributes)) {
        return acc;
      }
      const filteredAttributes = attributes.filter(filterAttributes);
      if (filteredAttributes.length === 0) {
        return acc;
      }
      return [...acc, { group, attributes: filteredAttributes }];
    };
    setFilteredParams(data.reduce(reduceGroups, []));
  }, [data, delayedSearchRequest]);

  const handleChangeFormValues = ({ values }) => {
    const { search } = values || {};
    if (typeof search === 'undefined') {
      return;
    }
    setSearchPhrase(search);
  };
  const handleSubmitParams = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmitParams}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormSpy
            subscriptions={{ search: true }}
            onChange={handleChangeFormValues}
          />

          <div className={styles.paramsHeader}>
            <Field name="search">
              {({ input }) => (
                <Input
                  ref={searchRef}
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder="Найти"
                  fullwidth
                />
              )}
            </Field>
            <label
              className={cx(
                styles.paramsLabel,
                styles.paramsLabelSelectAll,
              )}
            >
              <Field
                name="all"
                component="input"
                type="checkbox"
                disabled
              />
              Выбрать все
            </label>
          </div>
          <div className={styles.paramsMain}>
            {filteredParams.map(({ group, attributes }) => (
              <div
                key={group}
                className={styles.paramsSection}
              >
                <span className={styles.paramsSectionName}>
                  {group}
                </span>
                {attributes.map((attribute) => (
                  <label
                    key={attribute.attributeName}
                    className={styles.paramsSectionLabel}
                  >
                    <Field
                      name="params"
                      component="input"
                      type="checkbox"
                      value={attribute}
                    />
                    {attribute.title || attribute.attributeName}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.paramsFooter}>
            <Button
              type="submit"
            >
              Выбрать
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

ParamsForm.propTypes = propTypes;
ParamsForm.defaultProps = defaultProps;

export default ParamsForm;
