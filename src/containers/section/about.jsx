import React from "react";

const subTitle = "How do we work?";
const title = "Diverse. Inclusive. Inspiring";
const desc =
  "Distinctively provide acces mutfuncto users whereas transparent proceses somes ncentivize eficient functionalities rather than extensible archtectur communicate leveraged services and cross-platform.";

const aboutList = [
  {
    imgUrl: "/about/icon/01.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "What is included in my parent coaching?",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl: "/about/icon/02.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "How to help kids be more self sufficient?",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl: "/about/icon/03.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "How do I sign up?",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
];

const About = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-end flex-row-reverse">
          <div className="col">
            <div className="about-right padding-tb">
              <div className="section-header">
                <div className="badge-container">
                  <span className="header-text-md" style={{ fontSize: "1.5rem" }}>{subTitle}</span>
                </div>
                <h2 className="header-text" style={{ fontSize: "4rem" }}>{title}</h2>
                {/* <p>{desc}</p> */}
              </div>
              <div className="section-wrapper">
                <ul className="lab-ul">
                  {aboutList.map((val, i) => (
                    <li key={i}>
                      <div className="sr-left">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="sr-right">
                        <h5>{val.title}</h5>
                        <p>{val.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="about-left">
              <div className="about-thumb">
                <img src="/about/01.png" alt="about" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
