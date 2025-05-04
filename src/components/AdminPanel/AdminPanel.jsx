import { useState, useEffect } from 'react';

// Встроенные стили
const styles = {
  // Общие стили
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f3ee'
  },
  header: {
    backgroundColor: '#d9a669',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
    padding: '1rem 0'
  },
  headerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem'
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff'
  },
  mainContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '1.5rem 1rem'
  },
  
  // Фильтры
  filterPanel: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
    borderLeft: '4px solid #d9a669'
  },
  filterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterTitle: {
    fontSize: '1.125rem',
    fontWeight: '500'
  },
  filterSelect: {
    border: '1px solid #eab676',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    color: '#5f4a2a',
    outline: 'none'
  },
  
  // Таблица
  tableContainer: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  table: {
    minWidth: '100%',
    borderCollapse: 'collapse'
  },
  tableHead: {
    backgroundColor: 'rgba(234, 182, 118, 0.15)'
  },
  tableHeadCell: {
    padding: '0.75rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#8f6d3a',
    letterSpacing: '0.05em',
    cursor: 'pointer'
  },
  tableHeadCellContent: {
    display: 'flex',
    alignItems: 'center'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb'
  },
  tableRowDetail: {
    backgroundColor: 'rgba(234, 182, 118, 0.08)'
  },
  tableCell: {
    padding: '1rem 1.5rem',
    whiteSpace: 'nowrap'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  userText: {
    marginLeft: '1rem'
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827'
  },
  userEmail: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  orderCount: {
    fontSize: '0.875rem',
    color: '#111827'
  },
  orderTotal: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  regDate: {
    fontSize: '0.875rem',
    color: '#111827'
  },
  actionButton: {
    fontSize: '0.875rem',
    fontWeight: '500',
    marginRight: '1rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer'
  },
  detailsButton: {
    color: '#d9a669',
  },
  deleteButton: {
    color: '#cc6b5a',
  },
  
  // Детали заказов
  orderDetails: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1rem'
  },
  orderDetailsTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '1rem',
    color: '#8f6d3a'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  
  // Карточка заказа
  orderCard: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  orderCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  orderCardInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  orderIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
    width: '2rem',
    borderRadius: '9999px',
    flexShrink: 0
  },
  orderIconGreen: {
    backgroundColor: 'rgba(217, 166, 105, 0.2)',
    color: '#d9a669'
  },
  orderIconYellow: {
    backgroundColor: 'rgba(234, 182, 118, 0.3)',
    color: '#eab676'
  },
  orderIconRed: {
    backgroundColor: '#f8e0da',
    color: '#cc6b5a'
  },
  orderCardTitle: {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  orderCardDate: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  orderCardAmount: {
    textAlign: 'right'
  },
  orderCardAmountValue: {
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  orderCardDetailsButton: {
    color: '#d9a669',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  orderCardItems: {
    marginTop: '0.75rem',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '0.75rem'
  },
  orderCardItemsTitle: {
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  orderCardItemsList: {
    marginTop: '0.25rem',
    paddingLeft: '0.25rem',
    fontSize: '0.875rem',
    color: '#4b5563',
    listStylePosition: 'inside',
    listStyleType: 'disc'
  },
  
  // Статус заказа
  statusBadge: {
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '9999px',
    display: 'inline-block',
    marginLeft: '0.5rem'
  },
  statusCompleted: {
    backgroundColor: 'rgba(217, 166, 105, 0.2)',
    color: '#8f6d3a'
  },
  statusPending: {
    backgroundColor: 'rgba(234, 182, 118, 0.3)',
    color: '#af8446'
  },
  statusCancelled: {
    backgroundColor: '#f8e0da',
    color: '#cc6b5a'
  },
  
  // Инициалы пользователя
  userAvatar: {
    height: '2.5rem',
    width: '2.5rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(234, 182, 118, 0.3)',
    color: '#d9a669'
  },
  userAvatarText: {
    fontWeight: '500'
  },
  
  // Кнопка "Показать все"
  showMoreButton: {
    backgroundColor: 'rgba(217, 166, 105, 0.15)',
    color: '#d9a669',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem',
    fontWeight: '500'
  },
  
  // Состояния загрузки и ошибки
  loadingContainer: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  loadingPulse: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  },
  loadingCircle: {
    height: '3rem',
    width: '3rem',
    backgroundColor: '#eab676',
    borderRadius: '9999px',
    marginBottom: '1rem'
  },
  loadingLine1: {
    height: '1rem',
    width: '8rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem',
    marginBottom: '1rem'
  },
  loadingLine2: {
    height: '0.75rem',
    width: '12rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem'
  },
  errorContainer: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  errorMessage: {
    textAlign: 'center',
    color: '#dc2626'
  },
  errorText: {
    fontSize: '1.125rem',
    fontWeight: '500'
  },
  retryButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#d9a669',
    color: '#ffffff',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer'
  }
};

// Компоненты для админ-панели
const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      style: {...styles.statusBadge, ...styles.statusCompleted},
      label: 'Выполнен'
    },
    pending: {
      style: {...styles.statusBadge, ...styles.statusPending},
      label: 'В обработке'
    },
    cancelled: {
      style: {...styles.statusBadge, ...styles.statusCancelled},
      label: 'Отменен'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span style={config.style}>
      {config.label}
    </span>
  );
};

