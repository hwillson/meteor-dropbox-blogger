/* global localStorage, window */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const toggleLanguage = (newLanguageCode) => {
  const toggleCode = newLanguageCode || localStorage.getItem('paxil_language');
  localStorage.setItem('paxil_language', toggleCode);
  browserHistory.push(
    `/${Meteor.settings.public.site.home[toggleCode]}`
  );
};

export default toggleLanguage;
