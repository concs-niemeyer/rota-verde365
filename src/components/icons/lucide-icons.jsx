import React from 'react';
import { icons } from 'lucide-react';

const LucideIcon = ({ name, ...props }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default LucideIcon;
