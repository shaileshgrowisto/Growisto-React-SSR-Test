// Button.js

import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <butto onClic={onClick}>
      {label}
    </button>
  );
};

export default Button;
