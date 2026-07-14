import styles from '../public.module.css'

export default function TermsPage() {
  return (
    <div className={styles.legalWrap}>
      <div className={styles.legalCard}>
        <h1 className={styles.legalTitle}>Algemene Voorwaarden</h1>
        <p className={styles.legalDate}>Laatst bijgewerkt: 2 juni 2026</p>

        <section>
          <h2>1. Algemeen</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op het gebruik van SkillSphere Network (hierna: "SkillSphere"),
            een platform voor het ontwikkelen en testen van vaardigheden. Door gebruik te maken van SkillSphere ga je
            akkoord met deze voorwaarden.
          </p>
        </section>

        <section>
          <h2>2. Gebruik van het platform</h2>
          <p>
            SkillSphere biedt gebruikers de mogelijkheid om skills te ontdekken, te oefenen via quizzes en hun voortgang
            bij te houden. Je mag het platform alleen gebruiken voor legitieme doeleinden en in overeenstemming met de
            geldende wet- en regelgeving.
          </p>
        </section>

        <section>
          <h2>3. Accountverantwoordelijkheid</h2>
          <p>
            Je bent zelf verantwoordelijk voor het beveiligen van je account en wachtwoord. SkillSphere is niet
            aansprakelijk voor verlies of schade als gevolg van ongeoorloofd gebruik van je account.
          </p>
        </section>

        <section>
          <h2>4. Intellectueel eigendom</h2>
          <p>
            Alle inhoud op SkillSphere, waaronder vragen, antwoorden, teksten en ontwerpen, is eigendom van
            SkillSphere tenzij anders vermeld. Het is niet toegestaan om inhoud zonder toestemming te kopiëren,
            verspreiden of commercieel te gebruiken.
          </p>
        </section>

        <section>
          <h2>5. Aansprakelijkheid</h2>
          <p>
            SkillSphere wordt aangeboden "as is" zonder garanties. SkillSphere is niet aansprakelijk voor
            directe of indirecte schade voortvloeiend uit het gebruik van het platform, waaronder maar niet
            beperkt tot datalverlies of onderbreking van de dienstverlening.
          </p>
        </section>

        <section>
          <h2>6. Wijzigingen</h2>
          <p>
            SkillSphere behoudt zich het recht voor om deze voorwaarden op elk moment te wijzigen. Wijzigingen
            worden van kracht na publicatie op deze pagina. Bij voortgezet gebruik na wijzigingen ga je akkoord
            met de aangepaste voorwaarden.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Voor vragen over deze voorwaarden kun je contact opnemen via het contactformulier op het platform.
          </p>
        </section>
      </div>
    </div>
  )
}
