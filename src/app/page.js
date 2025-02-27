'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleServerErrorModal } from '@/store/openModalSlice';
import imgSearch from '@/app/images/search.svg';
import styles from './page.module.scss';
import Link from 'next/link';
import Select from '@/components/UI/Select/Select';
import imgAdd from '@/app/images/plus.svg';
import Filter from '@/components/UI/Filter/Filter';
import UserItem from '@/components/UI/UserItem/UserItem';
import usersJson from '@/users.json';
import {
  getUserList,
  updateCommonUserList,
  updateUserList,
} from '@/store/usersSlice';
import { useEffect, useState } from 'react';
import {
  useLocalStorageAdd,
  useLocalStorageRead,
} from '@/hooks/useLocalStorage';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const usersInfo = useSelector((state) => state.user);
  const [users, setUsers] = useState(usersInfo.commonUserList || []);
  const [usersLastNames, setUsersLastNames] = useState([]);
  const [formData, setFormData] = useState({ last_name: '' });
  const [reverse, setReverse] = useState({
    last_name: false,
    date: false,
    sex: false,
  });
  const [abc, setAbc] = useState('А-Я');

  const byField = (fieldName) => {
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    setUsers(usersInfo.commonUserList);
  }, [usersInfo.commonUserList]);

  useEffect(() => {
    const localUsers = useLocalStorageRead('users', []);
    if (localUsers === undefined || localUsers.length === 0) {
      if (!usersInfo.isLoading && Boolean(usersInfo.usersList)) {
        if (usersInfo.usersList.length > 0) {
          const backUsers = usersInfo.usersList.map((item) => {
            const random = Math.floor(Math.random() * 9) + 1;
            const randomDate = `199${random}-0${random}-1${random}`;
            const jobs = ['Доктор', 'Админ'];
            const sexs = ['FEMALE', 'MALE'];
            const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
            const randomSex = sexs[Math.floor(Math.random() * sexs.length)];
            return {
              ...item,
              birth_date: randomDate,
              job: randomJob,
              sex: randomSex,
            };
          });
          const commonUsers = [...new Set([...usersJson, ...backUsers])];

          setUsersLastNames(() => {
            return commonUsers.map((user) => {
              return user.last_name;
            });
          });
          setUsers(commonUsers);
          useLocalStorageAdd('users', users);
          setLoading(false);
        }
      } else {
        dispatch(toggleServerErrorModal());
      }
    }
  }, [usersInfo.usersList]);

  useEffect(() => {
    const localUsers = useLocalStorageRead('users', []);
    if (localUsers !== undefined) {
      if (localUsers.length > 0) {
        dispatch(updateUserList(localUsers));
        dispatch(updateCommonUserList(localUsers));
        setLoading(false);
        setUsers(localUsers);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (formData.last_name.length > 0) {
      const commonUsersLastNames = users.map((user) => {
        return user.last_name;
      });
      setUsersLastNames(() => {
        return commonUsersLastNames.filter((user) =>
          user
            .split(' ')[0]
            .toLowerCase()
            .includes(formData.last_name.split(' ')[0].toLowerCase())
        );
      });
    }
  }, [formData.last_name]);

  return (
    <>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Пользователи клиники{' '}
            <span className={styles.title__span}>
              {users.length} человек(а)
            </span>
          </h1>
          <Link href={'/addUser'} className={styles.headerBtn}>
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
              inputName="last_name"
              array={usersLastNames}
              value={formData.last_name}
              onChange={(item) => {
                setFormData({ last_name: item });
              }}
            />
            <Filter
              abc={abc}
              onClickName={() => {
                if (reverse.last_name) {
                  const data = [...users].sort(byField('last_name')).reverse();
                  setUsers(data);
                  setAbc('Я-А');
                } else {
                  const data = [...users].sort(byField('last_name')).sort();
                  setUsers(data);
                  setAbc('А-Я');
                }
                setReverse({
                  last_name: !reverse.last_name,
                  date: false,
                  sex: false,
                });
              }}
              onClickDate={() => {
                if (reverse.date) {
                  const data = [...users].sort(byField('birth_date')).reverse();
                  setUsers(data);
                } else {
                  const data = [...users].sort(byField('birth_date'));
                  setUsers(data);
                }
                setReverse({
                  date: !reverse.date,
                  last_name: false,
                  sex: false,
                });
              }}
              onClickSex={() => {
                if (reverse.sex) {
                  const data = [...users].sort(byField('sex')).reverse();
                  setUsers(data);
                } else {
                  const data = [...users].sort(byField('sex'));
                  setUsers(data);
                }
                setReverse({
                  last_name: false,
                  date: false,
                  sex: !reverse.sex,
                });
              }}
            />
          </section>
          {loading ? (
            <section className={styles.loading}>
              <LoadingSpinner />
            </section>
          ) : (
            <section className={styles.users}>
              {users.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </section>
          )}
        </main>
      </div>
    </>
  );
}
