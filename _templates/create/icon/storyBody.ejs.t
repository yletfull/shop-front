---
inject: true
to: src/icons/stories.js
after: hygen-inject
---
<% if (true) { -%>    {renderIcon(<%= h.changeCase.pascal(name) %>)}<% } -%>
