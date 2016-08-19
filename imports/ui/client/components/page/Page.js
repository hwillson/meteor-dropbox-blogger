import React from 'react';

const Page = ({ page }) => {
  let content;
  if (!page) {
    content = 'Loading ...';
  } else {
    content = page.content;
  }
  return (
    <div className="page">
      {content}
    </div>
  );
};

Page.propTypes = {
  page: React.PropTypes.object,
};

export default Page;
