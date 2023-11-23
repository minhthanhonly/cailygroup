import './Button.scss';

type ButtonProps = {
  btnSize?: string | null;
  btnColor?: string | null;
  text: string;
};

export const Button = (props: ButtonProps) => {
  return (
<<<<<<< HEAD
    <button
      className={`btn ${props.btnSize ? 'btn--' + props.btnSize : ''} ${
        props.btnColor ? 'btn--' + props.btnColor : ''
      }`}
    >
      {props.text}
    </button>
  );
};
=======
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

>>>>>>> 0abc4e7413c2842564b58b36810a82a38f41f0e2
