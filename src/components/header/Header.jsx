import React from 'react'
import logo from '../../assets/logo.png'
import styles from './Header.module.scss'

function Header() {
  return (
    <div>
        <div className={styles.header__logo}>
            <img src={logo} alt="개발바닥" />
            GEABALBADAK
            <input className={styles.header__search} type="text" placeholder='지금 바로 검색해 보세요.'/>
        </div>
    </div>
  )
}

export default Header