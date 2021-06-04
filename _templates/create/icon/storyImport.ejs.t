---
inject: true
to: src/icons/stories.js
after: import React
---
<% if (true) { -%>import <%= h.changeCase.pascal(name) %> from './<%= h.changeCase.pascal(name) %>';<% } -%>
