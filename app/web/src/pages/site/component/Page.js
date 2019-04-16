import React from 'react';
import classnames from 'classnames';
import Title from './Title';

export default (props) => {
  const { className, pageClassName, titleProps, ...tagProps } = props;
  const wrapperClass = classnames('page-wrapper', {
    [className]: !!className,
  });
  const pageClass = classnames('page', {
    [pageClassName]: !!pageClassName,
  });
  return (
    <div {...tagProps} className={wrapperClass}>
      <div className={pageClass}>
        {titleProps && <Title {...titleProps} />}
        {props.children}
      </div>
    </div>
  )
}