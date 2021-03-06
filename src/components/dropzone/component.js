import styles from 'components/dropzone/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import injectSheet from 'react-jss'

class Dropzone extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.setFileInputRef = this.setFileInputRef.bind(this)

    this.state = {
      file: null
    }
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  render() {
    const classes = this.props.classes

    return (
      <div {...this.getProps()} > 
        <div className={classes.cloudcontainer}>
          <CloudUploadIcon className={classes.cloudicon}/>
        </div>
        <Typography {...this.getTextProps()}>
          {this.renderText()}
        </Typography>
        <input {...this.getFileInputProps()} />
      </div>
    ) 
  }

  renderText() {
    const file = this.state.file

    return file
      ? file.name
      : 'Drag in a file or click to browse'
  }

  getProps() {
    return {
      className: this.props.classes.dropzone,
      onClick: this.handleClick,
      onDrop: this.handleDrop
    }
  }

  getTextProps() {
    return {
      align: "center", 
      className: this.props.classes.text,
      variant: 'subtitle1'
    }
  }

  getFileInputProps() {
    return {
      className: this.props.classes.fileinput,
      onChange: this.handleFileInputChange,
      ref: this.setFileInputRef,
      type: "file"
    }
  }

  setFileInputRef(element) {
    this.fileInputRef = element
  }

  handleClick() {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  }

  handleDrop(event) {
    this.addFile(event.dataTransfer.files)
  }

  handleFileInputChange(event) {
    this.addFile(event.target.files)
  }

  addFile(files) {
    const file = files[0]
    const onChange = this.props.onChange

    this.setState({file})

    if (onChange) {
      onChange(file)
    }
  }
}

export default injectSheet(styles)(Dropzone)