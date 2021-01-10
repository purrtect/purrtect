import React, {useState} from 'react';
import './Footer.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import Logo from '../../images/cat-leaf.png'

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

function Footer() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [login, setlogin] = useState("Sign up instead");
  const [submitText, setsubmitText] = useState("Sign in");

  const handleClickLogin = () => {
    if(login === "Sign up instead")
    {
      setlogin("Sign in instead");
      setsubmitText("Sign up");
    }
    else{
      setlogin("Sign up instead");
      setsubmitText("Sign in");
    }
  };

  const handleEmailInput = (email) => {
    setemail(email);
  }

  const handlePasswordInput = (password) => {
    setpassword(password);
  }

  const handleSubmit = (event) => {
    alert('A form was submitted: ' + this.state);
    //////////////////////////////frank's changes
    var theUrl = "https://backend.purrtect.live/authentication?" +
                  "username=" + email + "&" +
                  "password=" + password;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
        var resp = JSON.parse(xmlHttp.responseText)
        if (resp.success && resp.userExists){
          console.log("log this man in");
        }
      }
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);

    /////////////////////////////frank's changes
    // fetch('backend.purrtect.live/authentication', {
    //     method: 'POST',
    //     // We convert the React state to JSON and send it as the POST body
    //     body: JSON.stringify({useremail: email, password:password})
    //   }).then(function(response) {
    //     console.log(response)
    //     return response.json();
    //   });

    event.preventDefault();
  }

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Adopt your chrome pet now!
        </p>
        <p className='footer-subscription-text'>
          And help save the earth!
        </p>
        <Button onClick={handleClickLogin} buttonColor="red" buttonSize="button--mobile" buttonStyle='btn--primary'>{login}</Button>
        <br></br>
        <div className="line"></div>
        <div className='input-areas'>
          <form onSubmit={handleSubmit}>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
              onChange={handleEmailInput}
            />
            <input
              className='footer-input'
              name='password'
              type='password'
              placeholder='Your Password'
              onChange={handlePasswordInput}
            />
            <Button buttonColor="light-blue" buttonSize="button--medium" buttonStyle='btn--outline'>{submitText}</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Developers</h2>
            <Link to='/sign-up'>Roy</Link>
            <Link to='/'>Grant</Link>
            <Link to='/'>Steven</Link>
            <Link to='/'>Frank</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Supporters</h2>
            <Link to='/'>NwHacks</Link>
            <Link to='/'>All Cat Lovers</Link>
            <Link to='/'>Some White Cat</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <img src={Logo} alt="PurrtectorLogo" width="38px" height="38px" className='navbar-icon' />
              Purrtector
            </Link>
          </div>
          <small className='website-rights'>Purrtector © 2021</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={
                '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;