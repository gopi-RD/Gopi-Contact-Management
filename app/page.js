
"use client"
import {useState } from "react"
import Header from "@/components/Header/Header"
import styles from "./home.module.css"
import Cookies from "js-cookie"



const page = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [isNameEr, setIsNameEr] = useState(false)
  const [isEmailEr, setIsEmailEr] = useState(false)
  const [isMobileEr, setsMobileEr] = useState(false)
  const [isAddressEr, setIsAddressEr] = useState(false)
  const [isError, setsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isErrorText, setsErrorText] = useState("")
  const [isSuccessText, setIsSuccessText] = useState("")
  const [isPopup, setsPopup] = useState(false)



  const onChangeName=(e)=>{
    setName(e.target.value)
    setIsNameEr(false)
  }

  const onChangeEmail=(e)=>{
    setEmail(e.target.value)
    setIsEmailEr(false)
  }

  const onChangeMobile=(e)=>{
    setMobile(e.target.value)
    setsMobileEr(false)
  }

  const onChangeAddress=(e)=>{
    setAddress(e.target.value)
    setIsAddressEr(false)
  }


  const onPopupContainer=()=>{
    setsPopup(true)
  }

  




const onCancelAddContact = ()=>{
  setsPopup(false)
}

const onSubmitContactData=async (event)=>{
  event.preventDefault()
  if(name===""){
    setIsNameEr(true)
    return
  }
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    setIsNameEr(false)
    setIsEmailEr(true)
    setsError(true)
    setsErrorText("Invalid email format")
    return
  }
  if(!/^\d{10}$/.test(mobile)){
    setIsNameEr(false)
    setIsEmailEr(false)
    setsMobileEr(true)
    setsError(true)
    setsErrorText("Invalid mobile number format")
    return
  }
  if (address===""){
    setIsNameEr(false)
    setIsEmailEr(false)
    setsMobileEr(false)
    setsError(false)
    setIsAddressEr(true)

    return
  }
  else{
    setIsNameEr(false)
    setIsEmailEr(false)
    setsMobileEr(false)
    setIsAddressEr(false)
    setsError(false)
    setsErrorText("")
  }

  const addContact={
    name:name,
    email:email,
    phone_no:mobile,
    address:address,
    time_zone:new Date()
  }
  const token=Cookies.get("jwt_token")
  const url="http://localhost:3000/api/contact"
  const options={
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json",
       Authorization:"Bearer "+token
  },
  body: JSON.stringify(addContact)
}

  const response= await fetch(url, options)
  const data= await response.json() 
  if (data.status === 200){
    setIsSuccess(true)
    setIsSuccessText(data.message)
  }else{
    setIsSuccess(false)
    setIsSuccessText(data.err_msg)
  }

  setName("")
  setEmail("")
  setMobile("")
  setAddress("")

 
}

  const onOpenContactDetails=()=>{
    return (
      <>
      <div className={styles.popup_container}>
                <form className={styles.contact_form_container} onSubmit={onSubmitContactData} >

                   <div className={styles.contact_separator}>
                       <label className={styles.label_e}>NAME</label>
                       <input className={`${styles.input_text_e} ${ isNameEr && styles.error_input_border}`} type="text" value={name} placeholder="Enter name" onChange={onChangeName}/> 
                       {isNameEr && <p className={styles.error_text}>*Required</p>}
                   </div>

                   <div className={styles.contact_separator}>
                       <label className={styles.label_e}>Email</label>
                       <input className= {`${styles.input_text_e} ${ isEmailEr && styles.error_input_border}`} type="email" value={email} placeholder="Enter email" onChange={onChangeEmail} />
                       {isEmailEr && <p className={styles.error_text}>*Required</p>}
                   </div>
                   <div className={styles.contact_separator}>
                       <label className={styles.label_e}>MOBILE NO</label>
                       <input className= {`${styles.input_text_e} ${ isMobileEr && styles.error_input_border}`} type="number" value={mobile} placeholder="Enter mobile no" onChange={onChangeMobile} />
                       {isMobileEr && <p className={styles.error_text}>*Required</p>}
                   </div>
                   <div className={styles.contact_separator}>
                       <label className={styles.label_e}>ADDRESS</label>
                       <input className={`${styles.input_text_e} ${ isAddressEr && styles.error_input_border}`} type="text" value={address} placeholder="Enter address" onChange={onChangeAddress} />
                       {isAddressEr && <p className={styles.error_text}>*Required</p>}
                   </div>
                   
                   <div className={styles.buttons_container}>
                       <button type="submit" className={styles.submit_button_e} >
                           Submit
                       </button>
                       <button className={styles.cancel_button} type="button" onClick={onCancelAddContact}>
                        Cancel
                       </button>
                   </div>
                   <div  className={styles.buttons_container}>
                   {isError && <p className={styles.error_text}>{isErrorText}</p>}
                   {isSuccess && <p className={styles.success_text}>{isSuccessText}</p>}
                   </div>



        </form>

    </div>
    </>
    )
  }
  
  return (
    <>
    <Header />
   
          <div className={styles.bg_home_container}>
                <h1 className={styles.contact_panel_heading}>Welcome Contact Panel</h1>
                <button className={styles.add_contact_button} type="button" onClick={onPopupContainer} >Add Contacts</button>
                {isPopup && onOpenContactDetails()}
            </div>
            </>        
  )
}

export default page