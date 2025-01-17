import Button from '../UI/Button/Button';
import styles from './FormButton.module.scss';

export default function FormButton({
  onClickFirst,
  btnNameFirst,
  btnNameSecond,
}) {
  return (
    <div className={styles.box}>
      <Button btnName={btnNameFirst} onClick={onClickFirst} btnDark={true} />
      <Button isLink={'/'} btnName={btnNameSecond} />
    </div>
  );
}
