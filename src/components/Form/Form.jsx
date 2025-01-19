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
  updateCommonUserList,
} from '@/store/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  useLocalStorageAdd,
  useLocalStorageRead,
  useLocalStorageRemove,
} from '@/hooks/useLocalStorage';
import { toggleSaveModal } from '@/store/openModalSlice';
import { v4 as uuidv4 } from 'uuid';

export default function Form({ addForm, editForm }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    user_name: '',
    birth_date: '',
    sex: 'FEMALE',
    job: '',
    avatar: '',
    email: 'example@mail.ru',
  });
  const [error, setError] = useState({
    user_name: false,
    birth_date: false,
    job: false,
  });

  useEffect(() => {
    if (Boolean(store.idToEdit) && editForm) {
      const localUsers = useLocalStorageRead('users');
      const editedUserArr = localUsers.filter(
        (user) => user.id === store.idToEdit
      );
      const editedUser = editedUserArr[0];
      setFormData({
        id: editedUser.id,
        user_name: `${editedUser.last_name} ${editedUser.first_name}`,
        birth_date: editedUser.birth_date,
        sex: editedUser.sex,
        job: editedUser.job,
        avatar: editedUser.avatar,
        email: editedUser.email,
      });
    }
  }, [store.idToEdit]);

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
            const localUsers = useLocalStorageRead('users');
            const nameParts = formData.user_name.split(' ');
            const sendData = {
              first_name: nameParts[1],
              last_name: nameParts[0],
              birth_date: formData.birth_date,
              sex: formData.sex,
              job: formData.job,
              avatar: formData.avatar,
              email: formData.email,
            };
            if (addForm) {
              const newUsers = [
                ...localUsers,
                {
                  id: formData.id,
                  first_name: nameParts[1],
                  last_name: nameParts[0],
                  birth_date: formData.birth_date,
                  sex: formData.sex,
                  job: formData.job,
                  avatar: formData.avatar,
                  email: formData.email,
                },
              ];
              dispatch(updateCommonUserList(newUsers));
              useLocalStorageRemove('users');
              useLocalStorageAdd('users', newUsers);
              dispatch(postUser(sendData));
              dispatch(updateUser(sendData));
            } else {
              const removeUser = localUsers.filter(
                (user) => user.id !== store.idToEdit
              );
              const newUsers = [...removeUser, sendData];
              dispatch(updateCommonUserList(newUsers));
              useLocalStorageRemove('users');
              useLocalStorageAdd('users', newUsers);
              dispatch(
                patchUser({
                  data: sendData,
                  id: formData.id,
                })
              );
              dispatch(updateUser(sendData));
            }
            if (!store.fetchError) {
              dispatch(toggleSaveModal());
            }
          }
        }}
        btnNameFirst={addForm ? 'Добавить' : 'Coxранить'}
        btnNameSecond="Отменить"
      />
    </form>
  );
}
