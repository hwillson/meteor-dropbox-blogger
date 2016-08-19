import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import Page from '../components/page/Page';

const DefaultLayout = ({
  allFiles,
  currentPage,
  sidebarContent,
  footerContent,
}) => (
  <div className="default-layout">
    <Header allFiles={allFiles} />
    <Grid>
      <Row>
        <Col md={8}>
          <Page page={currentPage} />
        </Col>
        <Col md={4}>
          <Sidebar content={sidebarContent} />
        </Col>
      </Row>
    </Grid>
    <Footer content={footerContent} />
  </div>
);

DefaultLayout.propTypes = {
  allFiles: React.PropTypes.array.isRequired,
  currentPage: React.PropTypes.object,
  sidebarContent: React.PropTypes.string,
  footerContent: React.PropTypes.string,
};

export default DefaultLayout;
