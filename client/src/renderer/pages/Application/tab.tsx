import React, { useEffect, useState } from 'react';
import { TabContent } from '../Application/tabContent';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface TabContentProps {
  id_status: string | number;
}

export const Tab: React.FC<TabContentProps & { key: React.Key }> = ({
  id_status,
  key,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application', {
          params: {
            id_status: id_status,
          },
        });
        const data = response.data;
        setItems(data);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái :', error);
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
