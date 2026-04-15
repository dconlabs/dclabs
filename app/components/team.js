'use client'

import styles from "../page.module.css"
import Link from 'next/link'
import LinkIcon from './icons/link'
import { useState, useEffect } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 450)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

export default function Team() {

  const [nowCategory, setNowCategory] = useState('Weird Lab')
  const isMobile = useIsMobile()

  const labs = [
    {
      name: 'Weird Lab',
      logo: '/WEIRD_white.png',
      research: [
        'Human–AI Collaborative Design',
        'Generative AI–Enabled Design',
        'UX / UI Design',
        'Service Design'
      ],
      descriptionKr:
        'Weird 디자인랩은 디자인을 단순한 기술이 아닌 인지적 사고 과정으로 정의하며, 디지털 환경에서의 심층적인 UX/BX 경험 전략을 탐구합니다. 또한 생성형 AI를 디자이너를 위한 공동 사고 도구로 활용하여, AI와 협력하는 혁신적인 디자인 모델을 연구합니다.',
      descriptionEn:
        'We cultivate creative global experts who lead new media trends through multimedia convergence.Our curriculum and practice.'
    },
    {
      name: 'A2F Lab',
      logo: '/A2F_white.png',
      research: [
        'Cognitive Design Activity',
        'Design Thinking',
        'Experience Strategy in Digital Contexts',
        'Human–AI Co-thinking in Design'
      ],
      descriptionKr:
        'A2F 디자인랩은 디자인을 단순한 기술이 아닌 인지적 사고 과정으로 정의하며, 디지털 환경에서의 심층적인 UX/BX 경험 전략을 탐구합니다. 또한 생성형 AI를 디자이너를 위한 공동 사고 도구로 활용하여, 인간과 AI가 협력하는 혁신적인 디자인 모델을 연구합니다.',
      descriptionEn:
        'A2F Design Lab explores cognitive UX/BX strategies and pioneers human-AI collaborative design using generative AI as a co-thinking tool.'
    }
  ]

  const filteredLabs = isMobile
    ? labs.filter(lab => lab.name === nowCategory)
    : labs

  return (
    <>
      <div className={styles.sub_title}>Team</div>

      <div className={styles.category_container2}>
        {labs.map((lab) => (
          <div
            key={lab.name}
            className={`${styles.category} ${
              nowCategory === lab.name
                ? styles.nowCategory
                : styles.notNowCategory
            }`}
            onClick={() => setNowCategory(lab.name)}
          >
            {lab.name}
          </div>
        ))}
      </div>

      <div className={styles.lab_flex}>
        {filteredLabs.map((lab) => (
          <div key={lab.name} className={styles.lab_container}>

            <div className={styles.lab_img_container}>
              <div className={styles.prof_img}>
                <img src="/chon.png" />
              </div>

              <Link href="/" target="_blank" className={styles.lab_img}>
                <img src={lab.logo} />
                <div>
                  <LinkIcon />
                </div>
              </Link>
            </div>

            <div className={styles.lab_research}>
              {lab.research.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>

            <div className={styles.lab_description}>
              <div className={styles.lab_description_kr}>
                {lab.descriptionKr}
              </div>
              <div className={styles.lab_description_en}>
                {lab.descriptionEn}
              </div>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}
