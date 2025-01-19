'use client';
import imgSearch from '@/app/images/search.svg';
import styles from './page.module.scss';
import Link from 'next/link';
import Select from '@/components/UI/Select/Select';
import imgAdd from '@/app/images/plus.svg';
import Filter from '@/components/UI/Filter/Filter';
import UserItem from '@/components/UI/UserItem/UserItem';

export default function Home() {
  const nums = 123;
  const users = [
    {
      id: 1,
      email: 'ivanov@mail.com',
      first_name: 'Иван',
      last_name: 'Иванов',
      avatar: 'https://example.com/ivanov.jpg',
      birth_date: '1985-05-15',
      sex: 'MALE',
      job: 'Доктор',
    },
    {
      id: 2,
      email: 'petrova@mail.com',
      first_name: 'Мария',
      last_name: 'Петрова',
      avatar: 'https://example.com/petrova.jpg',
      birth_date: '1990-03-22',
      sex: 'FEMALE',
      job: 'Медсестра',
    },
    {
      id: 3,
      email: 'sidorov@mail.com',
      first_name: 'Алексей',
      last_name: 'Сидоров',
      avatar: 'https://example.com/sidorov.jpg',
      birth_date: '1978-11-30',
      sex: 'MALE',
      job: 'Админ',
    },
    {
      id: 4,
      email: 'kuznetsova@mail.com',
      first_name: 'Анна',
      last_name: 'Кузнецова',
      avatar: 'https://example.com/kuznetsova.jpg',
      birth_date: '1992-07-19',
      sex: 'FEMALE',
      job: 'Доктор',
    },
    {
      id: 5,
      email: 'semenov@mail.com',
      first_name: 'Сергей',
      last_name: 'Семенов',
      avatar: 'https://example.com/semenov.jpg',
      birth_date: '1980-12-05',
      sex: 'MALE',
      job: 'Медсестра',
    },
  ];
  return (
    <>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Пользователи клиники{' '}
            <span className={styles.title__span}>{nums} человек(а)</span>
          </h1>
          <Link href={'/'} className={styles.headerBtn}>
            <div className={styles.headerBtn__ellipse}>
              <img
                src={imgAdd.src}
                alt="add"
                className={styles.headerBtn__img}
              />
            </div>
            <p className={styles.headerBtn__text}>Добавить нового участника</p>
          </Link>
        </header>
        <main className={styles.main}>
          <section className={styles.search}>
            <Select
              isSearch={true}
              addUser={true}
              type={'text'}
              imgSrc={imgSearch.src}
              placeholder={'Поиск...'}
              inputName="user_name"
              array={users}
              // value={formData.user_name}
            />
            <Filter />
          </section>
          <section className={styles.users}>
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
