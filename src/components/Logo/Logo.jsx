import React from 'react';

function Logo({ width = '50px' }) {
  return (
    <div style={{ width }}>
      <img src="/Logo.jpg" alt="Logo"  className=''/>
    </div>
  );
}

export default Logo;
