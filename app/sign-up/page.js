"use client"
import React, { useState } from'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header/Header"
import styles from "./register.module.css"



const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isUserErr, setIsUserErr] = useState(false);
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [isErr, setIsErr] = useState(false);
    const [isErrorMsg, setIsErrorMsg] = useState('');
    const router = useRouter();
    
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setIsUserErr(false);
    }
    
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setIsEmailErr(false);
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setIsPasswordErr(false);
    }

    const onChangeCheckbox=(e)=>{
        setIsPasswordErr(e.target.value)

    }


    const onSubmitSuccess=()=>{
        setIsErr(false);
        router.replace('/login');
    }

    const onSubmitFailure=(errorMsg)=>{
        setIsErr(true);
        setIsErrorMsg(errorMsg);
    }
    
    const onSubmitForm = async(e) => {
        e.preventDefault();
        if (username===""){
            setIsUserErr(true);
            return;
        }
        if (email===""){
            setIsUserErr(false);
            setIsEmailErr(true);
            return;
        }
        if (password===""){
            setIsUserErr(false);
            setIsEmailErr(false);
            setIsPasswordErr(true);
            return;
        }
        else{
            setIsUserErr(false);
            setIsEmailErr(false);
            setIsPasswordErr(false);
        }
        
        const userData = {
            username,
            email,
            password
        };

        const url="http://localhost:3000/api/userRegister"
        const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response= await fetch(url, options)
    const data=await response.json()
    console.log(data)
    if (response.ok){
      onSubmitSuccess()
    }else{
      onSubmitFailure(data.err_msg)

    }


    }



  return (
    <>
    <Header/>
                   <div className={styles.home_page_container} >
                    <form className={styles.register_form_container} onSubmit={onSubmitForm}>
                        <h1 className={styles.website_text}>Sign-up AdmitSpot</h1> 
                        <div className={styles.separator}>
                        <label className={styles.re_label_text} htmlFor="username">USERNAME</label>
                        <input className={`${styles.re_input_element} ${isUserErr && styles.error_input_border}`} type="text" id="username" value={username} onChange={onChangeUsername} placeholder="Enter the Username"/>
                        {isUserErr && <p className={styles.error_text}>*Required</p>}
                        </div>
                        <div className={styles.separator}>
                            <label  className={styles.re_label_text} htmlFor="email">Email</label>
                            <input className= {`${styles.re_input_element} ${isEmailErr && styles.error_input_border}`} type="text" id="email" value={email} onChange={onChangeEmail} placeholder="Enter the Email"/>
                            {isEmailErr && <p className={styles.error_text}>*Required</p>}
                        </div>
                        <div className={styles.separator}>
                            <label  className={styles.re_label_text} htmlFor="password">PASSWORD</label>
                            <input className= {`${styles.re_input_element} ${isPasswordErr && styles.error_input_border}`} type={showPassword?"text":"password"} id="password" value={password} onChange={onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className={styles.error_text}>*Required</p>}
                        </div>
                        <div className={styles.separator}>
                        <div className={styles.re_shown_password}>
                            <input type="checkbox" id="shownPassword"  className={styles.re_checkbox} onChange={onChangeCheckbox} />
                            <label className={styles.re_label_text} htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className={styles.re_submit_button} type="submit">
                            Submit
                        </button>
                        {isErr && <p className={styles.error_text}>{isErrorMsg}</p>} 
                        </div>
                        <div className={styles.sign_in_container}>
                        <Link className={styles.sign_in} href="/login">Sign-in</Link>
                        </div>
                        
                       
                    </form>
                </div>
                </>
               
            
  )
}

export default Register