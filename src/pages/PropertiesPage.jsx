// 物件一覧画面（ログイン後に表示される）
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './PropertiesPage.module.css'

// ダミーデータ：実際の運用ではSupabaseのDBから取得する
const DUMMY_PROPERTIES = [
  {
    id: 1,
    name: 'グランドメゾン渋谷',
    area: '東京都渋谷区',
    rent: 180000,
    type: '1LDK',
    floor: '5F / 10F',
    image: '🏢',
  },
  {
    id: 2,
    name: 'サニーコート新宿',
    area: '東京都新宿区',
    rent: 120000,
    type: '1K',
    floor: '3F / 8F',
    image: '🏠',
  },
  {
    id: 3,
    name: 'リバーサイド品川',
    area: '東京都品川区',
    rent: 250000,
    type: '2LDK',
    floor: '12F / 20F',
    image: '🏙️',
  },
  {
    id: 4,
    name: 'エクセレント池袋',
    area: '東京都豊島区',
    rent: 95000,
    type: '1K',
    floor: '2F / 6F',
    image: '🏡',
  },
  {
    id: 5,
    name: 'パークハイム目黒',
    area: '東京都目黒区',
    rent: 200000,
    type: '2LDK',
    floor: '8F / 15F',
    image: '🏘️',
  },
  {
    id: 6,
    name: 'コスモス横浜',
    area: '神奈川県横浜市',
    rent: 85000,
    type: '1K',
    floor: '4F / 7F',
    image: '🏗️',
  },
]

export default function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.logo}>不動産管理システム</h1>
          <div className={styles.headerRight}>
            <span className={styles.userEmail}>{user?.email}</span>
            <button className={styles.logoutButton} onClick={handleSignOut}>
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h2 className={styles.pageTitle}>物件一覧</h2>
          <p className={styles.count}>{DUMMY_PROPERTIES.length}件の物件</p>
        </div>

        {/* 物件カード一覧 */}
        <div className={styles.grid}>
          {DUMMY_PROPERTIES.map((property) => (
            <div key={property.id} className={styles.card}>
              <div className={styles.cardImage}>{property.image}</div>
              <div className={styles.cardBody}>
                <h3 className={styles.propertyName}>{property.name}</h3>
                <p className={styles.area}>📍 {property.area}</p>
                <div className={styles.details}>
                  <span className={styles.badge}>{property.type}</span>
                  <span className={styles.badge}>{property.floor}</span>
                </div>
                <p className={styles.rent}>
                  <span className={styles.rentAmount}>
                    {property.rent.toLocaleString()}
                  </span>
                  <span className={styles.rentUnit}>円 / 月</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
