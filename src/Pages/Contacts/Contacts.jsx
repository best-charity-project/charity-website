import React, { Component } from 'react';
import ContactsInfo from "../../Components/ContactsInfo/ContactsInfo";
import Footer from "../../Components/Footer/Footer";
import Menu from "../../Components/Menu/Menu";
import "./Contacts.css";

class Contacts extends Component {
  render() {
    return (
			<div className="main-page-client">
		  	<Menu name = 'client-menu'/>
			  <ContactsInfo />
				<Footer name = 'footer-client'/>
			</div>
    );
  }
}

export default Contacts;