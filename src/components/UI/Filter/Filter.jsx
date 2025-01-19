'use client';
import { useState } from 'react';
import styles from './Filter.module.scss';
import imgFilter from '@/app/images/filter.svg';

export default function Filter({ onClickName, onClickDate, onClickSex }) {
  const [reverse, setReverse] = useState(false);
  return (
    <div className={styles.filter}>
      <div className={styles.filter__item}>
        <div className={styles.text}>ФИО пользователя</div>
        <div
          className={`${styles.sorter} ${styles.hover_item}`}
          onClick={() => {
            setReverse(!reverse);
            onClickName();
          }}
        >
          <div> По алфавиту {reverse ? 'А-Я' : 'Я-А'} </div>
          <img src={imgFilter.src} alt="filter" />
        </div>
      </div>
      <div className={styles.filter__item}>Контактные данные</div>
      <div
        className={`${styles.filter__item} ${styles.hover_item}`}
        onClick={onClickDate}
      >
        Дата рождения
      </div>
      <div
        className={`${styles.filter__item} ${styles.hover_item}`}
        onClick={onClickSex}
      >
        Пол
      </div>
      <div className={styles.filter__item}>Роль</div>
    </div>
  );
}
