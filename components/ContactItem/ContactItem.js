
import styles from "./ContactItem.module.css"

const ContactItem=(props)=>{
    const {contactDetails,onUpdateContactDetails,onDeleteContact}=props
    const {id,name,email,phone_no,address,time_zone}=contactDetails 

    const onClickEdit=()=>{
        onUpdateContactDetails(id)
    }
    const onDeleteButton=()=>{
        onDeleteContact(id)
       
    }
   
    return (

        <li className={styles.item}>
            <span className={styles.name}>{name}</span> 
            <span className={styles.email}>{email}</span>
            <span className={styles.mobile}>{phone_no}</span>
            <span className={styles.address}>{address}</span>
            <span className={styles.create_date}>{time_zone}</span> 
            <p className={styles.edit_delete_container}>
                <button className={styles.edit} onClick={onClickEdit} >Edit</button>
                <button  className={styles.delete} onClick={onDeleteButton}>Delete</button>
            </p>
            </li>

        
    )
}

export default ContactItem