const UserAvatar = ({ name, colorClass }) => {
  // Преобразуем Tailwind классы в стили
  const colorStyles = {
    'bg-indigo-100': { backgroundColor: 'rgba(217, 166, 105, 0.2)', color: '#d9a669' },
    'bg-purple-100': { backgroundColor: 'rgba(217, 166, 105, 0.2)', color: '#d9a669' },
    'bg-green-100': { backgroundColor: 'rgba(234, 182, 118, 0.3)', color: '#eab676' },
    'bg-pink-100': { backgroundColor: 'rgba(234, 182, 118, 0.3)', color: '#eab676' }
  };
  
  const avatarStyle = {
    ...styles.userAvatar,
    ...colorStyles[colorClass]
  };

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div style={avatarStyle}>
      <span style={styles.userAvatarText}>{initials}</span>
    </div>
  );
};

const OrderItem = ({ order }) => {
  const statusIconStyles = {
    completed: {
      ...styles.orderIcon, 
      backgroundColor: 'rgba(217, 166, 105, 0.2)',
      color: '#d9a669'
    },
    pending: {
      ...styles.orderIcon, 
      backgroundColor: 'rgba(234, 182, 118, 0.3)',
      color: '#eab676'
    },
    cancelled: {
      ...styles.orderIcon, 
      backgroundColor: '#f8e0da',
      color: '#cc6b5a'
    }
  };
  
  const iconStyle = statusIconStyles[order.status] || statusIconStyles.pending;
  
  return (
    <div style={styles.orderCard}>
      <div style={styles.orderCardHeader}>
        <div>
          <div style={styles.orderCardInfo}>
            <div style={iconStyle}>
              <span>📦</span>
            </div>
            <div style={styles.orderCardTitle}>
              <span>Заказ №{order.id}</span>
              <StatusBadge status={order.status} />
            </div>
          </div>
          <div style={styles.orderCardDate}>Оформлен: {order.date}</div>
        </div>
        <div style={styles.orderCardAmount}>
          <div style={styles.orderCardAmountValue}>{order.amount} ₽</div>
          <div>
            <button style={styles.orderCardDetailsButton}>
              <span style={{display: 'inline', marginRight: '0.25rem'}}>📄</span>
              Детали
            </button>
          </div>
        </div>
      </div>
      <div style={styles.orderCardItems}>
        <div style={styles.orderCardItemsTitle}>Товары:</div>
        <ul style={styles.orderCardItemsList}>
          {order.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Главный компонент админ-панели
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Загрузка демо-данных
  useEffect(() => {
    // Имитация загрузки данных с API
    const fetchData = async () => {
      try {
        setLoading(true);
        // В реальном приложении здесь будет fetch запрос к API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Демо-данные
        const sampleUsers = [
          {
            id: 1,
            name: 'Иван Петров',
            email: 'ivan@example.com',
            color: 'bg-indigo-100',
            totalOrders: 3,
            totalSpent: '6,500',
            registrationDate: '10 апреля 2025',
            orders: [
              {
                id: '1234',
                status: 'completed',
                date: '15 апреля 2025',
                amount: '2,500',
                items: ['Смартфон Galaxy A52 - 1 шт.', 'Защитное стекло - 1 шт.']
              },
              {
                id: '1235',
                status: 'pending',
                date: '28 апреля 2025',
                amount: '3,200',
                items: ['Наушники TWS Pro - 1 шт.', 'Чехол для наушников - 1 шт.']
              },
              {
                id: '1236',
                status: 'cancelled',
                date: '30 апреля 2025',
                amount: '800',
                items: ['Зарядное устройство Type-C - 1 шт.']
              }
            ]
          },
          {
            id: 2,
            name: 'Мария Сидорова',
            email: 'maria@example.com',
            color: 'bg-purple-100',
            totalOrders: 1,
            totalSpent: '12,000',
            registrationDate: '15 марта 2025',
            orders: [
              {
                id: '1237',
                status: 'completed',
                date: '20 марта 2025',
                amount: '12,000',
                items: ['Ноутбук ProBook 450 - 1 шт.', 'Мышь беспроводная - 1 шт.', 'Сумка для ноутбука - 1 шт.']
              }
            ]
          },
          {
            id: 3,
            name: 'Алексей Кузнецов',
            email: 'alex@example.com',
            color: 'bg-green-100',
            totalOrders: 5,
            totalSpent: '24,350',
            registrationDate: '2 февраля 2025',
            orders: [
              {
                id: '1238',
                status: 'completed',
                date: '5 февраля 2025',
                amount: '5,700',
                items: ['Монитор 27" - 1 шт.']
              },
              {
                id: '1239',
                status: 'completed',
                date: '15 февраля 2025',
                amount: '8,300',
                items: ['Игровая клавиатура - 1 шт.', 'Игровая мышь - 1 шт.']
              },
              {
                id: '1240',
                status: 'completed',
                date: '1 марта 2025',
                amount: '4,500',
                items: ['Наушники с микрофоном - 1 шт.']
              },
              {
                id: '1241',
                status: 'pending',
                date: '15 апреля 2025',
                amount: '3,650',
                items: ['SSD накопитель 1TB - 1 шт.']
              },
              {
                id: '1242',
                status: 'pending',
                date: '25 апреля 2025',
                amount: '2,200',
                items: ['Веб-камера HD - 1 шт.', 'USB хаб - 1 шт.']
              }
            ]
          },
          {
            id: 4,
            name: 'Елена Волкова',
            email: 'elena@example.com',
            color: 'bg-pink-100',
            totalOrders: 2,
            totalSpent: '7,800',
            registrationDate: '20 марта 2025',
            orders: [
              {
                id: '1243',
                status: 'completed',
                date: '25 марта 2025',
                amount: '3,400',
                items: ['Фитнес-браслет - 1 шт.', 'Ремешок запасной - 2 шт.']
              },
              {
                id: '1244',
                status: 'cancelled',
                date: '10 апреля 2025',
                amount: '4,400',
                items: ['Планшет 10" - 1 шт.']
              }
            ]
          }
        ];
        
        setUsers(sampleUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке данных');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Функция для фильтрации по статусу
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  // Функция для сортировки
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  // Функция для отображения деталей пользователя
  const toggleUserDetails = (userId) => {
    setActiveUser(activeUser === userId ? null : userId);
  };

  // Сортировка пользователей
  const sortedUsers = [...users].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'orders') {
      comparison = a.totalOrders - b.totalOrders;
    } else if (sortBy === 'date') {
      // Простое сравнение для демо
      comparison = new Date(a.registrationDate) - new Date(b.registrationDate);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Добавляем анимацию для пульсации
  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `;

  return (
    <div style={styles.container}>
      {/* Добавляем стили анимации */}
      <style>
        {pulseKeyframes}
      </style>
      
      {/* Шапка */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Админ-панель</h1>
        </div>
      </header>

      {/* Основной контент */}
      <main style={styles.mainContent}>
        {/* Панель фильтров */}
        <div style={styles.filterPanel}>
          <div style={styles.filterHeader}>
            <h2 style={styles.filterTitle}>Пользователи и заказы</h2>
            <div>
              <select
                style={styles.filterSelect}
                value={filterStatus}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">Все статусы</option>
                <option value="completed">Выполнен</option>
                <option value="pending">В обработке</option>
                <option value="cancelled">Отменен</option>
              </select>
            </div>
          </div>
        </div>

        {/* Таблица пользователей */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingPulse}>
              <div style={styles.loadingCircle}></div>
              <div style={styles.loadingLine1}></div>
              <div style={styles.loadingLine2}></div>
            </div>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <div style={styles.errorMessage}>
              <p style={styles.errorText}>Ошибка загрузки данных</p>
              <button style={styles.retryButton}>
                Попробовать снова
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th 
                    style={styles.tableHeadCell}
                    onClick={() => handleSort('name')}
                  >
                    <div style={styles.tableHeadCellContent}>
                      <span>Пользователь</span>
                      {sortBy === 'name' && (
                        <span style={{marginLeft: '0.25rem'}}>
                          {sortDirection === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    style={styles.tableHeadCell}
                    onClick={() => handleSort('orders')}
                  >
                    <div style={styles.tableHeadCellContent}>
                      <span>Заказы</span>
                      {sortBy === 'orders' && (
                        <span style={{marginLeft: '0.25rem'}}>
                          {sortDirection === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    style={styles.tableHeadCell}
                    onClick={() => handleSort('date')}
                  >
                    <div style={styles.tableHeadCellContent}>
                      <span>Дата регистрации</span>
                      {sortBy === 'date' && (
                        <span style={{marginLeft: '0.25rem'}}>
                          {sortDirection === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th style={styles.tableHeadCell}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <>
                    <tr key={user.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <div style={styles.userInfo}>
                          <UserAvatar name={user.name} colorClass={user.color} />
                          <div style={styles.userText}>
                            <div style={styles.userName}>{user.name}</div>
                            <div style={styles.userEmail}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.orderCount}>{user.totalOrders} заказов</div>
                        <div style={styles.orderTotal}>{user.totalSpent} ₽</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.regDate}>{user.registrationDate}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <button 
                          onClick={() => toggleUserDetails(user.id)}
                          style={{...styles.actionButton, ...styles.detailsButton}}
                        >
                          {activeUser === user.id ? "Скрыть" : "Детали"}
                        </button>
                        <button style={{...styles.actionButton, ...styles.deleteButton}}>
                          🗑️
                        </button>
                      </td>
                    </tr>

                    {/* Детали пользователя */}
                    {activeUser === user.id && (
                      <tr style={styles.tableRowDetail}>
                        <td colSpan="4" style={styles.tableCell}>
                          <div style={styles.orderDetails}>
                            <h4 style={styles.orderDetailsTitle}>Заказы {user.name}</h4>
                            <div style={styles.ordersList}>
                              {user.orders.length > 0 ? (
                                user.orders
                                  .filter(order => filterStatus === 'all' || order.status === filterStatus)
                                  .map((order, index) => (
                                    <OrderItem key={index} order={order} />
                                  ))
                              ) : (
                                <div style={{textAlign: 'center', color: '#6b7280', padding: '1rem 0'}}>
                                  У пользователя нет заказов
                                </div>
                              )}
                              
                              {user.orders.length > 3 && (
                                <div style={{textAlign: 'center', marginTop: '0.5rem'}}>
                                  <button style={styles.showMoreButton}>
                                    {activeUser === user.id ? "Свернуть" : "Показать все заказы"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}