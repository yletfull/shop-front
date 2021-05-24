---
to: src/components/<%= h.changeCase.pascal(name) %>/index.js
---
import React from 'react';
<% if (!('props' in locals) || locals.props) { -%>
import PropTypes from 'prop-types';
<% } -%>
<% if (!('styles' in locals) || locals.styles) { -%>
import styles from './styles.module.scss';
<% } -%>
<% if (!('props' in locals) || locals.props) { -%>

const propTypes = {
<% if (locals.container) { -%>
  children: PropTypes.node.isRequired,
<% } %>};
const defaultProps = {
};
<% } -%>

const <%= h.changeCase.pascal(name) %> = function <%= h.changeCase.pascal(name) %>(<%= locals.container ? '{ children }' : '' %>) {
  return (
    <div<%= !('styles' in locals) || locals.styles ? ' className={styles.wrapper}' : '' %>>
      <%= locals.container ? '{children}' : name %>
    </div>
  );
};
<% if (!('props' in locals) || locals.props) { -%>

<%= h.changeCase.pascal(name) %>.propTypes = propTypes;
<%= h.changeCase.pascal(name) %>.defaultProps = defaultProps;
<% } -%>

export default <%= h.changeCase.pascal(name) %>;
