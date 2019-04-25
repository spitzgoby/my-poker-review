import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styles from 'components/dropzone/dropzone-styles'
import Typography from '@material-ui/core/Typography'

class Dropzone extends Component {

  constructor(props) {
    super(props)

    this.handleBrowseButtonClick = this.handleBrowseButtonClick.bind(this)
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
          Drag a file here or click to browse
        </Typography>
        <input {...this.getFileInputProps()} />
      </div>
    ) 
  }

  getProps() {
    return {
      className: this.props.classes.dropzone,
      onClick: this.handleBrowseButtonClick
    }
  }

  getTextProps() {
    return {
      align: "center", 
      className: this.props.classes.text,
      variant: "subheading"
    }
  }

  getFileInputProps() {
    return {
      className: this.props.classes.fileinput,
      ref: this.setFileInputRef,
      type: "file"
    }
  }

  setFileInputRef(element) {
    this.fileInputRef = element
  }

  handleBrowseButtonClick() {
    if (this.fileInputRef) {
      this.fileInputRef.click() 
    }
  }
}

export default injectSheet(styles)(Dropzone)