export const LoadingStatus = ({loadStatus}) => {
  return (
    <>
      <div className='loading'>
         <span className='loading-status'>{loadStatus}</span>
      </div>
    </>
  )
}
