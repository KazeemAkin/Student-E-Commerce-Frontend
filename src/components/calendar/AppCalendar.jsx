import { Calendar } from 'primereact/calendar';
import './AppCalendar.css';

const AppCalendar = ({ ...otherProps }) => {
  return (
    <Calendar style={{ width: "100%", marginBottom: 20 }}  {...otherProps} inline />
  )
}

export default AppCalendar;