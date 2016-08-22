import React from 'react';
import HtmlContent from '../../helpers/html_content';

const Sidebar = ({ content }) => (
  <aside
    className="sidebar"
    dangerouslySetInnerHTML={HtmlContent.prepareForDisplay(content)}
  />
);

Sidebar.propTypes = {
  content: React.PropTypes.string,
};

export default Sidebar;
