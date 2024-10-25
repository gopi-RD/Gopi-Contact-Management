
import styles from "./Header.module.css"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const Header=()=>{
    const router=useRouter()

    const onLoginButton=()=>{
        router.replace("/login")
    }
    const onRegisterButton=()=>{
        router.replace("/sign-up")
    }

    const token=Cookies.get("jwt_token") 

    const onLogoutButton=()=>{
        Cookies.remove("jwt_token")
        router.replace("/login")
    }

    return (
       
        <div className={styles.header_bg_container}>
            <header className={styles.header_container}>
                     <h1 className={styles.website_logo}>
                        AdmitSport
                     </h1>
                <nav className={styles.navbar_container}>
                    <ul className={styles.nav_link_items}>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link} href="/">
                            Home
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link} href="/getContacts">
                               Contacts List
                            </Link>
                        </li>
                        
                    </ul>
                </nav>
                
                    <div className={styles.button_container}> 
                        {
                            token===undefined ? (
                                <>
                                    <button className={styles.login_button} onClick={onLoginButton}>
                                    Login
                                </button> 
                                <button className={styles.sign_up_button} onClick={onRegisterButton}>
                                    Sign-up
                                </button>
                                </>
                            ) :
                            (
                                <button className={styles.sign_up_button} onClick={onLogoutButton}>
                                    Logout
                                </button>
                            )
                        }
                        
                    </div> 
            </header>
        </div>
    )
}


export default Header;