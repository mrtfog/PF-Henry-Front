import React from 'react'
import AboutCard from './AboutCard'
import luciano from '../../assets/profileImg/luciano.jfif'
import martin from '../../assets/profileImg/martin.jfif'
import belenM from '../../assets/profileImg/belenM.jfif'
import sergio from '../../assets/profileImg/sergio.jfif'
import angela from '../../assets/profileImg/angela.jfif'
import andres from '../../assets/profileImg/andres.jpeg'
import belenDA from '../../assets/profileImg/belenDA.jpeg'
import style from '../../scss/components/About/_about.module.scss'

export default function About() {

  return (
    <div className={style.main_about}>
        <div className={style.divContainer}>
            <AboutCard name='Luciano Schmidt' img={luciano} linkedin='https://www.linkedin.com/in/luciano-augusto-schmidt-68a12820a/' github='https://github.com/Clavi-K'/>
        </div>
        <div className={style.divContainer}>
            <AboutCard name='Martin Fogliacco' img={martin} linkedin='https://www.linkedin.com/in/martin-fogliacco/' github='https://github.com/mrtfog'/>
        </div>
        <div className={style.divContainer}>
            <AboutCard  name='Belén De Amorrortu' img={belenDA} linkedin='https://www.linkedin.com/in/belen-de-amorrortu/' github='https://github.com/BelenDeAmorrortu'/>
        </div>
        <div className={style.divContainer}>
            <AboutCard name='Belén Manterola' img={belenM} linkedin='https://www.linkedin.com/in/belmant/' github='https://github.com/belmant' />
        </div>
        <div className={style.divContainer}>
            <AboutCard  name='Sergio Sánchez' img={sergio} linkedin='https://www.linkedin.com/in/sergio-omar-sanchez-6ba362104/' github='https://github.com/sergioomarsanchez'/>
        </div>
        <div className={style.divContainer}>
            <AboutCard name='Andrés Orozco' img={andres} linkedin='https://www.linkedin.com/in/orozco-andres-dev/' github='https://github.com/andyorozco96'/>
        </div>
        <div className={style.divContainer}>
            <AboutCard name='Angela Testino' img={angela} linkedin='https://www.linkedin.com/in/angelatestino/' github='https://github.com/AngelaTestino'/>
        </div>
    </div>
  )
}
