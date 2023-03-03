import React from 'react'
import profilePic from '../assets/images/profilePic.jpg'

const AboutTheDeveloper = () => {
  const launch = <a href='https://launchacademy.com/'>Launch Academy</a>
  const image = <img src={profilePic} className="about-img"/>
  return (
    <div className='centered-content'>
      <div className='about-heading grid-x'>
        <div className='callout medium 6'>
            {image}
          </div>
        <div className='about-right callout medium 6'>
          <h3>About The Developer</h3> 
          <h1>James Young</h1>
          <p>jimmyjohnyoung@gmail.com</p>
          <div className='bio-links flex grid-x'>
            <a href='https://www.linkedin.com/in/young-james-j/'><b>LinkedIn</b></a>
            <p>||</p>
            <a href='https://github.com/youngj3'><b>GitHub</b></a>
          </div>
        </div>
      </div>
      <div className='background-info'>
        <p>
          Before I began my journey into the tech industry, I was working as a cook for five-some-odd years.
          I bounced around between short-order, line, and catering cooking, picking up many
          skills along the way. I loved the work because it was high-paced and I could, depending on the location,
          continuously learn knew recipes and techniques for cooking. It was also great because 
          I trained at every location I was at, helping me teach people with vastly different learning styles.
        </p>
        <br/>
        <p>
          I really started to gain interest in the tech industry when I had decided that a new career would be beneficial
          for reasons like job security, being able to work from, virtually, anywhere, and 
          flexibility to pursue personal interests outside work, all while being able to hold the same values as when I was cooking. 
          I began with very basic, and free, javascript and python lessons and the coding itself had an immediate hold on me
          due to its problem solving nature. The continuous building and debugging can often 
          leave me obsessive over finding a solution that is clean and well performant. After a word of mouth
          recommendation from one of my dad's young co-workers, I decided that I would join <b>{launch}</b>. Launch 
          was an eighteen-week immersive boot camp that focused on learning Javascript, React, Express, Cypress, and Node.js.
          After having completed the program, I am overly ecstatic to join the work force. I am hungry and motivated to continue
          learning new languages and tools to help bolster my technical skills.
        </p>
        <br/>
        <p>
          Outside of the office, I enjoy watching sports, playing sports recreationally
          (especially basketball), hiking, finding new music, playing video games, 
          and watching movies.
        </p>
      </div>
    </div>
  )
}

export default AboutTheDeveloper