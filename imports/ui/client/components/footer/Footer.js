import React from 'react';

function prepareContent(content) {
  return {
    __html: content,
  };
}

const Footer = ({ content }) => (
  <footer
    dangerouslySetInnerHTML={prepareContent(content)}
  />
);

Footer.propTypes = {
  content: React.PropTypes.string,
};

export default Footer;
