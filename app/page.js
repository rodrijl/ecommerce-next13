import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Nextjs Ecommerce App</h1>
      <h2>To start go to <Link href='/products'>Products</Link></h2>
    </main>
  )
}
