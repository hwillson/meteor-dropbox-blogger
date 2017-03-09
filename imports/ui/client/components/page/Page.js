/* global document, window, localStorage */

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import HtmlContent from '../../helpers/html_content';

class Page extends Component {
  componentDidUpdate() {
    if (this.props.page) {
      // Setup toggling click events for toggle links
      const toggleLinks = document.getElementsByClassName('toggle-link');
      for (let i = 0; i < toggleLinks.length; i++) {
        toggleLinks[i].onclick = (event) => {
          $(event.currentTarget).next().slideToggle();
        };
      }

      // Tell prerender we're ready for caching
      window.prerenderReady = true;

      // Adjust internal links to make sure they leverage the browser
      // History API instead of doing a full page reload
      const internalLinks = document.getElementsByClassName('internal-link');
      for (let i = 0; i < internalLinks.length; i++) {
        internalLinks[i].onclick = (event) => {
          event.preventDefault();
          if (event.target.getAttribute('data-lang')) {
            localStorage.setItem(
              'paxil_language',
              event.target.getAttribute('data-lang'),
            );
          }
          browserHistory.push(event.target.pathname);
          window.scrollTo(0, 0);
        };
      }
    }
  }

  render() {
    let content;
    if (!this.props.page) {
      content = (
        <div className="page loading">
          <FontAwesome name="refresh" spin /> Loading ...
        </div>
      );
    } else {
      content = (
        <div
          className="page"
          dangerouslySetInnerHTML={
            HtmlContent.prepareForDisplay(this.props.page)
          }
        />
      );
    }
    return content;
  }
}

Page.propTypes = {
  page: React.PropTypes.string,
};

export default Page;
