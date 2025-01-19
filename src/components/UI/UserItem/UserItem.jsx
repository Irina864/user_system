'use client';
import styles from './UserItem.module.scss';
import imgUserItem from '@/app/images/add_user.svg';
import imgWoman from '@/app/images/woman_dark.svg';
import imgMan from '@/app/images/man_dark.svg';
import imgDelete from '@/app/images/delete.svg';
import imgEdit from '@/app/images/edit.svg';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { toggleDeleteModal } from '@/store/openModalSlice';
import { getUserDetailById, updateUserKey } from '@/store/usersSlice';

export default function UserItem({ user }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.UserItem}>
      <div className={styles.UserItem__item}>
        <div className={styles.imgWrap}>
          <img
            className={styles.img}
            src={user.avatar ? user.avatar : imgUserItem.src}
            alt="user"
          />
        </div>
        <div className={styles.text}>
          <div>{user.last_name}</div>
          <div>{user.first_name}</div>
        </div>
      </div>
      <div className={styles.UserItem__item}>{user.email}</div>
      <div className={styles.UserItem__item}>{user.birth_date}</div>
      <div className={styles.UserItem__item}>
        <img
          className={styles.gender__img}
          src={user.sex === 'FEMALE' ? imgWoman.src : imgMan.src}
          alt="man"
        />
        <span className={styles.label__text}>
          {user.sex === 'FEMALE' ? 'Женский' : 'Мужской'}
        </span>
      </div>
      <div className={styles.UserItem__item}>{user.job}</div>
      <div className={styles.btnWrap}>
        <Button
          linkHref={'/editUser'}
          btnImgSrc={imgEdit.src}
          onClick={() => {
            dispatch(updateUserKey({ key: 'idToEdit', data: user.id }));
            dispatch(getUserDetailById(user.id));
          }}
        />
        <Button
          btnImgSrc={imgDelete.src}
          onClick={() => {
            dispatch(toggleDeleteModal());
            dispatch(
              updateUserKey({
                key: 'userToDelete',
                data: {
                  id: user.id,
                  user: `${user.last_name} ${user.first_name}`,
                },
              })
            );
          }}
        />
      </div>
    </div>
  );
}
