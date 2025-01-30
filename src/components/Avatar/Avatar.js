import './avatar.css';

export const Avatar = ({userUrl, userName, size}) => {
  return (
    <div className='menuAvatar'>
      <img
        className='imageAvatar'
        src={userUrl}
        alt={userName}
        // style={{width: `${size * 40}px`}}
      />
    </div>
  );
}