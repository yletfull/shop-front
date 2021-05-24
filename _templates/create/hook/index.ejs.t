---
to: src/hooks/<%= h.changeCase.param(name) %>/index.js
---
const <%= h.changeCase.camel(name) %> = function <%= h.changeCase.camel(name) %>Hook() {
};

export default <%= h.changeCase.camel(name) %>;
