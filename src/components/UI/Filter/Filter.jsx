import Link from 'next/link';
import styles from './Filter.module.scss';
import imgFilter from '@/app/images/filter.svg';

export default function Filter({}) {
  return (
    <div className={styles.filter}>
      <div className={styles.filter__item}>
        <div className={styles.text}>ФИО пользователя</div>
        <div className={styles.sorter}>
          <div> По алфавиту A-Я </div>
          <img src={imgFilter.src} alt="filter" />
        </div>
      </div>
      <div className={styles.filter__item}>Контактные данные</div>
      <div className={styles.filter__item}>Дата рождения</div>
      <div className={styles.filter__item}>Пол</div>
      <div className={styles.filter__item}>Роль</div>
    </div>
  );
}
