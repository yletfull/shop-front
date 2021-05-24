---
inject: true
to: src/hooks/index.js
prepend: true
---
<% if (true) { -%>export { default as <%= h.changeCase.camel(name) %> } from './<%= h.changeCase.param(name) %>';<% } -%>
