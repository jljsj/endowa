import * as React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const { useEffect } = React;

const PageLoading: React.SFC<{}> = () => {
  nprogress.configure({
    showSpinner: false,
  });
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    }
  });
  return null;
}

export default PageLoading;
