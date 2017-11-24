import classnames from 'classnames'
import { isString } from 'lodash'

const Section = ({ className = [], children }) => {
  if (isString(className)) className = className.split(' ')
  const classes = classnames('section', ...className)

  return (
    <section className={classes}>
      {children}
    </section>
  )
}

export { Section }
export default Section
