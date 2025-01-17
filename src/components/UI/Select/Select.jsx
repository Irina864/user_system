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
  isCalendar,
  imgSrc,
  error,
  errorText,
  errorImgSrc,
  addUser,
  isSearch,
  sex,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(value || '');
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
    console.log(selectedItem);
    setIsOpen(false);
    setDisplayedValue(selectedItem);
    onChange(selectedItem);
  };

  const handleChangeInput = (e) => {
    setIsOpen(true);
    setDisplayedValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.select__wrapper} ref={selectWrapperRef} id={id}>
      <div
        className={`${styles.select} `}
        onClick={Boolean(array) && handleSelectClick}
      >
        {imgSrc && (
          <img
            src={error ? errorImgSrc : imgSrc}
            className={`${styles.img}`}
            alt="icon"
          />
        )}
        <div className={styles.valueBox}>
          {displayedValue !== '' && <div className={styles.label}>{label}</div>}
          <input
            type={type}
            name={inputName}
            placeholder={placeholder}
            className={`${styles.input} ${styles.value} ${
              errorText && styles.error
            }`}
            value={displayedValue}
            onChange={handleChangeInput}
          />
        </div>
        <div lassName={styles.icon_wrap}>
          <div
            className={
              isOpen
                ? `${styles.select__arrow} ${styles.open}`
                : `${styles.select__arrow}`
            }
          ></div>
        </div>{' '}
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
