'use client';
import Select from '../UI/Select/Select';
import styles from './Form.module.scss';
import imgSearch from '@/app/images/search.svg';
import imgCalendar from '@/app/images/calendar.svg';
import imgErrorSearch from '@/app/images/error_search.svg';
import imgErrorCalendar from '@/app/images/error_calendar.svg';
import RadioButton from '../UI/RadioButton/RadioButton';
import { useEffect, useState } from 'react';
import FormButton from '../FormButton/FormButton';
import {
  getUserList,
  postUser,
  patchUser,
  updateUser,
} from '@/store/usersSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Form({ addForm, editForm }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    user_name: '',
    birth_date: '',
    sex: 'FEMALE',
    job: '',
  });
  const [error, setError] = useState({
    user_name: false,
    birth_date: false,
    job: false,
  });

  useEffect(() => {
    if (Boolean(formData.user_name)) {
      dispatch(
        getUserList({
          last_name: formData.user_name.split(' ')[0],
          limit: 8,
        })
      );
      if (store.usersList.length > 0) {
        const formattedUsers = store.usersList.map(
          (user) => `${user.last_name} ${user.first_name}`
        );
        const filteredUsers = formattedUsers.filter((user) =>
          user
            .split(' ')[0]
            .toLowerCase()
            .includes(formData.user_name.split(' ')[0].toLowerCase())
        );
        setUsers(filteredUsers);
      }
    }
  }, [formData.user_name]);

  useEffect(() => {
    if (Boolean(store.user.id) && editForm) {
      setFormData((prev) => ({
        ...prev,
        id: store.user.id,
      }));
      if (Boolean(store.user.last_name)) {
        setFormData((prev) => ({
          ...prev,
          user_name: `${store.user.last_name} ${store.user.first_name}`,
        }));
      }
      if (Boolean(store.user.birth_date)) {
        setFormData((prev) => ({
          ...prev,
          user_name: store.user.birth_date,
        }));
      }
      if (Boolean(store.user.job)) {
        setFormData((prev) => ({
          ...prev,
          user_name: store.user.job,
        }));
      }
    }
  }, [store.user.id]);

  const [jobArray, setJobArray] = useState(['Доктор', 'Админ', 'Медсестра']);
  useEffect(() => {
    formData.sex === 'FEMALE'
      ? setJobArray(['Доктор', 'Админ', 'Медсестра'])
      : setJobArray(['Доктор', 'Админ', 'Медбрат']);
  }, [formData]);

  const validateItem = (item, itemName) => {
    if (!Boolean(item)) {
      setError((prev) => ({
        ...prev,
        [itemName]: !Boolean(item),
      }));
    }
  };
  const validateForm = () => {
    let isValid = true;
    const newError = {
      user_name: false,
      birth_date: false,
      job: false,
    };

    if (!formData.user_name) {
      newError.user_name = true;
      isValid = false;
    }
    if (!formData.birth_date) {
      newError.birth_date = true;
      isValid = false;
    }
    if (!formData.job) {
      newError.job = true;
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <form className={styles.form}>
      <div className={styles.form__wrap}>
        {addForm && <div className={styles.form__title}>Найти в списке</div>}
        <div className={styles.form__inputs}>
          <Select
            isSearch={true}
            imgSrc={imgSearch.src}
            placeholder={'Пользователь'}
            inputName="user_name"
            label={'Пользователь'}
            value={formData.user_name}
            array={users}
            type={'text'}
            onChange={(name) => {
              setError((prev) => ({
                ...prev,
                user_name: false,
              }));
              setFormData((prev) => ({
                ...prev,
                user_name: name,
              }));
            }}
            error={error.user_name}
            errorText={error.user_name}
            errorImgSrc={imgErrorSearch.src}
            onBlur={(e) => {
              validateItem(formData.user_name, e.target.name);
            }}
          />
          <div className={styles.inputs}>
            <Select
              isCalendar={true}
              imgSrc={imgCalendar.src}
              errorImgSrc={imgErrorCalendar.src}
              error={error.birth_date}
              errorText={error.birth_date}
              placeholder={'Дата рождения'}
              inputName="birth_date"
              type={'date'}
              label={'Дата рождения'}
              value={formData.birth_date}
              onChange={(date) => {
                setError((prev) => ({
                  ...prev,
                  birth_date: false,
                }));
                const differnce = Math.abs(
                  new Date(new Date() - new Date(date)).getUTCFullYear() - 1970
                );
                differnce < 16
                  ? setFormData((prev) => ({ ...prev, birth_date: null }))
                  : setFormData((prev) => ({ ...prev, birth_date: date }));
              }}
              onBlur={(e) => {
                validateItem(formData.birth_date, e.target.name);
              }}
            />
            <RadioButton
              nameRadio="sex"
              labelFirst="Женский"
              labelSecond="Мужской"
              valueFirst="FEMALE"
              valueSecond="MALE"
              idFirst="FEMALE"
              idSecond="MALE"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, sex: e.target.value }));
              }}
              selectedValue={formData.sex}
            />
            <Select
              isSearch={true}
              placeholder={'Роль'}
              errorImgSrc={imgErrorCalendar.src}
              error={error.job}
              errorText={error.job}
              label={'Роль'}
              type={'text'}
              inputName={'job'}
              value={formData.job}
              array={jobArray}
              onChange={(job) => {
                setError((prev) => ({
                  ...prev,
                  job: false,
                }));
                setFormData((prev) => ({ ...prev, job: job }));
              }}
              onBlur={(e) => {
                validateItem(formData.job, e.target.name);
              }}
            />
          </div>
        </div>
      </div>
      <FormButton
        onClickFirst={(e) => {
          e.preventDefault();
          const isValid = validateForm();
          if (isValid) {
            const nameParts = formData.user_name.split(' ');
            if (addForm) {
              dispatch(
                postUser({
                  first_name: nameParts[1],
                  last_name: nameParts[0],
                  birth_date: formData.birth_date,
                  sex: formData.sex,
                  job: formData.job,
                })
              );
              dispatch(
                updateUser({
                  first_name: nameParts[1],
                  last_name: nameParts[0],
                  birth_date: formData.birth_date,
                  sex: formData.sex,
                  job: formData.job,
                })
              );
            } else {
              dispatch(
                patchUser({
                  data: {
                    id: formData.id,
                    first_name: nameParts[1],
                    last_name: nameParts[0],
                    birth_date: formData.birth_date,
                    sex: formData.sex,
                    job: formData.job,
                  },
                  id: formData.id,
                })
              );
              dispatch(
                updateUser({
                  first_name: nameParts[1],
                  last_name: nameParts[0],
                  birth_date: formData.birth_date,
                  sex: formData.sex,
                  job: formData.job,
                })
              );
            }
          }
        }}
        btnNameFirst={addForm ? 'Добавить' : 'Coxранить'}
        btnNameSecond="Отменить"
      />
    </form>
  );
}
