import React, { useState } from 'react';
import './DashboardSidebar.scss';

/**
 * DashboardSidebar Component - Navigation sidebar with nested menu items
 * 
 * Props:
 * - items: array - Menu items [{label: 'Dashboard', icon: 'fa-dashboard', href: '/dashboard', badge: 5, children: [...]}]
 * - activeItem: string - Active item key
 * - onItemClick: function - Item click handler
 */
const DashboardSidebar = ({ items = [], activeItem = '', onItemClick = null }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (key) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItems = (menuItems, level = 0) => {
    return (
      <ul className={`sidebar-menu sidebar-menu--level-${level}`}>
        {menuItems.map(item => (
          <li key={item.key} className={`sidebar-menu__item`}>
            <button
              className={`sidebar-menu__link ${
                activeItem === item.key ? 'active' : ''
              } ${item.children ? 'has-children' : ''}`}
              onClick={() => {
                if (item.children) {
                  toggleExpand(item.key);
                }
                if (onItemClick) {
                  onItemClick(item);
                }
              }}
            >
              {item.icon && <i className={`sidebar-menu__icon fa ${item.icon}`} />}
              <span className="sidebar-menu__label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-menu__badge">{item.badge}</span>
              )}
              {item.children && (
                <i
                  className={`sidebar-menu__toggle fa fa-chevron-right ${
                    expandedItems.has(item.key) ? 'expanded' : ''
                  }`}
                />
              )}
            </button>

            {item.children && expandedItems.has(item.key) && (
              <div className="sidebar-menu__submenu">
                {renderMenuItems(item.children, level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="dashboard-sidebar">
      <div className="dashboard-sidebar__header">
        <h2 className="dashboard-sidebar__title">Analytics Dashboard</h2>
      </div>

      <div className="dashboard-sidebar__menu">
        {renderMenuItems(items)}
      </div>

      <div className="dashboard-sidebar__footer">
        <p className="dashboard-sidebar__version">v1.0.0</p>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
