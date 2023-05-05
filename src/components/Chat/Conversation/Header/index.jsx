import close from '../../assets/clear-button.svg';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './style.scss';



function Header(props) {
  console.log('props',props);
  const handleBackClick = () => {
    // props.setShowChat(false);
    props.setConverstaion(false);
  }
  return (
    <div className="rcw-header">
      
      {props.showCloseButton &&
        <button className="rcw-close-button" onClick={props.toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <div className='header'>
        <div>
          <h4 className="rcw-title">
            {props.titleAvatar && <img src={props.titleAvatar} className="avatar" alt="profile" />}
            {props.title}
          </h4>
          {/* <span>چت با {props.userChat}</span> */}
        </div>
        <p>
          {/* if click back to userList  */}
          <KeyboardBackspaceIcon className='BackIcon'  onClick={handleBackClick} />
        </p>
      </div>
    </div>
  );
}

export default Header;
