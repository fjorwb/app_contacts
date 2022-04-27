import React,{useState} from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'

const Contact = ({contact}) => {
    const {id, name, lastname, email} = contact


    const [newName, setNewName] = useState(name)
    const [newLastname, setNewLastname] = useState(lastname)
    const [newEmail, setNewEmail] = useState(email)

    const [editing, setEditing] = useState(false)

    const updateContact = async (e) => {
        e.preventDefault()

        try {
            await updateDoc(doc(db, 'ussr', id), {
                name: newName,
                lastname: newLastname,
                email: newEmail
            })
            setEditing(false)
            
        } catch (error) {
            console.log(error)
        }

    }

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, 'ussr', id), {
            })
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <ContactContainer>
            {editing ?
                <form action="" onSubmit={updateContact}>
                    <div>
                        <Input
                            type='text'
                            name='name'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder='Name'
                            />
                        <Input
                            type='text'
                            name='lastname'
                            value={newLastname}
                            onChange={(e) => setNewLastname(e.target.value)}
                            placeholder='Lastname'
                            />
                        <Input
                            type='text'
                            name='email'
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder='email'
                            />
                    </div>
                    <Button type='submit'>update</Button>
                </form>
            :
            <>
            <Name key={id}>{lastname} {name}</Name>
            <Email>{email}</Email>
            <Button type='button' onClick={() => setEditing(!editing)}>edit</Button>
            <Button type='button' onClick={() => deleteContact(id)}>delete</Button>
            </>
            }
        </ContactContainer>
     );
}

const ContactContainer = styled.div`
    padding: 10PX 0;
    border-bottom: 1px solid black;
`
const Input = styled.input`
    background-color: #eee;
    border: 1px solid #ddd;
    padding: 2px;
    margin: 3px;
    color: blue;
`
const Name = styled.p`
    font-family: cabin;
    font-weight:300;
    text-align: center;
    font-style: italic;
`
const Email = styled.p`
    font-family: cabin;
    font-weight:700;
    text-align: center;
    font-style: italic;
`
const Button = styled.button`
    background-color: slategrey;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 5px #eee;
    width: 60px;
    margin: 10px 5px 5px 5px;
    padding: 5px 0;
`


export default Contact;
