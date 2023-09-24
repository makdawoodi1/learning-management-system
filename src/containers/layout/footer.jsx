import React from "react";
import { Link } from "react-router-dom";

const newsTitle = "Want Us To Email You About Special Offers And Updates?";
const siteTitle = "Pages";
const useTitle = "Useful Links";
const socialTitle = "Social Contact";
const supportTitle = "Our Support";

const siteList = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Courses",
    link: "/courses",
  },
  {
    text: "Dashboard",
    link: "/auth/dashboard",
  },
];

const useList = [
  {
    text: "About Us",
    link: "#",
  },
  {
    text: "Terms & Conditions",
    link: "#",
  },
  {
    text: "Contact Us",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
];

const socialList = [
  {
    text: "Facebook",
    link: "#",
  },
  {
    text: "Twitter",
    link: "#",
  },
  {
    text: "Instagram",
    link: "#",
  }
];

const Footer = () => {
  return (
    <div className="news-footer-wrap">

      <div className="news-letter">
        <div className="container">
          <div className="section-wrapper">
            <div className="news-title">
              <h3>{newsTitle}</h3>
            </div>
            <div className="news-form">
              <form action="/">
                <div className="nf-list">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                  <input type="submit" name="submit" value="Subscribe Now" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top padding-tb pt-0">
          <div className="container">
            <div className="row g-4 row-cols-xl-4 row-cols-md-2 row-cols-1 justify-content-center">
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{siteTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {siteList.map((val, i) => (
                            <li key={i}>
                              <Link to={val.link}>{val.text}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{useTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {useList.map((val, i) => (
                            <li key={i}>
                              <Link>{val.text}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{socialTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {socialList.map((val, i) => (
                            <li key={i}>
                              <Link>{val.text}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-bottom style-2">
          <div className="container">
            <div className="section-wrapper">
              <p>
                &copy; 2022 <Link to="/">Edukon</Link> Designed by
                <a
                  href="#"
                  target="_blank"
                >
                  CodexCoder
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;
