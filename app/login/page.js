"use client"
import React, { useState } from'react';
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';
import Header from "@/components/Header/Header"
import styles from "./login.module.css"




export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState('');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setShowPassword(e.target.checked);
  };


  const onSubmitSuccess=(jwtToken)=>{
    console.log(jwtToken);
    setIsErr(false);
    Cookies.set("jwt_token", jwtToken); 
    router.replace("/")
  }

  const onSubmitFailure=(data)=>{
    setIsErr(true);
    setIsErrorMsg(data.err_msg);

  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (email===""){
      setIsEmailErr(true);
      return;
    }
    if (password===""){
      setIsEmailErr(false);
      setIsPasswordErr(true);
      return;
    }
    else{
      setIsEmailErr(false);
      setIsPasswordErr(false);
    }
    const userData={
      email,
      password
    }

    const url="http://localhost:3000/api/userLogin"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }

    const response= await fetch(url, options)
    const data=await response.json()
    if (data.jwt_token!==undefined){
      onSubmitSuccess(data.jwt_token)
    }else{
      onSubmitFailure(data)

    }




   
  }
  return (
    <>
    <Header />
 
                   <div className={styles.lg_home_page_container}  >
                    <form className={styles.lg_register_form_container} onSubmit={onSubmitForm}>
                        <h1 className={styles.lg_website_text}>Login AdmitSpot </h1> 
                        <div className={styles.lg_separator}>
                        <label className={styles.lg_label_text} htmlFor="username">Email</label>
                        <input className={`${styles.lg_input_element} ${isEmailErr && styles.error_input_border} `}  type="text" id="username" value={email} onChange={onChangeEmail} placeholder="Enter the Email"/>
                        {isEmailErr && <p className={styles.error_text}>*Required</p>}
                        </div>
                        <div className={styles.lg_separator}>
                            <label  className={styles.lg_label_text} htmlFor="password">PASSWORD</label>
                            <input className={`${styles.lg_input_element} ${isPasswordErr && styles.error_input_border}  `} type={showPassword?"text":"password"} id="password" value={password} onChange={onChangePassword} placeholder="Enter the Password"/>
                            {isPasswordErr && <p className={styles.error_text}>*Required</p>}
                        </div>
                        <div className={styles.lg_separator}>
                        <div className={styles.lg_shown_password}>
                            <input type="checkbox" id="shownPassword"  className={styles.lg_checkbox}  onChange={onChangeCheckbox} />
                            <label className={styles.lg_label_text} htmlFor="shownPassword">Show Password</label>
                        </div>
                        <button className={styles.lg_submit_button}type="submit">
                            Submit
                        </button>
                        {isErr && <p className={styles.error_text}>{isErrorMsg}</p>} 
                        </div>
                        
                        
                       
                    </form>
                </div>
                </>
  )
}

