import React, { useEffect, useState } from 'react';
import { Heading2 } from '../../components/Heading';
import { Tab } from './tab';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

export const Application = () => {
  const axiosPrivate = useAxiosPrivate();
  const [activeTab, setActiveTab] = useState('tab2');
  const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [statusTotal, setStatusTotal] = useState(0);

  const handleTabClick = (tab) => {
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

      // Cập nhật statusCount
      setStatusCount(updatedStatusCount);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  useEffect(() => {
    Load();
  }, []);
  useEffect(() => {
    Load();
  }, [activeTab]);

  return (
    <div>
      <div className="grid-row grid-flex">
        <Heading2 text="申請状況" />
        <Link to="/Search">
          {' '}
          <img
            src={require('../../../../assets/icn-search.png')}
            alt=""
            className="fluid-image class-img"
          />{' '}
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
                {activeTab === 'tab1' && <Tab key="tab1" id_status={1} />}
                {activeTab === 'tab2' && <Tab key="tab2" id_status={-1} />}
                {activeTab === 'tab3' && <Tab key="tab3" id_status={2} />}
                {activeTab === 'tab4' && <Tab key="tab4" id_status={3} />}
                {activeTab === 'tab5' && <Tab key="tab5" id_status={4} />}
                {activeTab === 'tab6' && <Tab key="tab6" id_status={5} />}
                {activeTab === 'tab7' && <Tab key="tab7" id_status={6} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
