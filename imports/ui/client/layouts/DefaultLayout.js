/* global localStorage */

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import loadSiteContent from '../../../api/files/methods';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import Page from '../components/page/Page';
import toggleLanguage from '../helpers/toggle_language';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: null,
      siteContent: [],
      currentPageContent: null,
      sidebarContent: null,
      footerContent: null,
    };
  }

  componentWillMount() {
    if (!this.props.params.slug) {
      toggleLanguage();
    }
  }

  componentDidMount() {
    this.loadSiteContent();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.currentLanguage !== localStorage.getItem('paxil_language')) {
      this.loadSiteContent();
    }
    this.setCurrentPageContent(newProps.params.slug);
  }

  setCurrentPageContent(slug) {
    this.state.siteContent.forEach((content) => {
      if (!content.hidden && (content.slug === slug)) {
        this.setState({
          currentPageContent: content.content,
        });
      }
    });
  }

  loadSiteContent() {
    this.setState({
      currentLanguage: localStorage.getItem('paxil_language'),
    });
    loadSiteContent.call(
      { language: localStorage.getItem('paxil_language') },
      (error, siteContent) => {
        if (!error) {
          this.setState({
            siteContent,
          });
          this.prepareContent();
        }
      }
    );
  }

  prepareContent() {
    if (this.state.siteContent) {
      this.state.siteContent.forEach((content) => {
        if (!content.hidden && (content.slug === this.props.params.slug)) {
          this.setState({
            currentPageContent: content.content,
          });
        } else if (content.slug === 'sidebar') {
          this.setState({
            sidebarContent: content.content,
          });
        } else if (content.slug === 'footer') {
          this.setState({
            footerContent: content.content,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="default-layout">
        <Header siteContent={this.state.siteContent} />
        <Grid>
          <Row>
            <Col md={8}>
              <Page page={this.state.currentPageContent} />
            </Col>
            <Col md={4}>
              <Sidebar content={this.state.sidebarContent} />
            </Col>
          </Row>
        </Grid>
        <Footer content={this.state.footerContent} />
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  params: React.PropTypes.object,
};

export default DefaultLayout;
