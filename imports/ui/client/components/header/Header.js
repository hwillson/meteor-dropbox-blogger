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
        <Nav>
          {renderNavItems(allFiles)}
        </Nav>
      </Navbar>
    );
  }
  return navigation;
}

const Header = ({ allFiles }) => (
  <header>
    <Grid>
      <Row>
        <Col md={12} className="header-title">
          <a href="/">
            <h1>{Meteor.settings.public.site.title}</h1>
          </a>
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
