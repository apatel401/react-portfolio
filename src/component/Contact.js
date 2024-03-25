import React from 'react'
import {SiLinkedin, SiGmail, SiDocusign, SiGithub} from 'react-icons/si'

function Contact() {
  return (
    <div className='contact container' style={{ textAlign: 'center'}}>
      <h1 style={{ textAlign: 'center', margin: '1rem 0 2rem 0'}}>Contact</h1>
      <div className='flexing'>
      <div className='contact-card'><a href="mailto:webdevbyakash@gmail.com" target={'_blank'} rel="noreferrer"><SiGmail /><p>Email</p></a></div>
      <div className='contact-card'><a href="https://www.linkedin.com/in/akash-patel-98885a182/" target={'_blank'} rel="noreferrer"><SiLinkedin /><p>Linkedin</p></a></div>
      <div className='contact-card'><a href="./assets/akash-patel-frontend.pdf" download rel="noreferrer"><SiDocusign/><p>Resume</p></a></div>
      <div className='contact-card'><a href="https://github.com/apatel401" target={'_blank'} rel="noreferrer"><SiGithub /><p>github</p></a></div>
    </div>
    </div>
  )
}

export default Contact