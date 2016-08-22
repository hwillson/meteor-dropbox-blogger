import React from 'react';
import HtmlContent from '../../helpers/html_content';

const Footer = ({ content }) => (
  <footer
    dangerouslySetInnerHTML={HtmlContent.prepareForDisplay(content)}
  />
);

Footer.propTypes = {
  content: React.PropTypes.string,
};

export default Footer;
