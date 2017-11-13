import classnames from 'classnames'

const Section = ({ className = [], children }) => {
  const classes = classnames('section', ...className)
  return (
    <section className={classes}>
      {children}
    </section>
  )
}

export { Section }
export default Section
