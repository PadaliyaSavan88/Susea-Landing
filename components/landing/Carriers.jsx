import Image from 'next/image'

const CARRIERS = [
  ['MSC', 'msc.webp'], ['Maersk', 'maersk.webp'], ['CMA CGM', 'cma-cgm.webp'],
  ['Hapag-Lloyd', 'hapag-lloyd.jpg'], ['COSCO', 'cosco.webp'], ['Evergreen', 'evergreen.webp'],
  ['HMM', 'hmm.webp'], ['ZIM', 'zim.webp'], ['Yang Ming', 'yangming.webp'],
  ['PIL', 'pil.webp'], ['Wan Hai', 'wan-hai.webp'], ['RCL', 'rcl.webp'],
  ['KMTC', 'kmtc.webp'], ['TS Lines', 'ts-line.webp'], ['Sealead', 'sealead.jpg'],
  ['Emirates SL', 'emirates.webp'],
]

function Track({ arr, reverse }) {
  const items = [...arr, ...arr]
  return (
    <div className={'marquee' + (reverse ? ' r' : '')} style={reverse ? { marginTop: 14 } : null}>
      <div className="track">
        {items.map(([n, logo], i) => (
          <div className="carrier" key={i}>
            <Image className="clogo" src={'/assets/carriers/' + logo} alt={n} width={30} height={30} loading="lazy" />
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Carriers() {
  return (
    <section className="carriers">
      <div className="container">
        <div className="head">
          <h3>Pricing from 120+ shipping lines, worldwide</h3>
          <p>Live rates, schedules and freight intelligence fetched from <span className="carrier-count mono">200+</span> ocean carriers across the globe.</p>
        </div>
      </div>
      <Track arr={CARRIERS} />
      <Track arr={[...CARRIERS].reverse()} reverse />
    </section>
  )
}
