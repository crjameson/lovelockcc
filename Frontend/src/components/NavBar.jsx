import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { ConnectWallet } from "../components/ConnectWallet";
import Logo from "../Assets/Logo.svg";
import { Link } from 'react-router-dom'
import '../scss/navbar.scss'


export default function NavBar() {
    return (
        <Navbar expand="lg" className='border-bottom'>
            <Container>
                <Link to="/" className='navbar-brand'>
                    <img src={Logo} alt="logo"/>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        <Link className='nav-link' to="/your-LoveLock">Your NFT</Link>
                        <Link className='nav-link' to="/mint">Mint</Link>
                        <Link className='nav-link' to="/raffle">Raffle</Link>
                        <div className="ms-lg-5">
                            <ConnectWallet />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
