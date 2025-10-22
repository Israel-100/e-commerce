import styled from "styled-components";

const StyledWrapper = styled.div`
  button {
    --border-radius: 15px;
    --border-width: 4px;
    appearance: none;
    position: relative;
    padding: 1em 2em;
    border: 0;
    background-color: transparent;
    font-family: "Roboto", Arial, "Segoe UI", sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    z-index: 2;
    cursor: pointer;
    border-radius: var(--border-radius);
  }

  button::after {
    --m-i: linear-gradient(#000, #000);
    --m-o: content-box, padding-box;
    content: "";
    position: absolute;
    inset: 0;
    padding: var(--border-width);
    border-radius: var(--border-radius);
    background-image: conic-gradient(
      #000000,
    
      #ffffff,
     
      #000000
    );
    -webkit-mask-image: var(--m-i), var(--m-i);
    mask-image: var(--m-i), var(--m-i);
    -webkit-mask-origin: var(--m-o);
    mask-origin: var(--m-o);
    -webkit-mask-clip: var(--m-o);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
    filter: hue-rotate(0);
    animation: rotate-hue 500ms linear infinite;
    animation-play-state: paused;
  }

  button:hover::after {
    animation-play-state: running;
  }

  @keyframes rotate-hue {
    to {
      filter: hue-rotate(1turn);
    }
  }

  button,
  button::after {
    box-sizing: border-box;
  }

  button:active {
    --border-width: 5px;
  }
`;

export default StyledWrapper;
