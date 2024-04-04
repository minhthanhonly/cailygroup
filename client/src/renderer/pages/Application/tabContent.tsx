import axios, { axiosPrivate } from '../../api/axios';
import { useEffect, useState } from 'react';
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { format, parse } from 'date-fns';

export const TabContent = ({ id }) => {
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [comment, setComment] = useState<any>([]);
  const [commentFirst, setCommentFirst] = useState<any>([]);
  const [commentSeCond, setCommentSeCond] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
  });
  const [statusattr, setStatusattr] = useState({
    statusattrTexts: '',
    statusattrClass: '',
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        setAccordionItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Load();
  }, [id]);

  const GetComment = async () => {
    try {
      const response = await axiosPrivate.get('application/getcomment/' + id);
      const commentData = response.data;

      // Xử lý dữ liệu dựa trên kiểu dữ liệu trả về
      if (Array.isArray(commentData)) {
        // Lặp qua mỗi bình luận và ghi nhận tên thực của người dùng
        commentData.forEach((comment) => {
          //console.log(comment.id); // Ghi nhận tên thực của người dùng
        });
        setComment(commentData); // Cập nhật state với dữ liệu bình luận
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCommentForUserFirst = async () => {
    try {
      const response = await axiosPrivate.get(
        'application/getcommentforuserfirst/' + id,
      );
      const commentData = response.data;

      // Xử lý dữ liệu dựa trên kiểu dữ liệu trả về
      if (Array.isArray(commentData)) {
        // Lặp qua mỗi bình luận và ghi nhận tên thực của người dùng
        commentData.forEach((commentFirst) => {
          //console.log(comment.id); // Ghi nhận tên thực của người dùng
        });
        setCommentFirst(commentData); // Cập nhật state với dữ liệu bình luận
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCommentForUserFirst();
  }, [id]);

  const getCommentForUserSecond = async () => {
    try {
      const response = await axiosPrivate.get(
        'application/getcommentforusersecond/' + id,
      );
      const commentData = response.data;

      // Xử lý dữ liệu dựa trên kiểu dữ liệu trả về
      if (Array.isArray(commentData)) {
        // Lặp qua mỗi bình luận và ghi nhận tên thực của người dùng
        commentData.forEach((commentSeCond) => {
          //console.log(comment.id); // Ghi nhận tên thực của người dùng
        });
        setCommentSeCond(commentData); // Cập nhật state với dữ liệu bình luận
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCommentForUserSecond();
  }, [id]);

  useEffect(() => {
    GetComment();
  }, [id]);

  useEffect(() => {
    if (accordionItems.status == 0) {
      setApprove({
        approveTexts: '承認待ち',
        approveClass: 'lbl01 lbl-blue',
      });
    } else if (accordionItems.status == 1) {
      setApprove({
        approveTexts: '差し戻し',
        approveClass: 'lbl01 lbl-yellow',
      });
    } else if (accordionItems.status == 2) {
      setApprove({
        approveTexts: '下書き',
        approveClass: 'lbl01 lbl-brown',
      });
    } else if (accordionItems.status == 3) {
      setApprove({
        approveTexts: '却下',
        approveClass: 'lbl01 lbl-red',
      });
    } else if (accordionItems.status == 4) {
      setApprove({
        approveTexts: '完了',
        approveClass: 'lbl01 lbl-white',
      });
    } else {
      setApprove({
        approveTexts: '取り消し',
        approveClass: 'lbl01',
      });
    }
  }, [accordionItems]);

  useEffect(() => {
    if (accordionItems.status_attr == 0) {
      setStatusattr({
        statusattrTexts: '承認待ち',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.status_attr == 1) {
      setStatusattr({
        statusattrTexts: '差し戻し',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.status_attr == 2) {
      setStatusattr({
        statusattrTexts: '却下',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.status_attr == 3) {
      setStatusattr({
        statusattrTexts: '承認済み',
        statusattrClass: 'lbl01 lbc-blue lbbd-blue',
      });
    }
  }, [accordionItems]);

  const handDelete = async (commentId) => {
    try {
      // Gọi hàm xóa comment tại đây với commentId
      //console.log('Deleting comment with id:', commentId);
      const response = await axiosPrivate.delete(
        `application/deletecommentfirst/${commentId}`,
      );
      if (response.status === 200) {
        console.log('Comment deleted successfully');
        getCommentForUserFirst();
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handDeleteSeCond = async (commentId) => {
    try {
      const response = await axiosPrivate.delete(
        `application/deletecommentsecond/${commentId}`,
      );
      if (response.status === 200) {
        console.log('Comment deleted successfully');
        getCommentForUserSecond();
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  const handleSubmit = async () => {
    //console.log('ssss', users.roles);
    const note = textValue.trim(); // Loại bỏ các khoảng trắng dư thừa
    if (note.length === 0) {
      console.error('Không thể thêm comment: Nội dung trống');
      return;
    }
    try {
      const comment_data = {
        note: textValue,
        user_id: users.id,
        id_register: id,
      };
      //console.log(comment_data);
      setTextValue('');
      const res = await axiosPrivate.post(
        'application/addcomment/',
        comment_data,
      );
      getCommentForUserFirst();
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const handleAddCommentSeCond = async () => {
    const note = commentValue.trim(); // Loại bỏ các khoảng trắng dư thừa
    if (note.length === 0) {
      console.error('Không thể thêm comment: Nội dung trống');
      return;
    }
    try {
      const comment_data = {
        note: commentValue,
        user_id: users.id,
        id_register: id,
      };
      console.log(comment_data);
      setCommentValue('');
      const res = await axiosPrivate.post(
        'application/addcommentsecond/',
        comment_data,
      );
      getCommentForUserSecond();
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const datetime = new Date(createdAt);
    const year = datetime.getFullYear();
    const month = ('0' + (datetime.getMonth() + 1)).slice(-2); // Thêm số 0 vào trước nếu tháng < 10
    const day = ('0' + datetime.getDate()).slice(-2); // Thêm số 0 vào trước nếu ngày < 10
    const hour = ('0' + datetime.getHours()).slice(-2); // Thêm số 0 vào trước nếu giờ < 10
    const minute = ('0' + datetime.getMinutes()).slice(-2); // Thêm số 0 vào trước nếu phút < 10
    const second = ('0' + datetime.getSeconds()).slice(-2); // Thêm số 0 vào trước nếu giây < 10
    return `(${year} ${month} ${day} ${hour}:${minute}:${second})`;
  };
  return (
    <>
      <div className="list-accordion__parent">
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className="list-accordion__item__head" onClick={toggleAccordion}>
            <div className="list-accordion__item__head__title">
              <p className="list-accordion__item__head__title__title">
                {accordionItems.name}
              </p>
              <span className="list-accordion__item__head__title__subtitle">
                {accordionItems.realname}（{accordionItems.date}{' '}
                {'\u00A0\u00A0'}
                {accordionItems.time}）
              </span>
            </div>
            <div className="list-accordion__item__head__btn">
              <p className="list-accordion__item__head__btn__btn">
                <span className={approve.approveClass}>
                  {approve.approveTexts}
                </span>
              </p>
              <p className="list-accordion__item__head__btn__icn">
                <span className="icn-item">
                  <img src={editIcon} alt="edit" className="fluid-image" />
                </span>
                <span className="icn-item">
                  <img src={closeIcon} alt="close" className="fluid-image" />
                </span>
              </p>
            </div>
          </div>
          <div className="list-accordion__item__content">
            {isOpen && (
              <div className="list-accordion__item__content__inner">
                <div className="list-accordion__item__content__item">
                  <div className="box-register">
                    <ul>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            期間
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.date}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            行先
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.destination}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            事由
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.destination}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            備考
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.note}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="box-approves">
                    <div className="box-approves__inner">
                      <p className="box-approves__headding">承認状況</p>
                      <ul>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__title">
                              <span>申</span>
                            </div>
                            <div className="box-approves__item__content">
                              <p className="box-approves__item__content__text">
                                申請者名：{accordionItems.realname}（申請日時：
                                {accordionItems.date}
                                {'\u00A0\u00A0'}
                                {accordionItems.time}）
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__title">
                              <span>1</span>
                            </div>
                            <div className="box-approves__item__content">
                              <p className="box-approves__item__content__text">
                                承認者名：{accordionItems.owner}（申請日時：
                                {accordionItems.date}
                                {'\u00A0\u00A0'}
                                {accordionItems.time}）
                              </p>
                              {commentFirst.length > 0 && (
                                <div className="box-approves__item__content__comment">
                                  {commentFirst.map((commentItem, index) => (
                                    <div
                                      key={index}
                                      className="box-approves__item__content__comment__item"
                                    >
                                      <p className="box-approves__item__content__comment__head">
                                        <span className="box-approves__item__content__comment__title">
                                          {commentItem.realname}
                                          ：（{commentItem.createdAt}）
                                        </span>
                                        <span
                                          className="btn-delete"
                                          onClick={() =>
                                            handDelete(commentItem.id)
                                          }
                                        >
                                          <img
                                            src={require('../../../../assets/close.png')}
                                            alt="delete"
                                            className="fluid-image"
                                          />
                                        </span>
                                      </p>
                                      <p className="box-approves__item__content__comment__text">
                                        {commentItem.note}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <textarea
                                placeholder="ココメントを入力（任意1000文字以内）"
                                value={textValue}
                                onChange={(event) =>
                                  setTextValue(event.target.value)
                                }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a
                                    className="btncomment btn02"
                                    onClick={handleSubmit}
                                  >
                                    コメントする
                                  </a>
                                </span>
                              </p>
                              <p className="list-btn">
                                <span className="list-btn__item">
                                  <span className={statusattr.statusattrClass}>
                                    {statusattr.statusattrTexts}
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__title">
                              <span>2</span>
                            </div>
                            <div className="box-approves__item__content">
                              <p className="box-approves__item__content__text">
                                承認者名：{accordionItems.owner}（申請日時：
                                {accordionItems.date}
                                {'\u00A0\u00A0'}
                                {accordionItems.time}）
                              </p>
                              {commentSeCond.length > 0 && (
                                <div className="box-approves__item__content__comment">
                                  {commentSeCond.map((commentItem, index) => (
                                    <div
                                      key={index}
                                      className="box-approves__item__content__comment__item"
                                    >
                                      <p className="box-approves__item__content__comment__head">
                                        <span className="box-approves__item__content__comment__title">
                                          {commentItem.realname}
                                          ：（{commentItem.createdAt}）
                                        </span>
                                        <span
                                          className="btn-delete"
                                          onClick={() =>
                                            handDeleteSeCond(commentItem.id)
                                          }
                                        >
                                          <img
                                            src={require('../../../../assets/close.png')}
                                            alt="delete"
                                            className="fluid-image"
                                          />
                                        </span>
                                      </p>
                                      <p className="box-approves__item__content__comment__text">
                                        {commentItem.note}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <textarea
                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                value={commentValue}
                                onChange={(event) =>
                                  setCommentValue(event.target.value)
                                }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a
                                    className="btncomment btn02"
                                    onClick={handleAddCommentSeCond}
                                  >
                                    コメントする
                                  </a>
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__title">
                              <span className="active">3</span>
                            </div>
                            <div className="box-approves__item__content">
                              <p className="box-approves__item__content__text">
                                承認者名：承認者名が入ります
                              </p>
                              <textarea
                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                // value={textValue}
                                // onChange={(event) =>
                                //   setTextValue(event.target.value)
                                // }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a href="#" className="btncomment btn02">
                                    コメントする
                                  </a>
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__title">
                              <span>未</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item box-approves__item--01">
                            <div className="box-approves__item__title">
                              <span className="bg-blue01 color-white">完</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item box-approves__item--01">
                            <div className="box-approves__item__title">
                              <span className="bg-red01 color-white">却</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item box-approves__item--01">
                            <div className="box-approves__item__title">
                              <span className="bg-blue01 color-white">下</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item box-approves__item--01">
                            <div className="box-approves__item__title">
                              <span className="bg-blue01 color-white">消</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
