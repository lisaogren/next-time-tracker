import Icon from './icon'

import { Section, Container, Content, Card } from 'components/bulma'

const Welcome = () => (
  <Section>
    <Container>
      <h1 className='title has-text-centered'>
        <Icon name='rocket' size='medium' />
        <span>Bienvenue sur Time Tracker</span>
      </h1>
      <hr />
      <Content className='has-text-centered'>
        <p>
          Time Tracker te permet de suivre quotidiennement le temps que tu passes au travail,
          de calculer tes heures supplémentaires, tes congés, tes RTT
        </p>
      </Content>
      <div className='columns'>
        <div className='column'>
          <Card>
            <Card.Content>
              <div className='media'>
                <Icon name='clock-o' fontSize='8rem' />
              </div>
              <div className='content'>
                Système start/stop simple. Aucune perte de temps
              </div>
            </Card.Content>
          </Card>
        </div>
        <div className='column'>
          <Card>
            <Card.Content>
              <div className='media'>
                <Icon name='area-chart' fontSize='8rem' />
              </div>
              <div className='content'>
                Résumé pratique pour rapidement savoir ta situation
              </div>
            </Card.Content>
          </Card>
        </div>
        <div className='column'>
          <Card>
            <Card.Content>
              <div className='media'>
                <Icon name='table' fontSize='8rem' />
              </div>
              <div className='content'>
                Détails éditable facile à naviguer pour les plus pointilleux
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </Container>
    <style jsx>{`
      .columns {
        margin-top: 2rem;
      }

      .media {
        justify-content: center;

        .icon {
          width: auto;
          height: auto;
        }
      }
    `}</style>
  </Section>
)

export default Welcome
