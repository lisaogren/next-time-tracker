// import Link from 'next/link'
// import api from 'utils/api'

import Layout from 'components/layout'
import Welcome from 'components/welcome'

const Index = (props) => (
  <Layout>
    <Welcome />

    {/* <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul> */}
  </Layout>
)

// Index.getInitialProps = async function () {
//   const response = await api.entries()

//   console.log(`Show data fetched.`, response)

//   return response.data
// }

export default Index
