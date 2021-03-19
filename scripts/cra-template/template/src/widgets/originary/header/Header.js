import './Header.scss';
import Logo from '../../../reactor.png';

function Header() {
  return (
    <div>
      <img src={Logo} alt="Logo" className="ractor-logo" />
    </div>
  );
}

export default Header;
