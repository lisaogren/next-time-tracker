import { isString } from 'lodash'
import classnames from 'classnames'

const Basic = (baseClass) => {
  return ({ className = [], children }) => {
    if (isString(className)) className = className.split(' ')
    const classes = classnames(baseClass, ...className)

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }
}

export { Basic }
export default Basic
