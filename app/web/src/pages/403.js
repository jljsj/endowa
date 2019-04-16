import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';
import Link from 'umi/link';

const getURL = () => {
  const pathname = window.location.pathname;
  return pathname.match('admin') ? '/admin' : '/';
}

export default function NotFound() {
  return (
    <Exception
      type="403"
      linkElement={Link}
      backText="返回首页"
      redirect={getURL()}
    />
  );
}