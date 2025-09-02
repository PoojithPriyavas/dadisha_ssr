import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Context } from '../../context/context';

export default function CatDropDown() {
  const { homeData, gethomeData } = useContext(Context);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    gethomeData();
  }, []);

  useEffect(() => {
    if (homeData && homeData.main_categories) {
      const transformedItems = homeData.main_categories.map(category => ({
        label: category.name,
        key: category.id.toString(),
      }));
      setItems(transformedItems);
    }
  }, [homeData]);

  const handleCategoryMenuClick = ({ key }) => {
    const selected = items.find(item => item.key === key);
    setSelectedCategory(selected);
  };

  const categorymenu = {
    items,
    onClick: handleCategoryMenuClick,
  };

  return (
    <Dropdown menu={categorymenu} trigger={['click']}>
      <a onClick={e => e.preventDefault()} style={{ textDecoration: 'none' }}>
        <Space className="fw-600 text-black px-0" style={{ fontSize: '1rem' }}>
          <span>
            {selectedCategory ? selectedCategory.label : 'All Categories'}
            <DownOutlined className="ms-2" />
          </span>
        </Space>
      </a>
    </Dropdown>
  );
}
