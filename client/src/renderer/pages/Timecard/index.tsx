import { Button } from '../../components/Button';
import { Heading2 } from '../../components/Heading';

export const Timecard = () => {
  return (
    <>
      <Heading2 text="Thẻ Giờ" />
      <p className="txt-note">Giờ nghỉ trưa từ 11:30 - 13:00.</p>
      <div className="wrp-button">
        <Button size="medium" color="green">
          Xuất Thẻ Giờ
        </Button>
        <Button>Đăng ký nghỉ phép</Button>
      </div>
    </>
  );
};
