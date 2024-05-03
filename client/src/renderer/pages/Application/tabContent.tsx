import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { Report } from './report';
import { Expense } from './expense';
import { Business } from './business';
import { Travelallowance } from './travelallowance';
import { Register } from './register';
import { Approvalstatus } from './approvalstatus';
import { UserRole } from '../../components/UserRole';
import { emitter } from '../../layouts/components/Sidebar/index';

const TabContent = ({ id, sendDataToParent }) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [commentFirst, setCommentFirst] = useState<any>([]);
  const [commentSeCond, setCommentSeCond] = useState<any>([]);
  const [commentThird, setCommentThird] = useState<any>([]);
  const [textValue, setTextValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [commentValueThird, setCommentValueThird] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [infoStatus, setInfoStatus] = useState('');
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
    statusattrTexts: '',
    statusattrClass: '',
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const Load = async () => {
    try {
      const response = await axiosPrivate.get('application/getforid/' + id);
      const data = response.data;
      //console.log(data);
      const parsedTableJson = JSON.parse(data.tablejson);
      const itemWithStatus = {
        ...parsedTableJson.rows[0], // Giữ nguyên các trường từ dữ liệu cũ
        id_status: data.id_status, // Thêm trường id_status vào dữ liệu
      };
      setAccordionItems(itemWithStatus);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    Load();
  }, [id]);

  const handleStatusClick = async (event: any) => {
    try {
      const id_status = event.currentTarget.getAttribute('data-id_status');
      const dataUpdate = { id, id_status };
      const response = await axiosPrivate.put(
        'application/updatestatus/',
        dataUpdate,
        { headers: { 'Content-Type': 'application/json' } },
      );
      const idStatusCurrent = response.data.info.id_status;
      const response2 = await axiosPrivate.get(
        'application/getapplicationbyidstatus/' + idStatusCurrent,
        { headers: { 'Content-Type': 'application/json' } },
      );
      //console.log(idStatusCurrent);
      sendDataToParent(idStatusCurrent);

      Load();
    } catch (error) {
      console.error('Error updating id_status:', error);
    }
    emitter.emit('reloadSidebar');
  };

  useEffect(() => {
    if (accordionItems.id_status == 1) {
      setApprove({
        approveTexts: '承認待ち',
        approveClass: 'lbl01 lbl-blue',
        statusattrTexts: '承認待ち',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 2) {
      setApprove({
        approveTexts: '差し戻し',
        approveClass: 'lbl01 lbl-yellow',
        statusattrTexts: '差し戻し',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 5) {
      setApprove({
        approveTexts: '下書き',
        approveClass: 'lbl01 lbl-brown',
        statusattrTexts: '却下',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else if (accordionItems.id_status == 4) {
      setApprove({
        approveTexts: '完了',
        approveClass: 'lbl01 lbl-white',
        statusattrTexts: '承認済み',
        statusattrClass: 'lbl01 lbc-blue lbbd-blue',
      });
    } else if (accordionItems.id_status == 3) {
      setApprove({
        approveTexts: '却下',
        approveClass: 'lbl01 lbl-red',
        statusattrTexts: '下書き',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    } else {
      setApprove({
        approveTexts: '取り消し',
        approveClass: 'lbl01',
        statusattrTexts: '取り消し',
        statusattrClass: 'lbl01 lbc-red lbbd-red',
      });
    }
  }, [accordionItems]);

  const getCommentForUserFirst = async () => {
    try {
      const response = await axiosPrivate.get(
        'application/getcommentforuserfirst/' + id,
      );
      const commentData = response.data;
      //console.log(commentData);
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

  const handleAddCommentForUserFirst = async () => {
    const note = textValue.trim(); // Loại bỏ các khoảng trắng dư thừa
    if (note.length === 0) {
      console.error('Không thể thêm comment: Nội dung trống');
      return;
    }
    try {
      const comment_data = {
        note: textValue,
        user_id: users.id,
        id_tablejson: id,
        table_id: accordionItems.table_id,
        authority: 1,
      };
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

  const handleDeleteCommentForUserFirst = async (commentId: any) => {
    try {
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

  const getCommentForUserSecond = async () => {
    try {
      const response = await axiosPrivate.get(
        'application/getcommentforusersecond/' + id,
      );
      const commentData = response.data;
      if (Array.isArray(commentData)) {
        commentData.forEach((commentSeCond) => {});
        setCommentSeCond(commentData);
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
        id_tablejson: id,
        table_id: accordionItems.table_id,
        authority: 2,
      };
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

  const handleDeleteSeCond = async (commentId: any) => {
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

  useEffect(() => {
    getCommentForUserSecond();
  }, [id]);

  const getCommentForUserThird = async () => {
    try {
      const response = await axiosPrivate.get(
        'application/getcommentforuserthird/' + id,
      );
      const commentData = response.data;
      if (Array.isArray(commentData)) {
        commentData.forEach((commentThird) => {});
        setCommentThird(commentData);
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCommentForUserThird();
  }, [id]);

  const handleAddCommentThird = async () => {
    const note = commentValueThird.trim(); // Loại bỏ các khoảng trắng dư thừa
    if (note.length === 0) {
      console.error('Không thể thêm comment: Nội dung trống');
      return;
    }
    try {
      const comment_data = {
        note: commentValueThird,
        user_id: users.id,
        id_tablejson: id,
        table_id: accordionItems.table_id,
        authority: 3,
      };
      setCommentValueThird('');
      const res = await axiosPrivate.post(
        'application/addcommentthird/',
        comment_data,
      );
      getCommentForUserThird();
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const handleDeleteThird = async (commentId: any) => {
    try {
      const response = await axiosPrivate.delete(
        `application/deletecommentthird/${commentId}`,
      );
      if (response.status === 200) {
        console.log('Comment deleted successfully');
        getCommentForUserThird();
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <div className="list-accordion__parent">
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className="list-accordion__item__head" onClick={toggleAccordion}>
            <div className="list-accordion__item__head__title">
              <p className="list-accordion__item__head__title__title">
                {accordionItems.tableName}
              </p>
              <span className="list-accordion__item__head__title__subtitle">
                {accordionItems.owner}（{accordionItems.date} ）
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
                  {accordionItems.table_id === 6 ? (
                    <Register id={id} />
                  ) : accordionItems.table_id === 7 ? (
                    <Expense id={id} />
                  ) : accordionItems.table_id === 8 ? (
                    <Report id={id} />
                  ) : accordionItems.table_id === 9 ? (
                    <Business id={id} />
                  ) : (
                    <Travelallowance id={id} />
                  )}
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
                                  {commentFirst.map(
                                    (commentItem: any, index: any) => (
                                      <div
                                        key={index}
                                        className="box-approves__item__content__comment__item"
                                      >
                                        <p className="box-approves__item__content__comment__head">
                                          <span className="box-approves__item__content__comment__title">
                                            {commentItem.realname}
                                            ：（{commentItem.createdAt}）
                                          </span>

                                          {isAdmin ? (
                                            <>
                                              <span
                                                className="btn-delete"
                                                onClick={() =>
                                                  handleDeleteCommentForUserFirst(
                                                    commentItem.id,
                                                  )
                                                }
                                              >
                                                <img
                                                  src={require('../../../../assets/close.png')}
                                                  alt="delete"
                                                  className="fluid-image"
                                                />
                                              </span>
                                            </>
                                          ) : (
                                            <span></span>
                                          )}
                                        </p>
                                        <p className="box-approves__item__content__comment__text">
                                          {commentItem.note}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                              {isAdmin ? (
                                <>
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
                                        onClick={handleAddCommentForUserFirst}
                                      >
                                        コメントする
                                      </a>
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <div></div>
                              )}
                              <p className="list-btn">
                                <span className="list-btn__item">
                                  <span className={approve.statusattrClass}>
                                    {approve.statusattrTexts}
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
                              </p>
                              {commentSeCond.length > 0 && (
                                <div className="box-approves__item__content__comment">
                                  {commentSeCond.map(
                                    (commentItem: any, index: any) => (
                                      <div
                                        key={index}
                                        className="box-approves__item__content__comment__item"
                                      >
                                        <p className="box-approves__item__content__comment__head">
                                          <span className="box-approves__item__content__comment__title">
                                            {commentItem.realname}
                                            ：（{commentItem.createdAt}）
                                          </span>
                                          {isManager ? (
                                            <>
                                              <span
                                                className="btn-delete"
                                                onClick={() =>
                                                  handleDeleteSeCond(
                                                    commentItem.id,
                                                  )
                                                }
                                              >
                                                <img
                                                  src={require('../../../../assets/close.png')}
                                                  alt="delete"
                                                  className="fluid-image"
                                                />
                                              </span>
                                            </>
                                          ) : (
                                            <span></span>
                                          )}
                                        </p>
                                        <p className="box-approves__item__content__comment__text">
                                          {commentItem.note}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                              {isManager ? (
                                <>
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
                                </>
                              ) : (
                                <div></div>
                              )}
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
                                承認者名：{accordionItems.owner}（申請日時：
                                {accordionItems.date}
                                {'\u00A0\u00A0'}
                                {accordionItems.time}）
                              </p>
                              {commentThird.length > 0 && (
                                <div className="box-approves__item__content__comment">
                                  {commentThird.map(
                                    (commentItem: any, index: any) => (
                                      <div
                                        key={index}
                                        className="box-approves__item__content__comment__item"
                                      >
                                        <p className="box-approves__item__content__comment__head">
                                          <span className="box-approves__item__content__comment__title">
                                            {commentItem.realname}
                                            ：（{commentItem.createdAt}）
                                          </span>
                                          {isLeader ? (
                                            <>
                                              <span
                                                className="btn-delete"
                                                onClick={() =>
                                                  handleDeleteThird(
                                                    commentItem.id,
                                                  )
                                                }
                                              >
                                                <img
                                                  src={require('../../../../assets/close.png')}
                                                  alt="delete"
                                                  className="fluid-image"
                                                />
                                              </span>
                                            </>
                                          ) : (
                                            <span></span>
                                          )}
                                        </p>
                                        <p className="box-approves__item__content__comment__text">
                                          {commentItem.note}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                              {isLeader ? (
                                <>
                                  <textarea
                                    placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                    value={commentValueThird}
                                    onChange={(event) =>
                                      setCommentValueThird(event.target.value)
                                    }
                                  />
                                  <p className="box-approves__item__content__btn">
                                    <span>
                                      <a
                                        className="btncomment btn02"
                                        onClick={handleAddCommentThird}
                                      >
                                        コメントする
                                      </a>
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`box-approves__item ${
                              isChecked ? 'checked' : ''
                            }`}
                            onClick={handleStatusClick}
                            data-id_status={1}
                          >
                            <div className="box-approves__item__title">
                              <span className="is-disible">未</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`box-approves__item box-approves__item--01 ${
                              isChecked ? 'checked' : ''
                            }`}
                            onClick={handleStatusClick}
                            data-id_status={4}
                          >
                            <div className="box-approves__item__title">
                              <span className="bg-blue01 color-white">完</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`box-approves__item box-approves__item--01 ${
                              isChecked ? 'checked' : ''
                            }`}
                            onClick={handleStatusClick}
                            data-id_status={2}
                          >
                            <div className="box-approves__item__title">
                              <span className="bg-red01 color-white">却</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`box-approves__item box-approves__item--01 ${
                              isChecked ? 'checked' : ''
                            }`}
                            onClick={handleStatusClick}
                            data-id_status={3}
                          >
                            <div className="box-approves__item__title">
                              <span className="bg-blue01 color-white">下</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`box-approves__item box-approves__item--01 ${
                              isChecked ? 'checked' : ''
                            }`}
                            onClick={handleStatusClick}
                            data-id_status={6}
                          >
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
export default TabContent;
