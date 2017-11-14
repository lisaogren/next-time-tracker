import { millisecondsToDuration } from 'utils/date'

export default ({ value, showSign = false }) => {
  let type

  if (showSign) {
    if (value < 0) type = 'is-negative'
    else if (value > 0) type = 'is-positive'
    else showSign = false
  }

  return (
    <span className={`balance-component ${type}`}>
      {millisecondsToDuration({ time: value, showSign })}
      <style jsx>{`
        @import 'node_modules/bulma/bulma.sass';

        .balance-component {
          font-size: 1.1rem;
          color: $text;

          &.is-negative {
            color: $red;
          }

          &.is-positive {
            color: $green;
          }
        }
      `}</style>
    </span>
  )
}
