import React from 'react'
import githubMark from '../../assets/images/githubMark.png'

const Footer = () => {
  const image = <img src={githubMark} className="footer-img"/>
  return(
    <div className='footer'>
      <div className='grid-x'>
        <div className='footer left callout medium-6'>
          <h3 className='my-name'>Created by: James Young</h3>
        </div>
        <div className='footer right callout medium-6'>
          <a href='https://github.com/youngj3'>{image}</a>
        </div>
      </div>
    </div>
  )
}

export default Footer