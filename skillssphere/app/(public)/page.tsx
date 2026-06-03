import Link from 'next/link'
import styles from './public.module.css'

export default function HomePage() {
  return (
    <div className={styles.landing}>
      {/* Hero — split screen */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>Student Skill Network</p>
          <h1 className={styles.heroTitle}>
            Wat kun jij
            <span className={styles.heroTitleAccent}>echt?</span>
          </h1>
          <p className={styles.heroText}>
            SkillSphere is het platform waar studenten hun vaardigheden 
            registreren, laten valideren en zichtbaar maken. 
            Geen cv, maar een live profiel van wat je in huis hebt.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/register" className={styles.heroBtnPrimary}>
              Account maken <span>→</span>
            </Link>
            <Link href="/login" className={styles.heroBtnSecondary}>
              Inloggen
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroVisual}>
            <div className={styles.heroStatNumber}>12</div>
            <div className={styles.heroStatLabel}>aangesloten studenten</div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStatNumber}>8</div>
            <div className={styles.heroStatLabel}>geregistreerde skills</div>
          </div>
        </div>
      </section>

      {/* Marquee banner */}
      <div className={styles.banner}>
        <div className={styles.bannerTrack}>
          {[...Array(2)].map((_, i) => (
            <div className={styles.bannerItem} key={i}>
              <span>Design Thinking</span>
              <span className={styles.bannerDot} />
              <span>Programmeren</span>
              <span className={styles.bannerDot} />
              <span>Communicatie</span>
              <span className={styles.bannerDot} />
              <span>Projectmanagement</span>
              <span className={styles.bannerDot} />
              <span>Creativiteit</span>
              <span className={styles.bannerDot} />
              <span>Data Analyse</span>
              <span className={styles.bannerDot} />
              <span>Presenteren</span>
              <span className={styles.bannerDot} />
              <span>Samenwerken</span>
              <span className={styles.bannerDot} />
            </div>
          ))}
        </div>
      </div>

      {/* Story + cards */}
      <section className={styles.story}>
        <div>
          <p className={styles.storyLabel}>Waarom dit platform</p>
          <h2 className={styles.storyTitle}>
            Skills verdienen<br />meer dan een<br />regel op je cv
          </h2>
          <p className={styles.storyText}>
            Op papier zie je welke vakken iemand heeft gevolgd. 
            Maar wat iemand écht kan, blijft vaak onzichtbaar. 
            SkillSphere brengt daar verandering in.
          </p>
          <p className={styles.storyText}>
            Studenten voegen zelf hun vaardigheden toe, anderen 
            kunnen deze valideren. Zo ontstaat een betrouwbaar 
            beeld van iemands kunnen — voor jezelf, je netwerk 
            en toekomstige opdrachten.
          </p>
        </div>
        <div className={styles.storyRight}>
          <div className={styles.storyCard}>
            <h3 className={styles.storyCardTitle}>Zelf bepalen wat je deelt</h3>
            <p className={styles.storyCardText}>
              Jij kiest welke vaardigheden je toevoegt en op welk niveau. 
              Geen vaststaande lijst, maar wat past bij jou.
            </p>
          </div>
          <div className={styles.storyCard}>
            <h3 className={styles.storyCardTitle}>Laten zien, niet zeggen</h3>
            <p className={styles.storyCardText}>
              Laat medestudenten bevestigen wat jij kunt. 
              Validaties geven gewicht aan je profiel.
            </p>
          </div>
          <div className={styles.storyCard}>
            <h3 className={styles.storyCardTitle}>Altijd actueel</h3>
            <p className={styles.storyCardText}>
              Geen verouderd cv meer. Je profiel groeit mee 
              met de vaardigheden die je ontwikkelt.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statBlock}>
          <div className={styles.statNum}>12</div>
          <div className={styles.statDesc}>studenten</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNum}>8</div>
          <div className={styles.statDesc}>vaardigheden</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNum}>3</div>
          <div className={styles.statDesc}>niveaus</div>
        </div>
        <div className={styles.statBlock}>
          <div className={styles.statNum}>0</div>
          <div className={styles.statDesc}>verbindingen</div>
        </div>
      </div>

      {/* Pull quote */}
      <div className={styles.pull}>
        <p className={styles.pullQuote}>
          &ldquo;Niet wat je gestudeerd hebt, maar wat je kunt&rdquo;
        </p>
        <p className={styles.pullAttribution}>
          — Skills onder de aandacht brengen werkt anders
        </p>
      </div>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>
          Doe mee
        </h2>
        <p className={styles.finalCtaText}>
          Zet jij je skills op de kaart?
        </p>
        <Link href="/register" className={styles.heroBtnPrimary}>
          Account maken <span>→</span>
        </Link>
      </section>
    </div>
  )
}
