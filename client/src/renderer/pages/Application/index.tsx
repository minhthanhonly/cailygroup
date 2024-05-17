import { useEffect, useState } from 'react';
import { Heading2 } from '../../components/Heading';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { Search } from '../Search/index';
import TabContent from '../Application/tabContent';
import { toast } from 'react-toastify';
import { PaginationJp } from '../../components/PaginationJp';

export const Application = () => {
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
      const response = await axiosPrivate.get('application', {
        params: { id_status: -1 },
      });
      const data = response.data;
      setStatusTotal(data.length);
      // Tạo một bản sao của statusCount
      let updatedStatusCount = [0, 0, 0, 0, 0, 0, 0];
      // Cập nhật updatedStatusCount dựa trên dữ liệu mới
      data.forEach((item: any) => {
        const statusIndex = parseInt(item.id_status);
        if (
          !isNaN(statusIndex) &&
          statusIndex >= 0 &&
          statusIndex < updatedStatusCount.length
        ) {
          updatedStatusCount[statusIndex] += 1;
        }
      });
      // Cập nhật statusCount
      setStatusCount(updatedStatusCount);
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
        // console.log('id_status:', idStatus);
        const response = await axiosPrivate.get('application', {
          params: {
            id_status: idStatus,
          },
        });
        const data = response.data;
        setItems(data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái :', error);
      }
    };
    LoadTab();
  }, [activeTab]);
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
  useEffect(() => {
    Load();
  }, [activeTab]);
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
