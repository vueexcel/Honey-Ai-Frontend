import React from 'react';

const ResizeIcon = (props) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // allows custom className, style, etc.
  >
    <rect width="30" height="30" rx="15" fill="currentColor" />
    <path
      d="M19.6275 15.0001L17.25 12.6226L18.3075 11.5576L21.75 15.0001L18.3075 18.4351L17.25 17.3776L19.6275 15.0001ZM10.3725 15.0001L12.75 17.3776L11.6925 18.4426L8.25 15.0001L11.6925 11.5651L12.75 12.6226L10.3725 15.0001Z"
      fill="#808080"
    />
  </svg>
);

export default ResizeIcon;
