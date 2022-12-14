
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './RefundPolicy.module.css';
import navbar from '../../../components/NavBar/NavBar.module.css';

function RefundPolicy() {

    const theme = useSelector((state) => state.theme.currentTheme);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className={`container-fluid content p-3 footer-position ${styles.content} ${theme === "night" ? "bg-dark" : "bg-white"}`}>
            <div className={`container p-5`}>
                <h3 className={`mb-3 text-decoration-underline fw-bold ${styles.mov}`}>Refund Policy</h3>
                <div className={theme === "night" ? "text-light" : "text-dark"}>
                    <p>
                        It is way too simple to click "Proceed to checkout" in your shopping basket, only to realize that the wrong e-book has made it into your library. To remedy these accidental purchases,
                        E-Bookalypse allows buyers to return an e-book for a refund within 48 hours. After two days, you will have to either keep the e-book or delete it without a refund.
                        Here's how to return an e-book, remove it from your library and receive immediate refund.
                        Go to “<Link to='/contactus' className={`text-decoration-underlined fw-bold ${theme === "night" ? navbar.navItemNight : navbar.navItem}`}>Contact Us</Link>”, fill in “Return For Refund” in the subject box, and write the cause for
                        which you are requesting this action out of the following:
                        <ul className='mt-2'>
                            <li>Accidental purchase.</li>
                            <li>Payment processed twice for the same item.</li>
                            <li>Item not received in my library for any technical reason.</li>
                            <li>Purchased a language that I am not familiar with.</li>
                        </ul>
                        And you can always add whatever explanation you may find important or useful.
                        A refund will be generated to your account within 24 hours of receiving your request, in a condition that it matches one of the above mentioned reasons.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy