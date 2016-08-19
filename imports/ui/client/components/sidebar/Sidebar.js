import React from 'react';

const Sidebar = ({ content }) => (
  <aside className="sidebar">
    {content}
  </aside>
);

Sidebar.propTypes = {
  content: React.PropTypes.string,
};

export default Sidebar;
