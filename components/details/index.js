import { Section, Container } from 'components/bulma'
import Icon from 'components/icon'

export default () => (
  <Section>
    <Container>
      <h1 className='title has-text-centered'>
        <Icon name='table' size='medium' />
        <span>Détails</span>
      </h1>
    </Container>
  </Section>
)
