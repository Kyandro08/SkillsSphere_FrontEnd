import styles from '../public.module.css'

export default function PrivacyPage() {
  return (
    <div className={styles.legalWrap}>
      <div className={styles.legalCard}>
        <h1 className={styles.legalTitle}>Privacyverklaring</h1>
        <p className={styles.legalDate}>Laatst bijgewerkt: 2 juni 2026</p>

        <section>
          <h2>1. Wie zijn wij?</h2>
          <p>
            SkillSphere Network (hierna: "SkillSphere") is een platform voor het ontwikkelen en testen van
            vaardigheden. Wij hechten veel waarde aan de privacy van onze gebruikers en verwerken persoonsgegevens
            dan ook zorgvuldig en in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
          </p>
        </section>

        <section>
          <h2>2. Welke gegevens verzamelen wij?</h2>
          <p>Wij verwerken de volgende persoonsgegevens:</p>
          <ul>
            <li>Gebruikersnaam en e-mailadres (bij registratie)</li>
            <li>Voortgang en quizresultaten</li>
            <li>Vriendenlijst en netwerkrelaties</li>
            <li>IP-adres en browsertype (voor analyse en beveiliging)</li>
          </ul>
        </section>

        <section>
          <h2>3. Doeleinden van verwerking</h2>
          <p>Wij gebruiken jouw gegevens voor:</p>
          <ul>
            <li>Het leveren en verbeteren van het platform</li>
            <li>Het bijhouden van je voortgang en prestaties</li>
            <li>Het tonen van de leaderboard-ranglijst</li>
            <li>Beveiliging en fraudepreventie</li>
            <li>Analyse van gebruikersgedrag (anoniem)</li>
          </ul>
        </section>

        <section>
          <h2>4. Verstrekking aan derden</h2>
          <p>
            Wij delen jouw persoonsgegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van
            de dienstverlening (bijvoorbeeld hosting) of wij hiertoe wettelijk verplicht zijn.
          </p>
        </section>

        <section>
          <h2>5. Bewaartermijn</h2>
          <p>
            Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn
            verzameld. Accountgegevens worden bewaard totdat je je account verwijdert.
          </p>
        </section>

        <section>
          <h2>6. Jouw rechten</h2>
          <p>Je hebt het recht om:</p>
          <ul>
            <li>Inzage te vragen in je persoonsgegevens</li>
            <li>Correctie of verwijdering van gegevens aan te vragen</li>
            <li>Bezwaar te maken tegen de verwerking</li>
            <li>Je gegevens over te laten dragen (dataportabiliteit)</li>
            <li>Je account te verwijderen</li>
          </ul>
        </section>

        <section>
          <h2>7. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beveiligen
            tegen verlies, ongeoorloofde toegang en misbruik.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Voor vragen of het uitoefenen van je rechten kun je contact met ons opnemen via het platform.
          </p>
        </section>
      </div>
    </div>
  )
}
