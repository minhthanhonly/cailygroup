import { useEffect, useState } from 'react';
import { Heading2 } from '../../components/Heading';
import { UserRole } from '../../components/UserRole';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { Search } from '../Search/index';
import TabContent from '../Application/tabContent';
import { toast } from 'react-toastify';
import { PaginationJp } from '../../components/PaginationJp';
import { emitter } from '../../layouts/components/Sidebar';
import { stringify } from 'querystring';

export const Application = () => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;
  const axiosPrivate = useAxiosPrivate();
  const [activeTab, setActiveTab] = useState('tab2');
  const [idStatus, setIdStatus] = useState('');
  const [id_status, setIdstatus] = useState('');
  const [items, setItems] = useState<any>([]);
  const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [statusTotal, setStatusTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    handleTabClick(activeTab);
  }, [activeTab]);

  const Load = async () => {
    try {
      const datashare = await axiosPrivate.get('application', {
        params: { id_status: -1 },
      });
      const dbs = datashare.data;
      let response;

      if (isAdmin || isManager) {
        response = await axiosPrivate.get('application', {
          params: { id_status: -1 },
        });
      } else {
        let sharedData = [];

        dbs.forEach((item) => {
          const dataJson = JSON.parse(item.datajson);
          //kiểm tra sự tồn tại của authorizer và coOwner
          if (
            dataJson.authorizer &&
            dataJson.authorizer.includes(users.id.toString())
          ) {
            sharedData.push(item);
          } else if (
            dataJson.coOwner &&
            dataJson.coOwner.includes(users.user_group_id.toString())
          ) {
            sharedData.push(item);
          }
        });

        const userDataResponse = await axiosPrivate.get(
          'application/getapplicationother/' + users.id,
          {
            params: { id_status: -1 },
          },
        );

        // Loại bỏ các mục dữ liệu đã chia sẻ từ userDataResponse.data
        const userData = userDataResponse.data.filter((item) => {
          const dataJson = JSON.parse(item.datajson);
          if (
            dataJson.coOwner &&
            dataJson.coOwner.includes(users.user_group_id.toString())
          ) {
            return false; // Loại bỏ nếu có trong mảng coOwner
          }
          return true;
        });

        response = {
          data: userData.concat(sharedData),
        };
      }

      let data = response.data;

      // Phân tích và sắp xếp dữ liệu theo trường createdAt giảm dần
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; // Sắp xếp giảm dần
      });
      setStatusTotal(data.length);

      let updatedStatusCount = [0, 0, 0, 0, 0, 0, 0];
      data.forEach((item) => {
        const statusIndex = parseInt(item.id_status);
        if (
          !isNaN(statusIndex) &&
          statusIndex >= 0 &&
          statusIndex < updatedStatusCount.length
        ) {
          updatedStatusCount[statusIndex] += 1;


        }
      });

      setStatusCount(updatedStatusCount);
      console.log("updatedStatusCount", updatedStatusCount);

    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  useEffect(() => {
    const LoadTab = async () => {
      try {
        let idStatus;
        if (activeTab === 'tab1') {
          idStatus = 1;
        } else if (activeTab === 'tab2') {
          idStatus = -1;
        } else if (activeTab === 'tab3') {
          idStatus = 2;
        } else if (activeTab === 'tab4') {
          idStatus = 3;
        } else if (activeTab === 'tab5') {
          idStatus = 4;
        } else if (activeTab === 'tab6') {
          idStatus = 5;
        } else if (activeTab === 'tab7') {
          idStatus = 6;
        }
        let response;
        if (isAdmin || isManager) {
          response = await axiosPrivate.get('application', {
            params: { id_status: idStatus },
          });
        } else {
          const userDataResponse = await axiosPrivate.get(
            'application/getapplicationother/' + users.id,
            {
              params: { id_status: idStatus },
            },
          );
          // Lấy dữ liệu chia sẻ từ hàm Load()
          const datashare = await axiosPrivate.get('application', {
            params: { id_status: idStatus },
          });
          const dbs = datashare.data;
          let sharedData = [];

          dbs.forEach((item) => {
            const dataJson = JSON.parse(item.datajson);
            if (
              dataJson.authorizer &&
              dataJson.authorizer.includes(users.id.toString())
            ) {
              sharedData.push(item);
            } else if (
              dataJson.coOwner &&
              dataJson.coOwner.includes(users.user_group_id.toString())
            ) {
              sharedData.push(item);
            }
          });

          // Loại bỏ các mục dữ liệu đã chia sẻ từ userDataResponse.data
          const userData = userDataResponse.data.filter((userDataItem) => {
            const dataJson = JSON.parse(userDataItem.datajson);
            if (
              dataJson.coOwner &&
              dataJson.coOwner.includes(users.user_group_id.toString())
            ) {
              // Trả về false nếu có trong mảng coOwner
              return false;
            }
            return true;
          });

          response = {
            data: userData.concat(sharedData),
          };
        }
        const data = response.data;
        // Phân tích và sắp xếp dữ liệu theo trường createdAt giảm dần
        data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Sắp xếp giảm dần
        });
        setItems(data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    };
    LoadTab();
  }, [activeTab, isAdmin, isManager, isLeader, users.id, users.user_group_id]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDataFromChild = (id_status: any) => {
    setIdstatus(id_status);
    setActiveTab('tab2');
    toast.success('Bạn đã cập nhật trạng thái thành công !');
    Load();
  };
  const handleDeleteAccodion = async (id: any) => {
    try {
      const response = await axiosPrivate.delete(
        `application/deleteaccodion/${id}`,
      );
      if (response.status === 200) {
        emitter.emit('reloadSidebar');
        toast.success('Bạn đã xóa thành công !');
        setActiveTab((prevTab) => (prevTab !== 'tab2' ? 'tab2' : 'tab1'));
        //setActiveTab('tab2');
      } else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  useEffect(() => {
    Load();
  }, [activeTab]);

  const dataToPass = statusCount[1];
  emitter.emit('reloadSidebar', dataToPass);
  console.log(":{statusCount[1]}", statusCount[1]);


  //  tab
  const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7'];
  return (
    <div>
      <div className="grid-row grid-flex">
        <Heading2 text="申請状況" />
        <Link to="/search">
          <img
            src={require('../../../../assets/icn-search.png')}
            alt=""
            className="fluid-image class-img"
          />
        </Link>
      </div>

      <div className="box-application">
        <p className="txt-lead">自分が行った申請の一覧です。</p>
        <div className="box-tab">
          <div className="tab01 tab-head">
            <ul className="lst-branch">
              <li>
                <a
                  onClick={() => handleTabClick('tab1')}
                  className={activeTab === 'tab1' ? 'active' : ''}
                >
                  進行中({statusCount[1]})
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  onClick={() => handleTabClick('tab2')}
                  className={activeTab === 'tab2' ? 'active' : ''}
                >
                  すべて({statusTotal})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab3')}
                  className={activeTab === 'tab3' ? 'active' : ''}
                >
                  差し戻し({statusCount[2]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab4')}
                  className={activeTab === 'tab4' ? 'active' : ''}
                >
                  却下({statusCount[3]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab5')}
                  className={activeTab === 'tab5' ? 'active' : ''}
                >
                  完了({statusCount[4]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab6')}
                  className={activeTab === 'tab6' ? 'active' : ''}
                >
                  下書き({statusCount[5]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab7')}
                  className={activeTab === 'tab7' ? 'active' : ''}
                >
                  取り消し({statusCount[6]})
                </a>
              </li>
            </ul>
          </div>
          <div className="tab01 tab-content">
            <div className="list-accordion">
              <div className="list-accorditon__inner">
                {tabs.map(
                  (tab) =>
                    activeTab === tab && (
                      <div className="table_content" key={tab}>
                        {Array.isArray(items) && items.length > 0 && (
                          <div>
                            {currentItems.map((item: any, index: any) => (
                              <TabContent
                                key={index}
                                id={item.id}
                                sendDataToParent={handleDataFromChild}
                                sendIdToParent={handleDeleteAccodion}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationJp
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
