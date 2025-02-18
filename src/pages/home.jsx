import React from 'react'
import Header from '../components/header/Header'
import Card from '../components/Card/Card';
import styles from './Home.module.scss';

const sections =[
  {
    title: "질문할래",
    moreLink: "/question",
    items: [
      "npm install 과정에서 오류가 나요"
    ]
  }
]

function Home() {
  return (
    <div>
        <Header />
        <div className={styles.homeContainer}>
          <div className={styles.cardContainer}>
            {sections.map((section, index) => (
              <Card key={index} title={section.title} moreLink={section.moreLink} items={section.items} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Home