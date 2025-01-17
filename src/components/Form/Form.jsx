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

export default function Form({ addForm }) {
  const [formData, setFormData] = useState({
    user_name: '',
    birth_date: '',
    sex: 'FEMALE',
    job: '',
  });
  const array = ['Лена', 'Женя', 'Rkfgmbm', 'jfdjgn'];
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
            errorImgSrc={imgErrorSearch.src}
            placeholder={'Пользователь'}
            label={'Пользователь'}
            array={array}
            type={'text'}
          />
          <div className={styles.inputs}>
            <Select
              isCalendar={true}
              imgSrc={imgCalendar.src}
              errorImgSrc={imgErrorCalendar.src}
              placeholder={'Дата рождения'}
              array={array}
              label={'Дата рождения'}
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
            <Select isSearch={true} placeholder={'Роль'} label={'Роль'} />
          </div>
        </div>
      </div>{' '}
      <FormButton
        // onClickFirst
        btnNameFirst={addForm ? 'Добавить' : 'Coxранить'}
        btnNameSecond="Отменить"
      />
    </form>
  );
}
