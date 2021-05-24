---
to: "<%= !('styles' in locals) || locals.styles ? `src/components/${h.changeCase.pascal(name)}/styles.module.scss` : null %>"
---
@import '@/theme/include.scss';

.wrapper {
  // write some styles
}
