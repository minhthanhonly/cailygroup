import './Button.scss';

export const ButtonPrimary = () => {
  return (
    <div>
      <button className="btn">Đăng ký nghỉ phép</button><br/><br/>
      <button className="btn btn--medium">Bắt đầu</button>
    </div>
  )
};


export const ButtonSecondary = () => {
  return (
    <div>
      <button className="btn btn--orange"><a href="#">Đăng xuất</a></button><br/><br/>
      <button className="btn btn--orange btn--medium">huỷ</button>
    </div>
  )
};

export const ButtonThird = () => {
  return (
    <div>
      <button className="btn btn--green btn--small">Yes</button><br/><br/>
      <button className="btn btn--red btn--small">No</button>
       <button className="btn btn--orange btn--small">huỷ</button>
    </div>
  )
};

export const ButtonEdited = () =>{
  return(
    <a className="btn btn--green btn--small icon icon--edit"><img src={require('../../assets/images/icnedit.png')}  alt="edit" className="fluid-image" /></a>
  )
}


export const IconApprove = () =>{
  return(

    <p className="icon icon--edit"><img src={require('../../assets/images/check.png')}  alt="edit" className="fluid-image" /></p>
  )
}

