import styles from '../../styles/global/Global.module.scss'
export default function Contact() {
  return (
  <main className={`${styles["main-wrapper"]}`}>
    <div className={`${styles["hp-body-container"]}`}>
        <div className="container">
            <div className={`${styles["container-inner"]}`}>
                Contenu page contactez-nous
            </div>
        </div>
    </div>
  </main>
  )
}