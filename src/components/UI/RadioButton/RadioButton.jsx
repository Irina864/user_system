'use client';
import styles from './RadioButton.module.scss';
import imgWoman from '@/app/images/woman_dark.svg';
import imgWomanChecked from '@/app/images/woman_light.svg';
import imgMan from '@/app/images/man_dark.svg';
import imgManChecked from '@/app/images/man_light.svg';

export default function RadioButton({
  nameRadio,
  valueFirst,
  valueSecond,
  idFirst,
  idSecond,
  labelFirst,
  labelSecond,
  onChange,
  selectedValue,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (event.target.id === idFirst && !event.shiftKey) {
        document.getElementById(idSecond).focus();
        event.preventDefault();
      }
    }
  };
  return (
    <div
      className={styles.box}
      role="group"
      aria-labelledby={`${nameRadio}-group`}
    >
      <label className={styles.radioWrapper}>
        <input
          className={styles.input}
          name={nameRadio}
          type="radio"
          value={valueFirst}
          id={idFirst}
          checked={selectedValue === valueFirst}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.label}>
          <img
            className={styles.label__img}
            src={
              selectedValue === valueFirst ? imgWomanChecked.src : imgWoman.src
            }
            alt="woman"
          />
          <span className={styles.label__text}>{labelFirst}</span>
        </div>
      </label>
      <label className={styles.radioWrapper}>
        <input
          className={styles.input}
          name={nameRadio}
          type="radio"
          value={valueSecond}
          id={idSecond}
          checked={selectedValue === valueSecond}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.label}>
          <img
            className={styles.label__img}
            src={selectedValue === valueSecond ? imgManChecked.src : imgMan.src}
            alt="man"
          />
          <span className={styles.label__text}>{labelSecond}</span>
        </div>
      </label>
    </div>
  );
}
