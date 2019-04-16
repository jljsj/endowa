import React from 'react';
import BasicForm from '@/components/BasicForm';

class Contact extends React.Component {
  render() {
    return (
      <BasicForm
        id="contact"
        headerProps={{
          title: '联系我们编辑',
          content: '针对前台的联系我们。',
        }}
      />
    )
  }
}

export default Contact;
