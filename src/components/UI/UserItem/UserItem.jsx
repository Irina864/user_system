import styles from './UserItem.module.scss';
import imgUserItem from '@/app/images/add_user.svg';
import imgWoman from '@/app/images/woman_dark.svg';
import imgMan from '@/app/images/man_dark.svg';
import imgDelete from '@/app/images/delete.svg';
import imgEdit from '@/app/images/edit.svg';
import Button from '../Button/Button';

export default function UserItem({ user }) {
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
          {user.last_name} {user.first_name}
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
        <Button linkHref={'/editUser'} btnImgSrc={imgEdit.src} />
        <Button btnImgSrc={imgDelete.src} />
      </div>
    </div>
  );
}
