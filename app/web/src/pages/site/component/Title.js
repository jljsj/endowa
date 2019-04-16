import React from 'react';
import styles from './Title.less';

export default (props) => {
  const { name, nameEn } = props;
  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      <h3>{nameEn}</h3>
    </div>
  )
}