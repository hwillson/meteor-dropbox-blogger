/* global localStorage */

import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import toggleLanguage from '../../helpers/toggle_language';

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.state = {
      selectedLanaguageCode: localStorage.getItem('paxil_language'),
    };
  }

  languageOptions() {
    const languages = Meteor.settings.public.site.languages;
    const options = [];
    languages.forEach((language) => {
      options.push(
        <option key={language.code} value={language.code}>
          {language.label}
        </option>
      );
    });
    return options;
  }

  toggleLanguage(event) {
    const newLanguageCode = event.target.value;
    this.setState({
      selectedLanaguageCode: newLanguageCode,
    });
    toggleLanguage(newLanguageCode);
  }

  render() {
    const languages = Meteor.settings.public.site.languages;
    let content = null;
    if (languages && (languages.length > 1)) {
      content = (
        <FormGroup bsClass="form-group language-dropdown">
          <FormControl
            componentClass="select"
            value={this.state.selectedLanaguageCode}
            onChange={this.toggleLanguage}
          >
            {this.languageOptions()}
          </FormControl>
        </FormGroup>
      );
    }
    return content;
  }
}

export default LanguageDropdown;
