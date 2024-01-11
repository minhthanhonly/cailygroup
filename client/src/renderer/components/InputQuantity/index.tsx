import './InputQuantity.scss';

type InputQuantityProps = {
  total: number;
}
export const InputQuantity = (props: InputQuantityProps) => {
    return (
        <span className="title-quantity">Số Lượng Hiển Thị <span className='input-show'><input value={props.total} onChange={(event) => (event.target.value)} type="text" /></span></span>
    );
};
