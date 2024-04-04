import React, { useEffect, useState } from 'react';
import { Heading2 } from '../../components/Heading';
import { Tab } from './tab';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';

export const Application = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0, 0]);
  const [statusTotal, setStatusTotal] = useState(0);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    handleTabClick(activeTab);
  }, [activeTab]);

  const Load = async () => {
    try {
      setStatusCount([0, 0, 0, 0, 0, 0]);
      const response = await axiosPrivate.get('application', {
        params: { status: -1 },
      });
      let data = response.data;
      setStatusTotal(data.length);
      data.forEach((item: any) => {
        const statusIndex = parseInt(item.status);
        if (
          !isNaN(statusIndex) &&
          statusIndex >= 0 &&
          statusIndex < statusCount.length
        ) {
          setStatusCount((prevState) => {
            const newState = [...prevState];
            newState[statusIndex] += 1;
            return newState;
          });
        }
      });
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
      <Heading2 text="申請状況" />
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
                  進行中({statusCount[0]})
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
                  差し戻し({statusCount[1]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab4')}
                  className={activeTab === 'tab4' ? 'active' : ''}
                >
                  却下({statusCount[2]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab5')}
                  className={activeTab === 'tab5' ? 'active' : ''}
                >
                  完了({statusCount[3]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab6')}
                  className={activeTab === 'tab6' ? 'active' : ''}
                >
                  下書き({statusCount[4]})
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleTabClick('tab7')}
                  className={activeTab === 'tab7' ? 'active' : ''}
                >
                  取り消し({statusCount[5]})
                </a>
              </li>
            </ul>
          </div>
          <div className="tab01 tab-content">
            <div className="list-accordion">
              <div className="list-accorditon__inner">
                {activeTab === 'tab1' && <Tab key="tab1" status={0} />}
                {activeTab === 'tab2' && <Tab key="tab2" status={-1} />}
                {activeTab === 'tab3' && <Tab key="tab3" status={1} />}
                {activeTab === 'tab4' && <Tab key="tab4" status={2} />}
                {activeTab === 'tab5' && <Tab key="tab5" status={3} />}
                {activeTab === 'tab6' && <Tab key="tab6" status={4} />}
                {activeTab === 'tab7' && <Tab key="tab7" status={5} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
