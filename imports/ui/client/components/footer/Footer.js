import React from 'react';
import { Grid, Row } from 'react-bootstrap';

const Footer = ({ content }) => (
  <footer>
    <Grid>
      <Row>
        {content}
      </Row>
    </Grid>
  </footer>
);

Footer.propTypes = {
  content: React.PropTypes.string,
};

export default Footer;
