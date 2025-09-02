import React, { useState } from "react";
import "./CategorySidebar.css";

const menuData = [
  {
    title: "Dashboard",
    icon: "fa fa-tachometer",
  },
  {
    title: "Products",
    icon: "fa fa-folder",
    children: [
      {
        title: "All Products",
        icon: "fa fa-file",
      },
      {
        title: "Categories",
        icon: "fa fa-folder-open",
        children: [
          {
            title: "Main Categories",
            icon: "fa fa-file-text",
          },
          {
            title: "Subcategories",
            icon: "fa fa-file-text-o",
          },
        ],
      },
    ],
  },
  {
    title: "Orders",
    icon: "fa fa-shopping-cart",
  },
];

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div className="sidebar-item" onClick={() => hasChildren && setOpen(!open)}>
        <div className="sidebar-title">
          <i className={item.icon}></i>
          <span>{item.title}</span>
        </div>
        {hasChildren && (
          <i className={`fa fa-chevron-down chevron ${open ? "rotate" : ""}`}></i>
        )}
      </div>
      {hasChildren && open && (
        <div className="sidebar-children">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategorySidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="menu-button" onClick={toggleSidebar}>
        <i className="fa fa-bars"></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2><i className="fa fa-bars"></i> My Sidebar</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            <i className="fa fa-times"></i>
          </button>
        </div>

        {menuData.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default CategorySidebar;
