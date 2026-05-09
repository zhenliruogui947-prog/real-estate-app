// 会員登録画面
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirm) {
      setError('パスワードが一致しません')
      return
    }
    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return
    }

    setLoading(true)
    const { data, error } = await signUp(email, password)
    setLoading(false)

    if (error) {
      setError('登録に失敗しました: ' + error.message)
      return
    }

    // Supabaseのメール確認が有効な場合はセッションがすぐに発行されない
    if (data.session) {
      navigate('/properties')
    } else {
      setMessage('確認メールを送信しました。メールを確認してアカウントを有効化してください。')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>新規登録</h1>
        <p className={styles.subtitle}>不動産管理システム</p>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上で入力"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirm">パスワード（確認）</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="もう一度入力"
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? '登録中...' : '登録する'}
          </button>
        </form>

        <p className={styles.link}>
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  )
}
