import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import deleteIcon from '../../../../assets/icn-delete.png';
import { Register } from './register';
import { UserRole } from '../../components/UserRole';
import { emitter } from '../../layouts/components/Sidebar/index';
import './Accordion.scss';
import Modaldelete from '../../components/Modal/Modaldelete';
import { Link } from 'react-router-dom';

const TabContent = ({ id, sendDataToParent, sendIdToParent }) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;
  const isMember = users.roles === UserRole.MEMBER;
  const axiosPrivate = useAxiosPrivate();
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [Items, setItems] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [commentFirst, setCommentFirst] = useState<any>([]);
  const [textValue, setTextValue] = useState('');
  // const [commentValue, setCommentValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
    statusattrTexts: '',
    statusattrClass: '',
  });
  const [userEmailReg, setUserEmailReg] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState('');
  const [idStatus, setIdStatus] = useState<any>([]);
  const [userData, setUserData] = useState([]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const Load = async () => {
    try {
      const response = await axiosPrivate.get('application/getforid/' + id);
      const data = response.data;
      setItems(response.data);
      const itemWithStatus = {
        ...JSON.parse(data.datajson), // Sử dụng data.datajson trực tiếp
        id_status: data.id_status,
      };
      setAccordionItems(itemWithStatus);
    } catch (error) {
      //console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    Load();
  }, [id]);

  const LoadIdStatus = async () => {
    try {
      const response = await axiosPrivate.get('application/getallstatus');
      const data = response.data;
      setIdStatus(response.data);
    } catch (error) {
      console.log('Không tìm thấy idStatus', error);
    }
  };
  useEffect(() => {
    LoadIdStatus();
  }, []); //idStatus

  // Tiến hành gửi mail gồm dữ liệu gửi mail và hành động thực hiện (Comment hoặc Click thay đổi trạng thái)
  const sendMailWhenCmt = async (idStatus, cmtData, action) => {
    let nameStatus = '';
    switch (idStatus) {
      case '1':
        nameStatus = '承認待ち';
        break;
      case '2':
        nameStatus = '差し戻し';
        break;
      case '3':
        nameStatus = '却下';
        break;
      case '4':
        nameStatus = '完了';
        break;
      case '5':
        nameStatus = '下書き';
        break;
      default:
        nameStatus = '取り消し';
        break;
    }

    const parsedDataJson = JSON.parse(Items.datajson);
    setUserEmailReg(parsedDataJson.userEmailReg);
    const mailData = {
      appName: accordionItems.appName,
      nameStatus: nameStatus,
      userNameReg: Items.owner,
      userEmailReg: parsedDataJson.userEmailReg,
      userCmt: users.realname,
      dataCmt: cmtData,
      action: action,
    };
    const sendMail = await axiosPrivate.post('application/mail', mailData);
  };

  const handleToGetId = async (id: any) => {
    try {
      sendIdToParent(id);
      closeModaldelete();
    } catch (error) {
      console.log('Không lấy được id:', error);
    }
  };
  const openModaldelete = async (id: any) => {
    setDeleteModalId(id);
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  const handleStatusClick = async (event: any) => {
    try {
      const id_status = event.currentTarget.getAttribute('data-id_status');
      // kiểm tra nếu statusattrText khớp với điều kiện không được click
      if (
        (approve.statusattrTexts === '承認待ち' && id_status === '1') ||
        (approve.statusattrTexts === '承認済み' && id_status === '4') ||
        (approve.statusattrTexts === '差し戻し' && id_status === '2') ||
        (approve.statusattrTexts === '却下' && id_status === '3') ||
        (approve.statusattrTexts === '下書き' && id_status === '5') ||
        (approve.statusattrTexts === '取り消し' && id_status === '6')
      ) {
        return;
      }
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
      sendDataToParent(idStatusCurrent);
      Load();

      // Send Mail
      let comment_data = '';
      sendMailWhenCmt(id_status, comment_data, 'change-status');
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
    } else if (accordionItems.id_status == 3) {
      setApprove({
        approveTexts: '却下',
        approveClass: 'lbl01 lbl-red',
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
    } else if (accordionItems.id_status == 5) {
      setApprove({
        approveTexts: '下書き',
        approveClass: 'lbl01 lbl-brown',
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

  const getComment = async () => {
    try {
      const response = await axiosPrivate.get('application/getcomment/' + id);
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
    getComment();
  }, []);

  const handleAddComment = async () => {
    const note = textValue.trim(); // Loại bỏ các khoảng trắng dư thừa
    if (note.length === 0) {
      console.error('Không thể thêm comment: Nội dung trống');
      return;
    }
    try {
      const comment_data = {
        note: textValue,
        user_id: users.id,
        aplication_id: id,
        authority_id: 1,
        roles: users.roles,
        user_email: users.user_email,
        authorizer: accordionItems.authorizer,
      };

      setTextValue('');
      const res = await axiosPrivate.post(
        'application/addcomment/',
        comment_data,
      );
      getComment();

      // Send mail
      const id_status = Items.id_status;
      sendMailWhenCmt(id_status, comment_data, 'cmt');
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    try {
      const response = await axiosPrivate.delete(
        `application/deletecomment/${commentId}`,
      );
      if (response.status === 200) {
        console.log('Comment deleted successfully');
        getComment();
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const renderItem = (
    statusId: any,
    label: any,
    isChecked: any,
    handleStatusClick: any,
    shouldBeActive: any,
  ) => {
    const isActive =
      idStatus.length > 0 &&
      (approve.statusattrTexts === idStatus[7]?.name ||
        approve.statusattrTexts === idStatus[6]?.name ||
        approve.statusattrTexts === idStatus[1]?.name ||
        approve.statusattrTexts === idStatus[2]?.name ||
        approve.statusattrTexts === idStatus[4]?.name ||
        approve.statusattrTexts === idStatus[5]?.name);
    return (
      <li key={statusId}>
        <div
          className={`box-approves__item box-approves__item--01 ${
            isChecked ? 'checked' : ''
          } ${shouldBeActive ? 'active' : 'disible'}`}
          onClick={handleStatusClick}
          data-id_status={statusId}
        >
          <div className="box-approves__item__title">
            <span className={shouldBeActive ? 'active' : 'disible'}>
              {label}
            </span>
          </div>
        </div>
      </li>
    );
  };

  const statusItems = [
    { label: '未', activeIndex: 7 },
    { label: '完', activeIndex: 6 },
    { label: '戻', activeIndex: 1 },
    { label: '却', activeIndex: 2 },
    { label: '下', activeIndex: 4 },
    { label: '消', activeIndex: 5 },
  ];

  const getUser = async () => {
    try {
      const response = await axiosPrivate.get(`application/getusers/${id}`);
      const usersData = response.data;
      if (Array.isArray(usersData)) {
        setUserData(usersData);
      } else {
        console.error('Error fetching data: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  const noop = () => {}; // No-op function

  return (
    <>
      <div className="list-accordion__parent">
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className="list-accordion__item__head" onClick={toggleAccordion}>
            <div className="list-accordion__item__head__title">
              <p className="list-accordion__item__head__title__title">
                {accordionItems.appName}
              </p>
              <span className="list-accordion__item__head__title__subtitle">
                {Items.owner}（{Items.createdAt} ）
              </span>
            </div>
            <div className="list-accordion__item__head__btn">
              <p className="list-accordion__item__head__btn__btn">
                <span className={approve.approveClass}>
                  {approve.approveTexts}
                </span>
              </p>

              {userData.length > 0 &&
                userData.map((user, index) => {
                  return user.realname === users.realname ? (
                    <p
                      className="list-accordion__item__head__btn__icn"
                      key={index}
                    >
                      <Link
                        to={`/application/edit/${Items.id}/${accordionItems.appId}`}
                      >
                        <span className="icn-item icn-edit">
                          <img
                            src={editIcon}
                            alt="edit"
                            className="fluid-image"
                          />
                        </span>
                      </Link>
                      <span className="icn-item">
                        <img
                          src={closeIcon}
                          alt="close"
                          className="fluid-image"
                        />
                      </span>
                      <span
                        className="icn-item"
                        onClick={() => openModaldelete(Items.id)}
                      >
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="fluid-image"
                        />
                      </span>
                    </p>
                  ) : null;
                })}
            </div>
          </div>
          <div className="list-accordion__item__content">
            {isOpen && (
              <div className="list-accordion__item__content__inner">
                <div className="list-accordion__item__content__item">
                  <Register id={id} />
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
                                申請者名：{Items.owner}（申請日時：
                                {Items.createdAt}）
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="box-approves__item">
                            <div className="box-approves__item__content">
                              <p className="box-approves__item__content__text">
                                承認者名：
                                {commentFirst.length > 0 &&
                                  commentFirst[0].realname}
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
                                          {isMember &&
                                          commentItem.user_id === users.id ? (
                                            <>
                                              <span
                                                className="btn-delete"
                                                onClick={() =>
                                                  handleDeleteComment(
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
                                          {isAdmin &&
                                          commentItem.user_id === users.id ? (
                                            <>
                                              <span
                                                className="btn-delete"
                                                onClick={() =>
                                                  handleDeleteComment(
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
                                      onClick={handleAddComment}
                                    >
                                      コメントする
                                    </a>
                                  </span>
                                </p>
                              </>

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
                        <li className="box-status">
                          <div>
                            {isLeader || isAdmin || isManager ? (
                              <ul className="list-status">
                                {idStatus.length > 0 && (
                                  <>
                                    {renderItem(
                                      idStatus[0].id, //trong database id_status = 1 nhưng do chạy vòng lặp nên sẽ đếm từ 0
                                      statusItems[0].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[7].name,
                                    )}
                                    {renderItem(
                                      idStatus[3].id, //trong database id_status = 2
                                      statusItems[1].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[6].name,
                                    )}
                                    {renderItem(
                                      idStatus[1].id,
                                      statusItems[2].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[1].name,
                                    )}
                                    {renderItem(
                                      idStatus[2].id,
                                      statusItems[3].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[2].name,
                                    )}
                                    {renderItem(
                                      idStatus[4].id,
                                      statusItems[4].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[4].name,
                                    )}

                                    {renderItem(
                                      idStatus[5].id,
                                      statusItems[5].label,
                                      isChecked,
                                      handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[5].name,
                                    )}
                                  </>
                                )}
                              </ul>
                            ) : (
                              <ul className="list-status">
                                {idStatus.length > 0 && (
                                  <>
                                    {renderItem(
                                      idStatus[0].id, //trong database id_status = 1 nhưng do chạy vòng lặp nên sẽ đếm từ 0
                                      statusItems[0].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[7].name,
                                    )}
                                    {renderItem(
                                      idStatus[3].id, //trong database id_status = 2
                                      statusItems[1].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[6].name,
                                    )}
                                    {renderItem(
                                      idStatus[1].id,
                                      statusItems[2].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[1].name,
                                    )}
                                    {renderItem(
                                      idStatus[2].id,
                                      statusItems[3].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[2].name,
                                    )}
                                    {renderItem(
                                      idStatus[4].id,
                                      statusItems[4].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[4].name,
                                    )}
                                    {renderItem(
                                      idStatus[5].id,
                                      statusItems[5].label,
                                      isChecked,
                                      isMember ? noop : handleStatusClick,
                                      approve.statusattrTexts ===
                                        idStatus[5].name,
                                    )}
                                  </>
                                )}
                              </ul>
                            )}
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

      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <h2>Bạn có chắc chắn muốn xóa không?</h2>
        <div className="wrp-button">
          <button
            className="btn btn--green"
            onClick={(event) => sendIdToParent(isDeleteModalid, event)}
          >
            Đồng ý
          </button>
          <button className="btn btn--orange" onClick={closeModaldelete}>
            Quay lại
          </button>
        </div>
      </Modaldelete>
    </>
  );
};
export default TabContent;
