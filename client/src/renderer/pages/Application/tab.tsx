import React, { useEffect, useState } from 'react';
import axios, { axiosPrivate } from '../../api/axios';
import { TabContent } from './tabContent';

interface TabContentProps {
  status: string | number;
}
export const Tab: React.FC<TabContentProps & { key: React.Key }> = ({
  status,
  key,
}) => {
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application', {
          params: {
            status: status,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    };
    Load();
  }, []);
  return (
    <div>
      {items.length > 0 && (
        <div>
          {items.map(
            (
              item: { id: string | number },
              index: React.Key | null | undefined,
            ) => (
              <>
                <TabContent key={index} id={item.id} />
              </>
            ),
          )}
        </div>
      )}
    </div>
  );
};
