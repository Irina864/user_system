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
  type,
}) {
  return linkHref ? (
    <Link
      href={linkHref}
      onClick={onClick}
      className={`${styles.button} 
      ${btnError && styles.btnError}
      ${btnDark && styles.btnDark}
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
      ${btnErrorDark && styles.btnErrorDark}}`}
      type={type}
    >
      {btnName}
    </button>
  );
}
