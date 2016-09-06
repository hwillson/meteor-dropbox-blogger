/* global localStorage */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import DefaultLayout from '../layouts/DefaultLayout';
import Files from '../../../api/files/collection';
import toggleLanguage from '../helpers/toggle_language';

const DefaultContainer = createContainer(({ params }) => {
  if (!params.slug) {
    toggleLanguage();
  }
  const filesHandle =
    Meteor.subscribe('files.all', localStorage.getItem('paxil_language'));
  let allFiles = [];
  let currentPage;
  let sidebarContent;
  let footerContent;
  if (filesHandle.ready()) {
    allFiles = Files.find({}, {
      sort: {
        order: 1,
      },
    }).fetch();
    allFiles.forEach((file) => {
      if (!file.hidden && (file.slug === params.slug)) {
        currentPage = file;
      } else if (file.slug === 'sidebar') {
        sidebarContent = file.content;
      } else if (file.slug === 'footer') {
        footerContent = file.content;
      }
    });
  }
  return {
    allFiles,
    currentPage,
    sidebarContent,
    footerContent,
  };
}, DefaultLayout);

export default DefaultContainer;
