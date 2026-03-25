'use client'

import styles from './about.module.css'
import { useState } from 'react'

export default function About() {

  let [category, setCategory] = useState('Undergraduate')

  return (
    <div style={{marginTop:'60px'}}>
      <div className={styles.category_container}>
        {['Undergraduate', 'Graduate'].map((item) => (
          <div key={item} className={`${styles.category} ${category === item ? styles.nowCategory : styles.notNowCategory}`} onClick={() => setCategory(item)}>{item}</div>
        ))}
      </div>
      {
        category === 'Undergraduate' ? 
        <div>
          여긴 학사 과정 들어감
        </div> :
        <div>
          여긴 대학원 과정 들어감
        </div>
      }
    </div>
  )
}