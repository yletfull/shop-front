## TODO для конечного приложения

- [ ] Поменять заголовки и заглушки названия
- [ ] Настроить апи и авторизацию (если нужно)
- [ ] Запомнить вести CHANGELOG
- [ ] Задокументировать тестовый и продовый сервера, а так же сваггер в [базе знаний YouTrack](https://youtrack.ubic.tech/articles) и добавить ссылки в этот файл
- [ ] Удалить этот раздел из README

# UBIC React App

## Скрипты

Дев-сервер

```sh
yarn serve
```

Сборка

```sh
yarn build
```

Линтеры

```sh
# для всего
yarn lint

# eslint
yarn lint:js

# stylelint
yarn lint:css
```

### Генерация кода

#### Иконки

```sh
yarn hygen create icon ${icon-name}
```
Создает компонент иконки с указанным именем в PascalCase нотации (преобразуется автоматически).
<details>
  <summary>Пример</summary>

  ```sh
  yarn hygen create icon chevron-left
  ```

  **src/icons/ChevronLeft.js**
  ```js
  import React from 'react';
  import SVGIconContainer from './SVGIconContainer';

  const ChevronLeft = function IconChevronLeft(props) {
    return (
      <SVGIconContainer
        {...props}
        height={}
        width={}
      >
      </SVGIconContainer>
    );
  };

  export default ChevronLeft;
  ```

  **src/icons/story.js** (инжектирование)
  ```js
  import IconChevronLeft from './ChevronLeft';

  // ...

  .add('chevron-left', () => (
    <IconChevronLeft
      style={{
        color: color('Цвет', '#343434'),
        fontSize: `${number('Размер', 5)}em`,
      }}
    />
  ))
  ```
</details>

#### Компоненты

```sh
yarn hygen create component ${component-name} [--container] [--no-styles] [--no-props]
```
Создает компонент с указанным именем в PascalCase нотации (преобразуется автоматически).

Параметры:
- `--container` - компонент имеет входной параметр `children`;
- `--no-props` - компонент не имеет входных параметров;
- `--no-styles` - компонент не имеет стилей.

<details>
  <summary>Пример</summary>

  ```sh
  yarn hygen create component chart-bar
  ```

  **src/components/ChartBar/index.js**
  ```js
  import React from 'react';
  import PropTypes from 'prop-types';
  import styles from './styles.module.scss';

  const propTypes = {
  };
  const defaultProps = {
  };

  const ChartBar = function ChartBar() {
    return (
      <div className={styles.wrapper}>
        chart-bar
      </div>
    );
  };

  ChartBar.propTypes = propTypes;
  ChartBar.defaultProps = defaultProps;

  export default ChartBar;
  ```

  **src/components/ChartBar/story.js**
  ```js
  import React from 'react';
  import { storiesOf } from '@storybook/react';
  import { withKnobs } from '@storybook/addon-knobs';
  import ChartBar from './index';

  storiesOf('components/ChartBar', module)
    .addDecorator(withKnobs)
    .add('index', () => (
      <ChartBar />
    ));
  ```

  **src/components/ChartBar/styles.module.scss**
  ```scss
  @import '@/theme/include.scss';

  .wrapper {
    // write some styles
  }
  ```
</details>

### Hooks

```sh
yarn hygen create hook ${hook-name}
```

Создает директорию `src/hooks/{hook-name}` - имя директории преобразуется в kebab нотацию автоматически.

<details>
  <summary>Пример</summary>

  ```sh
  yarn hygen create hook use-element-size
  ```

  **src/hooks/use-element-size/index.js**
  ```js
  const useElementSize = function useElementSizeHook() {
  };

  export default useElementSize;
  ```

  **src/hooks/use-element-size/story.js**
  ```js
  import React from 'react';
  import { storiesOf } from '@storybook/react';
  import useElementSize from './index';

  storiesOf('Hooks/useElementSize', module)
    .add('index', () => {
      const values = useElementSize();

      return (
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      );
    });
  ```

  **src/hooks/index.js** (инжектирование)
  ```js
  export { default as useElementSize } from './use-element-size';
  ```
</details>
