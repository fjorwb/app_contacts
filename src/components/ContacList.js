import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import db from '../firebase/firebaseConfig'
import {collection, onSnapshot} from 'firebase/firestore'

import Contact from './Contact'

const ContactList = () => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        onSnapshot(
            collection(db, 'ussr'),
            (snapshot) => {
                const usersArray = snapshot.docs.map((document)=>{
                    return {...document.data(), id: document.id}
                })
                setContacts(usersArray)
            },
            (error) => console.log(error)
            )
    },[])


    return ( 
        contacts.length>0 &&
        <ContacsContainer>
            {contacts.map(contact => {
                const {id} = contact
                return (
                    <Contact key={id} contact={contact}/>
                    )
            })}
        </ContacsContainer>
     );
}

const ContacsContainer = styled.div`
    margin-top: 40px;
`
export default ContactList;
