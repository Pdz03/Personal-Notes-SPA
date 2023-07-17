
import { BsTranslate } from 'react-icons/bs';
import { LocaleConsumer } from '../contexts/LocaleContexts';
 
function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale}) => {
        return <button className='toggle-locale' onClick={toggleLocale}>{locale === 'id' ? <BsTranslate /> : <BsTranslate />}</button>;
      }}
    </LocaleConsumer>
  );
}
 
export default ToggleLocale;