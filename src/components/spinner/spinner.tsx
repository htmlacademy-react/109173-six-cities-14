import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={ styles['shapes-container'] } data-testid="spinnerElem">
      <div className={ styles.shapes }/>
    </div>
  );
}
