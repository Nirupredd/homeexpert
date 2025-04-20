import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
      <p className="px-2">
   New Account??    <span className="text-violet-700 cursor-pointer pl-2 font-semibold">Sign Up</span>
</p>
        <div className="separator" />
        <ul className="list">
          <li className="element">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="8" r="4" />
  <path d="M20 21a8 8 0 0 0-16 0" />
</svg>

            <p className="label">My Profile</p>
          </li>

          <li className="element">
          <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
      <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
    <p className="label">Orders</p>
          </li>

          <li className="element">
          <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
    <p className="label">Wishlist</p>
          </li>
          
          <li className="element">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
  <circle cx="12" cy="12" r="3" />
</svg>

            <p className="label">Settings</p>
          </li>
        </ul>
          
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 200px;
    background-color: #ffffff;
    background-image: linear-gradient(139deg, #ffffff 0%, #ffffff 100%);
    border-radius: 10px;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Added slight shadow for better contrast */
  }

  .card .separator {
    border-top: 1.5px solid #d1a3ff;
  }

  .card .list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 10px;
  }

  .card .list .element {
    display: flex;
    align-items: center;
    color: #d1a3ff; /* Changed text color for visibility */
    gap: 10px;
    transition: all 0.3s ease-out;
    padding: 4px 7px;
    border-radius: 6px;
    cursor: pointer;
  }

  .card .list .element:hover {
    background-color: #d1a3ff;
    color: #ffffff;
    transform: translate(1px, -1px);
  }
`;


export default Card;
