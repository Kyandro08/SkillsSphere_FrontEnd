import styles from '../public.module.css'

export default function CookiesPage() {
  return (
    <div className={styles.legalWrap}>
      <div className={styles.legalCard}>
        <h1 className={styles.legalTitle}>Cookiebeleid</h1>
        <p className={styles.legalDate}>Laatst bijgewerkt: 2 juni 2026</p>

        <section>
          <h2>Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen wanneer je een website bezoekt.
            Ze helpen ons om de website goed te laten functioneren en de gebruikerservaring te verbeteren.
          </p>
        </section>

        <section>
          <h2>Welke cookies gebruiken wij?</h2>

          <h3>Functionele cookies</h3>
          <p>
            Deze cookies zijn noodzakelijk voor de werking van SkillSphere. Ze onthouden bijvoorbeeld je
            inlogstatus zodat je niet op elke pagina opnieuw hoeft in te loggen. Geen toestemming nodig.
          </p>

          <h3>Analytische cookies</h3>
          <p>
            Wij gebruiken analytics om te begrijpen hoe het platform wordt gebruikt, zodat we het kunnen
            verbeteren. Deze gegevens zijn anoniem en niet te herleiden tot individuele gebruikers.
          </p>

          <h3>Sessiecookies</h3>
          <p>
            Sessiecookies worden tijdelijk opgeslagen tijdens je bezoek en verwijderd zodra je de browser sluit.
            Ze worden gebruikt om je sessie te beheren.
          </p>
        </section>

        <section>
          <h2>Cookies beheren</h2>
          <p>
            Je kunt cookies beheren en verwijderen via je browserinstellingen. Houd er rekening mee dat het
            uitschakelen van functionele cookies ervoor kan zorgen dat SkillSphere niet naar behoren werkt.
          </p>
        </section>

        <section>
          <h2>Wijzigingen</h2>
          <p>
            Dit cookiebeleid kan worden bijgewerkt. De meest actuele versie staat altijd op deze pagina.
          </p>
        </section>
      </div>
    </div>
  )
}
