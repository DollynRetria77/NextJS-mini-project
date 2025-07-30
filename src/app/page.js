import styles from '../styles/global/Global.module.scss'
export default function Home() {

  return (
  <main className={`${styles["main-wrapper"]}`}>
    <div className={`${styles["hp-body-container"]}`}>
        <div className="container">
            <div className={`${styles["container-inner"]}`}>
                {"Vous êtes sur la page d'accueil"}
            </div>
        </div>
    </div>
  </main>
  )
}
