import React from 'react';
import BraftEditor from 'braft-editor';

export default class Editor extends React.Component {
  static defaultProps = {
    basicData: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      values: BraftEditor.createEditorState(props.basicData.values || ''),
    }
  }
  componentDidMount() {
    this.isLivinig = true;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.basicData.values !== nextProps.basicData.values) {
      this.setState({
        values: BraftEditor.createEditorState(nextProps.basicData.values || '')
      })
    }
  }
  componentWillUnmount() {
    this.isLivinig = false
  }

  handleEditorChange = (editorState) => {
    if (this.isLivinig) {
      this.setState({ values: editorState }, () => {
        this.props.onChange && this.props.onChange(editorState.toHTML());
      });
    };
  }

  onUpload = (param) => {
    const xhr = new XMLHttpRequest;
    const fd = new FormData();
    const successFn = () => {
      const response = JSON.parse(xhr.responseText);
      param.success({
        url: response.url,
        meta: {
          // loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
        },
      });
    };
    const progressFn = (e) => {
      param.progress(event.loaded / e.total * 100);
    };

    const errorFn = () => {
      param.error({
        msg: 'unable to upload.'
      });
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);
    fd.append('file', param.file);
    xhr.open('POST', '/upload', true);
    xhr.send(fd);
  }
  render() {
    const { values } = this.state;
    return (
      <BraftEditor
        value={values}
        style={{
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: 4,
          ...this.props.style
        }}
        media={
          {
            uploadFn: this.onUpload,
          }
        }
        onChange={this.handleEditorChange}
        onSave={this.submitContent}
      />
    )
  }
}

Editor.componentName = 'Editor';
