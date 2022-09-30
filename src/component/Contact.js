import React from 'react'
import {SiLinkedin, SiGmail, SiDocusign, SiGithub} from 'react-icons/si'

function Contact() {
  return (
    <div className='contact' style={{ textAlign: 'center'}}>
      <h1 style={{ textAlign: 'center', margin: '1rem 0 2rem 0'}}>Contact</h1>
      <div className='flexing'>
      <div className='contact-card'><a href="mailto:webdevbyakash@gmail.com" target={'_blank'} rel="noreferrer"><SiGmail /><p>Email</p></a></div>
      <div className='contact-card'><a href="mailto:webdevbyakash@gmail.com" target={'_blank'} rel="noreferrer"><SiLinkedin /><p>webdevbyakash@gmail.com</p></a></div>
      <div className='contact-card'><a href="mailto:webdevbyakash@gmail.com" target={'_blank'} rel="noreferrer"><SiDocusign/><p>webdevbyakash@gmail.com</p></a></div>
      <div className='contact-card'><a href="mailto:webdevbyakash@gmail.com" target={'_blank'} rel="noreferrer"><SiGithub /><p>webdevbyakash@gmail.com</p></a></div>
    </div>
    </div>
  )
}

export default Contact