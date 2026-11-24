import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Award, Box, Check, ChevronRight, CircleCheck, Factory, Globe2, Layers3, Leaf, Menu, PackageCheck, Recycle, ShieldCheck, ShoppingCart, Smartphone, UtensilsCrossed, X, Zap } from 'lucide-react'

const icons = [Award, Factory, Layers3, Globe2]
const currentYear = new Date().getFullYear()
const industries = [
  { name: 'E-Commerce', icon: ShoppingCart },
  { name: 'FMCG', icon: Box },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Food & Beverage', icon: UtensilsCrossed },
  { name: 'Industrial', icon: Factory },
]

function Logo({ name }) {
  return <a className="logo" href="#home" aria-label={`${name} - home`}><span className="logo-mark"><Box size={29} strokeWidth={1.4} /></span><span>{name.split(' ').slice(0, 2).join(' ')}<br /><strong>{name.split(' ').slice(2).join(' ')}</strong></span></a>
}

function App() {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/content`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load content')
        return response.json()
      })
      .then(setContent)
      .catch((err) => { if (err.name !== 'AbortError') setError(true) })
    return () => controller.abort()
  }, [])

  if (error) return <div className="state-message">Website content could not be loaded. Please try again later.</div>
  if (!content) return <div className="state-message">Loading...</div>

  const { company, hero, products_intro: intro, products, stats, technology, sustainability, core_labour: coreLabour, industries: industryContent, contact } = content
  const emailLink = `mailto:${company.email}?subject=${encodeURIComponent('Packaging inquiry')}`

  return (
    <>
      <header className="header" id="home">
        <div className="container header-inner">
          <Logo name={company.name} />
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
            <a className="active" href="#home">Home</a><a href="#about">About us</a><a href="#products">Products</a><a href="#technology">Technology</a><a href="#sustainability">Sustainability</a><a href="#industries">Industries</a><a href="#contact">Contact</a>
            <a className="button button-gold nav-cta" href={emailLink}>Get a quote <ArrowRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,19,34,.97) 0%, rgba(3,19,34,.83) 35%, rgba(3,19,34,.25) 100%), url("${hero.image_url}")` }}>
          <div className="container hero-inner">
            <div className="hero-copy"><div className="eyebrow light"><span />{hero.eyebrow}</div>
              <h1>{hero.title}<br /><em>{hero.highlight}</em></h1>
              <p>{hero.description}</p>
              <div className="hero-actions"><a className="button button-gold" href={emailLink}>Get a quote <ArrowRight size={17} /></a><a className="button button-outline" href="#products">Explore products <ArrowRight size={17} /></a></div>
            </div>
            <a className="scroll-cue" href="#products"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
          </div>
          <div className="hero-bottom-line" />
        </section>

        <section className="products section" id="products">
          <div className="container">
            <div className="section-heading"><div><div className="eyebrow"><span />{intro.eyebrow}</div><h2>{intro.title}</h2></div><div className="heading-side"><p>{intro.description}</p><a className="text-link" href={emailLink}>Discuss your packaging <ArrowRight size={16} /></a></div></div>
            <div className="product-grid">
              {products.map((product, index) => <article className="product-card" key={product.name}>
                <div className="product-image"><img src={product.image_url} alt={product.name} /><span className="product-number">0{index + 1}</span></div>
                <div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><a href={emailLink} aria-label={`Inquire about ${product.name}`}><ArrowRight size={20} /></a></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="stats" id="about"><div className="container stats-inner">
          <div className="stats-intro"><span>THE SARANA STANDARD</span><h2>Built on trust.<br />Driven by quality.</h2></div>
          {stats.map((stat, index) => { const Icon = icons[index]; return <div className="stat" key={stat.label}><Icon size={34} strokeWidth={1.25} /><div><strong>{stat.value}</strong><span>{stat.label}</span></div></div> })}
        </div></section>

        <section className="technology section" id="technology"><div className="container technology-grid">
          <div className="technology-copy"><div className="eyebrow"><span />{technology.eyebrow}</div><h2>{technology.title}</h2><p>{technology.description}</p><ul>{technology.features.split('|').map((feature) => <li key={feature}><CircleCheck size={16} />{feature.trim()}</li>)}</ul><a href={emailLink} className="text-link">Talk to our team <ArrowRight size={16} /></a></div>
          <div className="technology-images"><img className="technology-main" src={technology.image_url} alt="Advanced manufacturing equipment" /><div className="technology-detail"><img src={technology.detail_image_url} alt="Industrial production facility" /><div className="image-label"><span>PRECISION IN EVERY LAYER</span><ArrowRight size={18} /></div></div><div className="image-caption"><span>01 / 02</span><span>ENGINEERED FOR EXCELLENCE</span></div></div>
        </div></section>

        <section className="sustainability" id="sustainability"><div className="sustain-image" style={{ backgroundImage: `url("${sustainability.image_url}")` }}><div className="sustain-stamp"><Recycle size={31} strokeWidth={1.3} /><span>BETTER BY<br />NATURE</span></div></div><div className="sustain-content"><div className="eyebrow"><span />{sustainability.eyebrow}</div><h2>{sustainability.title}</h2><p>{sustainability.description}</p><div className="sustain-features"><div><Leaf /><strong>Renewable resources</strong><span>Thoughtful materials, responsibly sourced.</span></div><div><Recycle /><strong>Recyclable packaging</strong><span>Designed with a circular future in mind.</span></div><div><Zap /><strong>Energy conscious</strong><span>Always improving how we produce.</span></div></div></div></section>

        {coreLabour && <section className="labour section" id="core-labour"><div className="container labour-inner">
          <div className="labour-copy"><div className="eyebrow"><span />{coreLabour.eyebrow}</div><h2>{coreLabour.title}</h2><p>{coreLabour.description}</p></div>
          <ul className="labour-list">{[coreLabour.freedom_of_association, coreLabour.forced_labour, coreLabour.child_labour, coreLabour.equal_opportunity, coreLabour.safe_workplace].map((item, index) => <li key={index}><ShieldCheck size={22} strokeWidth={1.5} /><span>{item}</span></li>)}</ul>
        </div></section>}

        <section className="industries section" id="industries"><div className="container industries-inner"><div><div className="eyebrow"><span />{industryContent.eyebrow}</div><h2>{industryContent.title}</h2><p>{industryContent.description}</p></div><div className="industry-list">{industries.map(({ name, icon: Icon }) => <div key={name}><Icon size={30} strokeWidth={1.2} /><span>{name}</span></div>)}</div></div></section>

        <section className="contact" id="contact"><div className="container contact-inner"><div><div className="eyebrow light"><span />{contact.eyebrow}</div><h2>{contact.title}</h2><p>{contact.description}</p></div><a className="button button-gold" href={emailLink}>Start a conversation <ArrowRight size={18} /></a><div className="contact-points"><span><Check size={15} /> Fast response</span><span><Check size={15} /> Custom solutions</span><span><Check size={15} /> Reliable quality</span></div></div></section>
      </main>

      <footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Logo name={company.name} /><p>{company.description}</p></div><div><h4>EXPLORE</h4><a href="#about">About us</a><a href="#products">Our products</a><a href="#technology">Technology</a><a href="#sustainability">Sustainability</a>{coreLabour && <a href="#core-labour">Core Labour Standards</a>}</div><div><h4>OUR PRODUCTS</h4>{products.map(product => <a key={product.name} href="#products">{product.name}</a>)}</div><div><h4>GET IN TOUCH</h4><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>{company.phone}</a><span>{company.location}</span></div><div><h4>LET'S CONNECT</h4><a className="footer-contact" href={emailLink}>Start a conversation <ChevronRight size={15} /></a></div></div><div className="footer-bottom"><span>© {currentYear} {company.name}. All rights reserved.</span><span>MADE TO PROTECT WHAT MATTERS <PackageCheck size={15} /></span></div></div></footer>
    </>
  )
}

export default App
