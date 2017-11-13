import Basic from './basic'

const Section = ({ fluid = false, className = [], children }) => {
  const baseClass = fluid ? 'container-fuild' : 'container'

  return Basic(baseClass)({ className, children })
}

export { Section }
export default Section
