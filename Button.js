// Button.js

import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <span onClic={onClick}>
      {label}
    </button>
  );
};

export default Button;
