'use client';
import NextLink from 'next/link';
import React from 'react';

const Link = React.forwardRef(function Link({ to, href, ...props }, ref) {
  return <NextLink ref={ref} href={to || href || '/'} {...props} />;
});

export default Link;
