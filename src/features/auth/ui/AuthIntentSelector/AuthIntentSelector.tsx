import { AUTH_INTENT_OPTIONS } from '../../model/constants'
import type { AuthIntentSelectorProps } from '../../model/types'
import styles from './AuthIntentSelector.module.scss'
const AuthIntentSelector = ({ selectedIntent, onIntentChange }: AuthIntentSelectorProps) => {
  return (
    <fieldset className={styles.selector}>
      <legend className={styles.legend}>Что хотите сделать сначала?</legend>
      <div className={styles.options}>
        {AUTH_INTENT_OPTIONS.map(intentOption => {
          const isSelected = selectedIntent === intentOption.value
          return (
            <label key={intentOption.value} className={styles.option} data-selected={isSelected}>
              <input
                className={styles.radioInput}
                type="radio"
                name="authIntent"
                value={intentOption.value}
                checked={isSelected}
                onChange={() => onIntentChange(intentOption.value)}
              />
              <span className={styles.radioMark} aria-hidden="true" />
              <span className={styles.optionContent}>
                <span className={styles.optionTitle}>{intentOption.title}</span>
                <span className={styles.optionDescription}>{intentOption.description}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
export { AuthIntentSelector }
