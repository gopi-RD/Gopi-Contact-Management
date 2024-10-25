"use client"
import { useState,useEffect} from "react"
import Cookies from "js-cookie"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ContactItem from "@/components/ContactItem/ContactItem";
import Header from "@/components/Header/Header";
import styles from "./contact.module.css"

const ContactList = () => {
  const [loading, setLoading] = useState(true)
  const [contactList, setContactList] = useState([])
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
  const [activeId, setActiveId] = useState(null)







  const token = Cookies.get("jwt_token")
  useEffect(()=>{
    if(!token){
      window.location.href="/login"
    }

   const fetchData= async ()=>{
  const url="http://localhost:3000/api/contact"
  const options={
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json",
       Authorization:"Bearer "+token
  },
  }
  const response = await fetch(url,options)
  const data = await response.json()
  if(response.ok){
    setContactList(data.contacts)
    setLoading(false)
 
  }
}
fetchData()
},[loading]) 

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


const onUpdateContactDetails= async(id)=>{
  setActiveId(id)
  const url=`http://localhost:3000/api/onecontact/${id}`
  const options={
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json",
       Authorization:"Bearer "+token
  }
}
const response= await fetch(url, options)
const data=await response.json()
setName(data.name)
setEmail(data.email)
setMobile(data.phone_no)
setAddress(data.address)
setsPopup(true)
}

const onSubmitContactDetails= async(event)=>{
  event.preventDefault()
  const contactData={
    id:activeId,
    name,
    email,
    phone_no:mobile,
    address,
    time_zone:new Date()
  }
  const url="http://localhost:3000/api/contact"
  const options={
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json",
       Authorization:"Bearer "+token
  },
  body: JSON.stringify(contactData)
  }
  const response = await fetch(url,options)
  const data = await response.json()
  console.log(data)
  if(data.status === 200){
    setIsSuccess(true)
    setIsSuccessText("Contact updated successfully")
  }else{
    setIsError(true)
    setsErrorText("Failed to update contact")
  }

 
  
  setName("")
  setEmail("")
  setMobile("")
  setAddress("")
  setActiveId(null)
  setLoading(true)


  

}

const onCancelAddContact=()=>{
  setsPopup(false)
}

const onUpdateContactContainer=()=>{

  return(
    <div className={styles.popup_container}>
                <form className={styles.contact_form_container} onSubmit={onSubmitContactDetails} >

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
  )
}





const onDeleteContact=async (id)=>{
const deleteId={
  id:id
}
  const url="http://localhost:3000/api/contact"
  const options={
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json',
      "Accept": "application/json",
       Authorization:"Bearer "+token
  },
  body: JSON.stringify(deleteId)
  }
  const response = await fetch(url,options)
  const data = await response.json(deleteId)
  console.log(data)
  setLoading(true)
}

  return (
    <>
    <Header/>
    <ul className={styles.contact_list_items}>
                <li className={styles.contact_item}>
                    <p className={styles.name}>Name</p> 
                    <p className={styles.email}>Email</p>
                    <p className={styles.mobile}>Mobile No</p>
                    <p className={styles.address}>Address</p>
                    <p className={styles.create_date}>Create date</p>
                    <p className={styles.action}>Action</p>
                </li>

                {  
                loading? (<div className={styles.loading_container}>
                  <Loader type="FiveDots" color="#000000" height={100} width={100} />
                  </div> ) :
                      (contactList.length > 0? (
                        contactList.map(eachItem=>(
                          <ContactItem contactDetails={eachItem} key={eachItem.id} onUpdateContactDetails={onUpdateContactDetails}
                          onDeleteContact={onDeleteContact}/>
                          )) ) : (
                            <p className={styles.no_contact_text}>No contacts found</p>
                          ) )
                       
                }


               </ul>
               {isPopup && onUpdateContactContainer()}
                     
          
   </>
  )
}

export default ContactList 

