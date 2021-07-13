import UBtn from './u-btn.vue';
import USelect from './u-select.vue';
import IconChevronLeft from './icons/chevron-left.vue';
import IconChevronRight from './icons/chevron-right.vue';

const generateNumbers = (current, last, delta = 2) => {
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('…');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}


const createPageSelectHandler = (context, number) => e => {
  e.preventDefault();

  if (number >= 1 && number <= context.props.pages) {
    emit(context.listeners, 'page-select', number);
    emit(context.listeners, 'pageSelect', number);
  }
};

const createCountSelectHandler = context => count => {
  emit(context.listeners, 'countSelect', +count);
  emit(context.listeners, 'count-select', +count);
};

const cssClass = 'u-pagination';

export default {
  ...FunctionalComponent,
  props: {
    pages: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      default: null,
    },
    options: {
      type: Array,
      default: () => ([]),
    },
    countText: {
      type: String,
      default: 'Записей на странице',
    },
  },
  render (h, context) {
    if (context.props.pages <= 0) {
      return null;
    }

    const pageNumbers = generateNumbers(context.props.page, context.props.pages);
    const countOptions = context.props.options.map(count => ({
      value: count + '',
      text: count + '',
    }));

    return (
      <div {...{
        attrs: context.data.attrs,
        class: [
          cssClass,
          context.data.class,
          context.data.staticClass,
        ],
        key: context.data.key,
        style: [
          context.data.style,
          context.data.staticStyle,
        ],
        on: context.listeners,
      }}>
        <nav class={`${cssClass}__navigation`}>
          <UBtn
            class={[
              `${cssClass}__arrow`,
              { [`${cssClass}__arrow_disabled`]: context.props.page <= 1 },
            ]}
            appearance="control"
            disabled={context.props.page <= 1}
            onClick={createPageSelectHandler(context, context.props.page - 1)}
          >
            <IconChevronLeft />
          </UBtn>

          <div class={`${cssClass}__numbers`}>
            {pageNumbers.map((pageNumber, i) => (
              (typeof pageNumber === 'string' || pageNumber === context.props.page)
                ? (
                  <UBtn
                    class={[
                      `${cssClass}__number`,
                      `${cssClass}__number_static`,
                    ]}
                    appearance="control"
                    disabled
                    key={`pass_${i}`}
                  >{pageNumber}</UBtn>
                ) : (
                  <UBtn
                    class={`${cssClass}__number`}
                    appearance="control"
                    key={pageNumber}
                    onClick={createPageSelectHandler(context, pageNumber)}
                  >{pageNumber}</UBtn>
                )
            ))}
          </div>

          <UBtn
            class={[
              `${cssClass}__arrow`,
              { [`${cssClass}__arrow_disabled`]: context.props.page >= context.props.pages },
            ]}
            appearance="control"
            disabled={context.props.page >= context.props.pages}
            onClick={createPageSelectHandler(context, context.props.page + 1)}
          >
            <IconChevronRight />
          </UBtn>
        </nav>

        {context.slots().default}

        {(context.props.count && context.props.options.length > 0) ? (
          <div>
            <span>{context.props.countText}</span>
            <USelect
              class={`${cssClass}__select`}
              options={countOptions}
              value={'' + context.props.count}
              onInput={createCountSelectHandler(context)}
            />
          </div>
        ) : null}
      </div>
    );
  },
};
