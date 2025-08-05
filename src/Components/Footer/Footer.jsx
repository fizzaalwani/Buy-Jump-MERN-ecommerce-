import React from 'react'
import logo from '../../assets/Frontend_Assets/logo_big.png'
import whatsapp from '../../assets/Frontend_Assets/whatsapp_icon.png'
import pinterest from '../../assets/Frontend_Assets/pintester_icon.png'
import instagram from '../../assets/Frontend_Assets/instagram_icon.png'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
    <div className="footer-top">
        <div className="footer-logo">
            <img src={logo} alt="" />
            <p>Buy-Jump</p>
        </div>
        <ul>
            <li>Company</li>
            <li>Products</li>
            <li>Offers</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-socials">
            <ul>
                <li><img src={whatsapp} alt="" /></li>
                <li><img src={pinterest} alt="" /></li>
                <li><img src={instagram} alt="" /></li>
            </ul>
        </div>
    </div>
    <hr />
    <div className="footer-copyright">
        <p>© 2023 Buy-Jump. All rights reserved.</p>
    </div>
</div>

        
    )
}

export default Footer
