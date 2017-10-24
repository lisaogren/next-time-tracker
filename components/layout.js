import Header from './header'

const Layout = (props) => (
  <div className='container'>
    <Header />
    {props.children}
  </div>
)

export default Layout
