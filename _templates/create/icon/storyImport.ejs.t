---
inject: true
to: src/icons/story.js
after: addon-knobs
---
<% if (true) { -%>import Icon<%= h.changeCase.pascal(name) %> from './<%= h.changeCase.pascal(name) %>';<% } -%>
