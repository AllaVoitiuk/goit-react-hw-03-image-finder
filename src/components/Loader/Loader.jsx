import { ImSpinner } from 'react-icons/im';
import style from './Loader.module.css';

export function Loader() {
  return (
    <div role="alert">
      <div style={style.spinner}>
        <ImSpinner size="32" className="icon-spin" /> Завантаження...
      </div>
    </div>
  );
}
