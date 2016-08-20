import React from 'react';

function prepareContent(content) {
  return {
    __html: content,
  };
}

const Sidebar = ({ content }) => (
  <aside
    className="sidebar"
    dangerouslySetInnerHTML={prepareContent(content)}
  />
);

Sidebar.propTypes = {
  content: React.PropTypes.string,
};

export default Sidebar;
