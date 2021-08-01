import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { withFormikField } from '@/components/formik';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputCheckbox from '@/components/InputCheckbox';
import Spinner from '@/components/Spinner';
import HighlightSearch from '@/components/HighlightSearch';
import Modal from '@/components/Modal';
import styles from './styles.module.scss';

const propTypes = {
  tree: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributeName: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  isTreeFetching: PropTypes.bool,
  title: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
const defaultProps = {
  isTreeFetching: false,
  title: 'Выбрать значения',
};

const FormikInput = withFormikField(Input);
const FormikCheckbox = withFormikField(InputCheckbox);
const initialValues = {
  search: '',
  ids: [],
};

const filterTree = (tree, search) => {
  if (!search) {
    return tree;
  }

  const compare = (field) => typeof field === 'string'
    && field.toLowerCase().includes(search.toLowerCase());

  return tree
    .map(({ group, attributes }) => ({
      group,
      attributes: attributes
        .filter((attribute) => (
          compare(group)
          || compare(attribute.title)
          || compare(attribute.attributeName)
        )),
    }))
    .filter(({ attributes }) => (attributes.length > 0));
};

const AddAttributesModal = function SegmentsEditAddAttributesModal({
  tree,
  isTreeFetching,
  title,
  onClose,
  onSubmit,
}) {
  const handleFormSubmit = ({ ids }) => {
    if (Array.isArray(ids)) {
      onSubmit(ids);
    }
  };

  const handleClose = onClose;

  return (
    <Modal
      title={title}
      onClose={handleClose}
    >
      {isTreeFetching
        ? (
          <Spinner
            layout="block"
            className={styles.spinner}
          />
        )
        : (
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
          >
            {({ values }) => {
              const checkedCount = values?.ids?.length || 0;
              const search = (values?.search || '')
                .trim()
                .replace(/\s+/, ' ');
              const filteredTree = filterTree(tree, search);

              return (
                <Form>
                  <div className={styles.header}>
                    <Field
                      name="search"
                      placeholder="Найти"
                      autoComplete="off"
                      readOnly={isTreeFetching}
                      fullwidth
                      component={FormikInput}
                    />
                  </div>

                  <div className={styles.main}>
                    {filteredTree.map(({ group, attributes }) => (
                      <div
                        key={group}
                        className={styles.section}
                      >
                        <span className={styles.sectionName}>
                          <HighlightSearch
                            input={group || '-'}
                            search={search}
                          />
                        </span>
                        {attributes.map((attribute) => (
                          <div
                            key={attribute.id}
                            className={styles.option}
                          >
                            <Field
                              name="ids"
                              type="checkbox"
                              value={String(attribute.id)}
                              component={FormikCheckbox}
                            >
                              <HighlightSearch
                                input={(
                                  attribute.title || attribute.attributeName
                                )}
                                search={search}
                              />
                            </Field>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <footer className={styles.footer}>
                    <div className={styles.footerSection}>
                      <span className={styles.footerLabel}>
                        Выбрано
                        <span className={styles.footerCount}>
                          {checkedCount}
                        </span>
                      </span>
                    </div>
                    <div className={styles.footerSection}>
                      <Button
                        appearance="secondary"
                        className={styles.footerButton}
                        onClick={handleClose}
                      >
                        отменить
                      </Button>
                      <Button
                        type="submit"
                        className={styles.footerButton}
                      >
                        добавить
                      </Button>
                    </div>
                    <div className={styles.footerSection} />
                  </footer>
                </Form>
              );
            }}
          </Formik>
        )}
    </Modal>
  );
};

AddAttributesModal.propTypes = propTypes;
AddAttributesModal.defaultProps = defaultProps;

export default AddAttributesModal;
