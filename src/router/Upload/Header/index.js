
import React, { useState } from 'react';
import cx from 'classnames';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import Select from '@/components/Select';
import Button from '@/components/Button';
import IconDownload from '@/icons/Download.svg';
import IconUpload from '@/icons/Upload.svg';
import styles from './styles.module.scss';

const headerTemplates = [
  [
    { title: 'Последнее скачивание', value: '15.03.2021 15:55:31', id: 0 },
    { title: 'Всего РК', value: '661', id: 1 },
  ],
  [
    { title: 'Последняя загрузка во ВК', value: '15.03.2021 15:55:31', id: 0 },
    { title: 'Всего РК', value: '567', id: 1 },
    { title: 'Новых РК', value: '11', id: 2 },
    { title: 'Ошибок', value: '9', valueColor: 'red', id: 3 },
  ],
];

const accountOptions = [
  {
    value: 'acc1',
    text: 'account1',
  },
  {
    value: 'acc2',
    text: 'account2',
  },
];

const clientOptions = [
  {
    value: 'cli1',
    text: 'client1',
  },
  {
    value: 'cli2',
    text: 'client2',
  },
];

const Header = function HeaderScreen() {
  const [selectorsValues, setSelectorsValues] = useState({
    account: '',
    client: '',
  });

  const handleAccountChange = (e) => {
    const account = e.target.value;

    setSelectorsValues((prev) => ({
      ...prev,
      account,
    }));
  };

  const handleClientChange = (e) => {
    const client = e.target.value;

    setSelectorsValues((prev) => ({
      ...prev,
      client,
    }));
  };

  return (
    <React.Fragment>
      <div className={styles.topWrapper}>
        <Select
          value={selectorsValues.account}
          options={accountOptions}
          onChange={handleAccountChange}
          resetText="Не выбрано"
          placeholder="Аккаунт"
          className={styles.select}
          disabled
        />
        <span className={styles.separator}>
          /
        </span>
        <Select
          value={selectorsValues.client}
          options={clientOptions}
          onChange={handleClientChange}
          resetText="Не выбрано"
          placeholder="Клиент"
          className={styles.select}
          disabled
        />
        <Button
          style={{ 'font-size': '14px' }}
          className={styles.changeButton}
          appearance="control"
        >
          <b>
            Изменить
          </b>
        </Button>
        <Button
          style={{ 'font-size': '14px' }}
          className={styles.downloadExcelModel}
          appearance="control"
        >
          <b>
            Скачать шаблон Excel-файла
          </b>
        </Button>
      </div>
      <div className={styles.headerTemplatesWrapper}>
        <HeaderTemplate className={styles.headerTemplate}>
          <ProcessButton
            icon={IconDownload}
            text={['Скачать', 'файл']}
          />
          <div>
            {headerTemplates[0].map(({ title, value, id }) => (
              <div
                className={styles.textWrapper}
                key={id}
              >
                <span>
                  {title}
                </span>
                <span className={styles.value}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </HeaderTemplate>
        <HeaderTemplate className={styles.headerTemplate}>
          <ProcessButton
            icon={IconUpload}
            text={['Загрузить', 'файл']}
          />
          <div>
            {headerTemplates[1].map(({ title, value, id, valueColor }) => (
              <div
                className={styles.textWrapper}
                key={id}
              >
                <span>
                  {title}
                </span>
                <span
                  className={cx(styles.value, { [valueColor]: valueColor })}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </HeaderTemplate>
      </div>
    </React.Fragment>
  );
};

export default Header;
