"use client"
import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1 className='text-5xl'>About Funds for You</h1>
      <p>Welcome to Funds for You! We are a dedicated platform designed to make managing your finances easier and more efficient. Our goal is to provide a seamless experience for users to create accounts, log in, and receive payments securely and conveniently.</p>
      <p>At Funds for You, we understand the importance of financial transactions and the need for a reliable system. Whether you're an individual or a business, our platform is tailored to meet your needs. You can create an account, manage your payments, and interact with different users effortlessly.</p>
      <p>Founded in 2024, our mission is to simplify financial processes and ensure that your transactions are handled with the utmost security and transparency. Our team is composed of experienced professionals who are passionate about financial technology and are committed to delivering top-notch service.</p>
      <p>We continuously strive to improve our platform and services. Your feedback is invaluable to us, and we are always here to assist you with any questions or concerns you may have.</p>
      <p>Thank you for choosing Funds for You. We look forward to serving you and helping you manage your finances with ease.</p>
      <img src="/logo.jpg" alt="Our Team" className="team-photo" />
      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .team-photo {
          max-width: 100%;
          height: auto;
          margin-top: 2rem;
        }
        h1 {
          margin-bottom: 1rem;
        }
        p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default About;
