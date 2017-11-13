import Icon from './icon'

const Welcome = () => (
  <section className='section'>
    <div className='container'>
      <h1 className='title has-text-centered'>
        <Icon name='rocket' size='medium' />
        <span>Bienvenue sur Time Tracker</span>
      </h1>
      <hr />
      <div className='content has-text-centered'>
        <p>
          Time Tracker te permet de suivre quotidiennement le temps que tu passes au travail,
          de calculer tes heures supplémentaires, tes congés, tes RTT
        </p>
      </div>
      <div className='columns'>
        <div className='column'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <Icon name='clock-o' fontSize='8rem' />
              </div>
              <div className='content'>
                Système start/stop simple. Aucune perte de temps
              </div>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <Icon name='area-chart' fontSize='8rem' />
              </div>
              <div className='content'>
                Résumé pratique pour rapidement savoir ta situation
              </div>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <Icon name='table' fontSize='8rem' />
              </div>
              <div className='content'>
                Détails éditable facile à naviguer pour les plus pointilleux
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  </section>
)

export default Welcome
