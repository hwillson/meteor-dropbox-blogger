/* global document, window */

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import $ from 'jquery';
import HtmlContent from '../../helpers/html_content';

class Page extends Component {
  componentDidUpdate() {
    if (this.props.page) {
      const toggleLinks = document.getElementsByClassName('toggle-link');
      for (let i = 0; i < toggleLinks.length; i++) {
        toggleLinks[i].onclick = (event) => {
          $(event.currentTarget).next().slideToggle();
        };
      }
      // Tell prerender we're ready for caching
      window.prerenderReady = true;
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
            HtmlContent.prepareForDisplay(this.props.page.content)
          }
        />
      );
    }
    return content;
  }
}

Page.propTypes = {
  page: React.PropTypes.object,
};

export default Page;
