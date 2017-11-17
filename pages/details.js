import Layout from 'components/layout'
import Details from 'components/details'

const DetailsPage = () => (
  <Layout>
    <Details />
  </Layout>
)

DetailsPage.getInitialProps = ({ req, res }) => {
  if (req && !req.session.authenticated) {
    res.status(302)
    res.set('Location', '/')
    res.send('redirect')
  }

  return {}
}

export default DetailsPage
