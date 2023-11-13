import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={ styles['shapes-container'] }>
      <div className={ styles.shapes }/>
    </div>
  );
}
