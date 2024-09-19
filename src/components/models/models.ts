export interface ModalAddProps {
	closeModal: () => void; 
 }


export interface Status {
	name: string;
	value: string;
 }
 

export interface Department {
	name: string;
	value: string;
 }
 

export interface Country {
	name: string;
	value: string;
 }
 
export interface User {
	name: string;
	status: {
	  name: string;
	  value: string;
	};
	department: {
	  name: string;
	  value: string;
	};
	country: {
	  name: string;
	  value: string;
	};
 }

export type UserList = User[];
 