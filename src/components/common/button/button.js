import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import 'components/common/button/button.scss'

export const types = {
  DESTRUCTIVE: 'destructive',
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

class Button extends Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([
      types.DESTRUCTIVE,
      types.PRIMARY,
      types.SECONDARY
    ])
  }

  static defaultProps = {
    type: types.PRIMARY
  }

  render() {
    return (
      <button {...this.getProps()}>{this.props.children}</button>
    ) 
  }

  getProps() {
    return {
      className: this.getClass(),
      onClick: this.props.onClick
    }
  }

  getClass() {
    const type = this.props.type
    const classes = {
      'button': true,
      'button--destructive': type === types.DESTRUCTIVE,
      'button--primary': type === types.PRIMARY,
      'button--secondary': type === types.SECONDARY
    }

    return classnames(classes, this.props.className)
  }
}

export default Button