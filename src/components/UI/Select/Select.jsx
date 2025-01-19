'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Select.module.scss';
import imgError from '@/app/images/error.svg';
import imgAdd from '@/app/images/add_user.svg';
import Link from 'next/link';

export default function Select({
  id,
  type,
  label,
  inputName,
  placeholder,
  array,
  value,
  onChange,
  isSearch,
  isCalendar,
  imgSrc,
  error,
  errorText,
  errorImgSrc,
  addUser,
  onBlur,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectWrapperRef]);

  const handleChange = (selectedItem, index) => {
    setIsOpen(false);
    onChange(selectedItem);
  };

  const handleChangeInput = (e) => {
    setIsOpen(true);
    onChange(e.target.value);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };
  const inputRef = useRef(null);
  const handleClick = (e) => {
    e.stopPropagation();
    inputRef.current?.showPicker();
  };
  return (
    <div className={styles.select__wrapper} ref={selectWrapperRef} id={id}>
      <div
        className={`${styles.select} ${error && styles.error}`}
        onClick={(e) => (isCalendar ? handleClick(e) : handleSelectClick())}
      >
        {imgSrc && (
          <img
            src={error ? errorImgSrc : imgSrc}
            className={`${styles.img}`}
            alt="icon"
          />
        )}
        <div
          className={`${styles.valueBox} ${
            isCalendar && !Boolean(value) && styles.calendar
          }`}
        >
          {Boolean(value) && <div className={styles.label}>{label}</div>}
          <input
            ref={inputRef}
            type={type}
            name={inputName}
            placeholder={placeholder}
            className={`${styles.input} ${styles.value} ${
              errorText && styles.error
            } `}
            value={value}
            onChange={handleChangeInput}
            onBlur={onBlur}
          />
          {isCalendar && !Boolean(value) && (
            <div
              className={`${styles.placeholder} ${
                styles.placeholder_calendar
              } ${errorText && styles.error} `}
            >
              {placeholder}
            </div>
          )}
        </div>
        {addUser && !isSearch && (
          <div className={styles.icon_wrap}>
            <div
              className={
                isOpen
                  ? `${styles.select__arrow} ${styles.open}`
                  : `${styles.select__arrow}`
              }
            ></div>
          </div>
        )}{' '}
        {error && <img src={imgError.src} alt="error" />}
      </div>
      {isOpen && !isCalendar ? (
        <div
          className={`${styles.menu__wrap} ${addUser && styles.addUser_menu}`}
        >
          <div className={`${styles.menu} ${addUser && styles.addUser_menu}`}>
            {array.map((item, index) => (
              <div
                key={index}
                id={index}
                className={`${styles.option} ${
                  index % 2 !== 0 && styles.option_even
                }`}
                onClick={() => handleChange(item, index)}
              >
                {item}
              </div>
            ))}
            {addUser && !Boolean(array[0]) && (
              <div href={'/addUser'} className={styles.addUser_banner}>
                Пользователя с такими параметрами{' '}
                <span className={styles.addUser__text}>не найден,</span>{' '}
                проверьте правильность написнаия или создайте нового!
              </div>
            )}
          </div>
          {addUser && (
            <Link href={'/addUser'} className={styles.addUser}>
              <img src={imgAdd.src} alt="add" />
              <p className={styles.addUser__text}>Добавить пользователя</p>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
