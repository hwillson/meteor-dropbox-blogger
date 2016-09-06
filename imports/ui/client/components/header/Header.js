/* global document, localStorage */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Grid,
  Row,
  Navbar,
  Nav,
  NavItem,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LanguageDropdown from './LanguageDropdown';

function pageTitle() {
  const title =
    Meteor.settings.public.site.title[localStorage.getItem('paxil_language')];
  // Set page head title as well
  document.title = title;
  return (
    <a href="/">
      <h1>{title}</h1>
    </a>
  );
}

function renderNavItems(allFiles) {
  const navItems = [];
  allFiles.forEach((page) => {
    if (!page.hidden) {
      navItems.push(
        <LinkContainer to={{ pathname: `/${page.slug}` }} key={page._id}>
          <NavItem>
            {page.title}
          </NavItem>
        </LinkContainer>
      );
    }
  });
  return navItems;
}

function renderNavigation(allFiles) {
  let navigation;
  if (allFiles.length) {
    navigation = (
      <Navbar className="navbar-dark">
        <Navbar.Header className="hidden-sm hidden-md hidden-lg">
          <Navbar.Brand>
            {pageTitle()}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {renderNavItems(allFiles)}
          </Nav>
          <div className="hidden-sm hidden-md hidden-lg">
            <LanguageDropdown />
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return navigation;
}

const Header = ({ allFiles }) => (
  <header>
    <Grid className="hidden-xs">
      <Row>
        <Col md={10} className="header-title">
          {pageTitle()}
        </Col>
        <Col md={2}>
          <LanguageDropdown />
        </Col>
      </Row>
    </Grid>
    {renderNavigation(allFiles)}
  </header>
);

Header.propTypes = {
  allFiles: React.PropTypes.array.isRequired,
};

export default Header;
