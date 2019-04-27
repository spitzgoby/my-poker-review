import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/dropzone/dropzone-styles'
import Typography from '@material-ui/core/Typography'

class Dropzone extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.setFileInputRef = this.setFileInputRef.bind(this)
  }

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const classes = this.props.classes

    return (
      <div {...this.getProps()} > 
        <div className={classes.cloudcontainer}>
          <CloudUploadIcon className={classes.cloudicon}/>
        </div>
        <Typography {...this.getTextProps()}>
          Drag in a file or click to browse
        </Typography>
        <input {...this.getFileInputProps()} />
      </div>
    ) 
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
    this.addFiles(event.dataTransfer.files)
  }

  handleFileInputChange(event) {
    this.addFiles(event.target.files)
  }

  addFiles(files) {
    const onFilesAdded = this.props.onFilesAdded

    if (onFilesAdded) {
      onFilesAdded(files)
    }
  }
}

export default injectSheet(styles)(Dropzone)