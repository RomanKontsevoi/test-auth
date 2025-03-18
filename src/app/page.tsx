'use client'
import {
  areTokensInCookies,
  areTokensInUrl,
  checkLocalStorageTokens,
  clearTokensFromUrl,
  storeTokensFromCookies,
  storeTokensFromUrl
} from '@/app/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (checkLocalStorageTokens()) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (areTokensInCookies()) {
      storeTokensFromCookies()
      setIsAuthenticated(true)
      router.replace(window.location.pathname, {})
    }

    if (areTokensInUrl()) {
      storeTokensFromUrl()
      clearTokensFromUrl()
      setIsAuthenticated(true)
    }
  }, [router])

  const redirectToLogin = useCallback(({ language = 'en' }) => {
    const { search } = window.location

    const currentParams = new URLSearchParams(search)

    currentParams.set('lang', language)

    const params = new URLSearchParams({
      redirect_uri: encodeURIComponent(`${window.origin}/?${currentParams}`)
    })

    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}?${params}`
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className={styles.ctas}>
          <button
            className={styles.primary}
            onClick={() => redirectToLogin({})}
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
