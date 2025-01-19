'use client';
import Button from '@/components/UI/Button/Button';
import styles from './DeleteModal.module.scss';
import modalImgDelete from '@/app/images/delete_modal.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteModal } from '@/store/openModalSlice';
import {
  deleteUser,
  updateCommonUserList,
  updateUserKey,
} from '@/store/usersSlice';
import {
  useLocalStorageAdd,
  useLocalStorageRead,
  useLocalStorageRemove,
} from '@/hooks/useLocalStorage';

export default function DeleteModal({}) {
  const userToDelete = useSelector((state) => state.user.userToDelete);
  const fetchError = useSelector((state) => state.user.fetchError);
  const dispatch = useDispatch();

  const deleteLocalUser = (idUser) => {
    const localUsers = useLocalStorageRead('users');
    const newUsers = localUsers.filter((user) => user.id !== idUser);
    dispatch(updateCommonUserList(newUsers));
    useLocalStorageRemove('users');
    useLocalStorageAdd('users', newUsers);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          className={styles.modal__img}
          src={modalImgDelete.src}
          alt="delete"
        />
        <div className={styles.modal__textbox}>
          <div className={styles.modal__text}>
            Вы хотите удалить пользователя:
          </div>
          <div className={styles.modal__userName}>{userToDelete.user}</div>
        </div>
        <div className={styles.modal__btnWrap}>
          <Button
            btnName={'Удалить'}
            btnDeleteDark={true}
            onClick={() => {
              deleteLocalUser(userToDelete.id);
              dispatch(deleteUser(userToDelete.id));
              dispatch(toggleDeleteModal());
              dispatch(updateUserKey({ key: 'userToDelete', data: {} }));
              if (!fetchError) {
                dispatch(toddleSaveModal());
              }
            }}
          />
          <Button
            linkHref={'/'}
            btnName={'Отменить'}
            btnDelete={true}
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleDeleteModal());
              dispatch(updateUserKey({ key: 'userToDelete', data: {} }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
