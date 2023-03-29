import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import React from 'react';
import { Link } from "react-router-dom";
import { adminSidebarData, sidebarData } from '../datatablesource';
import './Sidebar.scss';

const Sidebar = () => {
  const data = sessionStorage.getItem("role") === "ADMIN" ? adminSidebarData : sidebarData;
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">
          <div><CoronavirusOutlinedIcon /></div>
          <div style={{ marginLeft: "3px" }}>Anti Epidemeic System</div>
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          {
            data.map((e) => (
              <div key={e.title}>
                <p className="title">{e.title}</p>
                {e.links.map((l) => (
                  <Link to={l.routlink} key={l.routlink} style={{ textDecoration: "none" }}>
                    <li>
                      {l.icon}
                      <span style={{ marginLeft: "12px", alignItems: "center" }}>{l.name}</span>
                    </li>
                  </Link>
                ))}
              </div>
            ))
          }
          <p className="title">USEFUL LINKS</p>
          <a
            href="https://booking.communitytest.gov.hk/form/index.jsp"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <VaccinesOutlinedIcon style={{ color: "#7451f8", fontSize: "25px" }} />
              <span>PCR Test Booking</span>
            </li>
          </a>
          <a
            href="https://www.coronavirus.gov.hk/eng/rat.html"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <VaccinesOutlinedIcon style={{ color: "#7451f8", fontSize: "25px" }} />
              <span>COVID-19 Thematic Website</span>
            </li>
          </a>
          <a
            href="https://www.chp.gov.hk/en/features/17980.html"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <VaccinesOutlinedIcon style={{ color: "#7451f8", fontSize: "25px" }} />
              <span>Centre for Health Protection</span>
            </li>
          </a>
          <a
            href="https://booking.covidvaccine.gov.hk/forms/index.jsp"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <VaccinesOutlinedIcon style={{ color: "#7451f8", fontSize: "25px" }} />
              <span>COVID-19 Vaccination Programme</span>
            </li>
          </a>
        </ul>
      </div>
    </div >
  )
}

export default Sidebar