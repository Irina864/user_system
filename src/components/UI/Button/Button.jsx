import Link from 'next/link';
import styles from './Button.module.scss';

export default function Button({
  onClick,
  btnName,
  btnImgSrc,
  btnDark,
  btnError,
  btnErrorDark,
  linkHref,
  btnDelete,
  btnDeleteDark,
  type,
  btnGrey,
}) {
  return linkHref ? (
    <Link
      href={linkHref}
      onClick={onClick}
      className={`${styles.button} 
      ${btnError && styles.btnError}
      ${btnDark && styles.btnDark}
      ${btnImgSrc && styles.btnImgSrc}
      ${btnDelete && styles.btnDelete}
      ${btnDeleteDark && styles.btnDeleteDark}
      ${btnGrey && styles.btnGrey}
      ${btnErrorDark && styles.btnErrorDark}}`}
    >
      {btnImgSrc ? <img src={btnImgSrc} alt={btnName} /> : btnName}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.button} 
      ${btnError && styles.btnError}
      ${btnDark && styles.btnDark}
      ${btnImgSrc && styles.btnImgSrc}
      ${btnDelete && styles.btnDelete}
      ${btnDeleteDark && styles.btnDeleteDark}
      ${btnGrey && styles.btnGrey}
      ${btnErrorDark && styles.btnErrorDark}}`}
      type={type}
    >
      {btnImgSrc ? <img src={btnImgSrc} alt={btnName} /> : btnName}
    </button>
  );
}
