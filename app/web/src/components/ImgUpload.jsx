import React from 'react';
import { Input, Upload, message, Icon } from 'antd';

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!');
  }
  return isLt2M;
}

class ImgUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.value || '',
      isLoading: false,
    };
  }
  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      this.setState({
        isLoading: true,
      });
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
      this.props.onChange && this.props.onChange({ target: { value: info.file.response.url } });
      this.setState({
        url: info.file.response.url,
        isLoading: false,
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    const props = {
      name: 'file',
      action: '/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.onChange,
      beforeUpload,
      showUploadList: false,
    };
    const uploadComp = (
      <Upload style={{ cursor: 'pointer' }} {...props}>
        <Icon type={this.props.isLoading ? 'loading' : 'upload'} /> 点击上传
      </Upload>
    );
    return (
      <Input
        style={this.props.style}
        addonAfter={uploadComp}
        value={this.state.url || this.props.value}
        onChange={(e) => {
          this.props.onChange && this.props.onChange(e);
          this.setState({
            url: e.target.value
          })
        }} />
    )
  }
}

export default ImgUpload;
