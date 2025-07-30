import dynamic from 'next/dynamic'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Providers } from '@/redux/provider'
import Link from 'next/link'
import styles from '../styles/global/Global.module.scss'
const Panier = dynamic(
    () => import('../components/Panier'),
    {ssr: false}
)

export default function RootLayout({ children }) {
  return (
    <Providers>
        <html lang="en">
        <body>
          <header className={`${styles["header"]}`}>
                <div className="container">
                    <div className={`${styles["header-top"]}`}>
                        <div className={`${styles["header-top--left"]}`}>
                            <div className={`${styles["header-top--left-logo"]}`}>
                                <h2>
                                    <Link href="/" style={{color: "#000", textDecoration: "none"}}>
                                      Logo ici
                                    </Link>
                                </h2>
                            </div>
                            <div className={`${styles["headertop--left-menu"]}`}>
                                <ul className={`${styles["navigation"]}`}>
                                    <li><Link href="/">Accueil</Link></li>
                                    <li><Link href="/articles">Articles</Link></li>
                                    <li><Link href="/contactez-nous">Contactez-nous</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${styles["header-top--right"]}`}>
                          <Panier />
                        </div>
                    </div>
                </div>
            </header>
            {/* call children */}
            {children}
            {/* end call children */}
            <footer className={`${styles["footer"]}`}>
              <div className="container">
                  <div className={`text-center ${styles["footer-txt"]}`}>
                  © {new Date().getFullYear()} Copyright <span>Lorem ipsum</span>
                  </div>
              </div>
            </footer>
        </body>
      </html>
    </Providers>
  )
}