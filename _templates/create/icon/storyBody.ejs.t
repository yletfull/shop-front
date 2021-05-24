---
inject: true
to: src/icons/story.js
before: \.add\(
---
<% if (true) { -%>  .add('<%= h.changeCase.param(name) %>', () => (
    <Icon<%= h.changeCase.pascal(name) %>
      style={{
        color: color('Цвет', '#343434'),
        fontSize: `${number('Размер', 5)}em`,
      }}
    />
  ))<% } -%>
