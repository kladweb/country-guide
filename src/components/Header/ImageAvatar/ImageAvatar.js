import '../../../firebase/login.css';

export const ImageAvatar = ({imagePath, name, handlerClick, handlerMouseEnter, handlerMouseLeave}) => {
  return (
    <img
      className='imageAvatar'
      src={imagePath}
      alt={name}
      onClick={handlerClick}
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
    />
  )
}
