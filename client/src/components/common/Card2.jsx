import React from "react";
import styled from "styled-components";

const Card2 = () => {
  return (
    <StyledWrapper>
      <div className="card">
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
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>

  <p className="label">Notifications</p>
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
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 6v6l4 2" />
    <circle cx="19" cy="3" r="2" />
  </svg>

  <p className="label">24x7 Support</p>
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
    <path d="M19 9l-5 5-4-4-3 3" />
    <path d="M15 9h4v4" />
  </svg>

  <p className="label">Advertise</p>
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
    <path d="M12 3v12" />
    <path d="M16 11l-4 4-4-4" />
    <path d="M4 21h16" />
  </svg>

  <p className="label">Download App</p>
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


export default Card2;