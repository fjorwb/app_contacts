import React,{useState} from 'react'
import styled from 'styled-components'
import db from '../firebase/firebaseConfig'
import { collection, addDoc } from "firebase/firestore"

const Form = () => {
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [email, setEmail] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await addDoc(collection(db, 'ussr'), {
				name: name,
				lastname: lastname,
				email: email
			});
		} catch(error){
			console.log('Hubo un error al intentar guardar el documento');
			console.log(error);
		}

		setName('');
		setLastname('');
		setEmail('');
	}

    return (
        <form action="" onSubmit={handleSubmit}>
			<Input
				type='text'
				name='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Name'
				/>
			<Input 
				type='text'
				lastname='lastname'
				value={lastname}
				onChange={(e) => setLastname(e.target.value)}
				placeholder='Lastname'
			/>
			<Input 
				type='email'
				email='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='email'
			/>	
			<Button
				type='submit'
			>add contact</Button>
        </form>
    );
}

const Input = styled.input`
	padding: 10px;
	border: 2px solid rgba(0,0,0,.2);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 10px;
	transition: .2s ease all;
	outline: none;
	text-align: center;
	
	&:focus {
		border: 2px solid #3D76E9;
	}
`;

const Button = styled.button`
	margin-top: 20px;
	padding: 10px 30px;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	transition: .3s ease all;
	outline: none;
	background: #C4C4C4;
	color: #fff;
	font-size: 12px;

	&:hover {
		background: #3D76E9;
	}
`;

export default Form;