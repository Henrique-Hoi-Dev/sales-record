import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 1px;
      height: 10px;
    }
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: #4D4C4C;

    .MuiMenuItem-root {
      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }

    .css-1hskriy {
      margin-top: 40px;
    }

    .MuiTableCell-head {
      font-weight: bold;
      color: #9c98a6;
    }

    .MuiTypography {
      font-weight: bold;
      color: #9c98a6;
    }

    .MuiTypography-h6 {
      font-weight: bold;
      color: #9c98a6;
    }

    .MuiTableCell-root {
      font-weight: 700;
    }

    .MuiPaper-root  {
      background-color: #353535;
      font-weight: bold!important;
      color: #9c98a6;
      border-radius: 10px;
      overflow: initial;

      .css-2s90m6-MuiAvatar-root {
        background: none;
      }

      .css-cveggr-MuiListItemIcon-root {
        min-width: 40px;
      }

      .css-i4bv87-MuiSvgIcon-root{
        margin-right: 20px;
      }

      .css-1p823my-MuiListItem-root {
        margin-left: 25px;

        &:hover {
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }
}
  
  body, input, button {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
