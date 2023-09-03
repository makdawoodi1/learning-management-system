import Rating from "@/containers/sidebar/rating";

const title = "Centers for disease control & prevention";
const desc =
  "This course will introduce students to the mission, history, and organization of the CDC. Topics will include disease surveillance, prevention, and control; public health emergencies; global health; and emerging infectious diseases. Students will also learn about the CDC's role in public health research and policy development.";
const author = "Dr. Adrienne Platt";
const reviewCount = "03 reviews";
const videoLink = "https://www.youtube-nocookie.com/embed/jP649ZHA8Tg";

const categoryList = [
  {
    link: "#",
    text: "Pharmacy",
    className: "course-cate",
  },
  {
    link: "#",
    text: "30% Off",
    className: "course-offer",
  },
];

const PageHeader = () => {
  return (
    <div className="pageheader-section style-2">
      <div className="container">
        <div className="row justify-content-center justify-content-lg-between align-items-center flex-row-reverse">
          <div className="col-lg-7 col-12">
            <div className="pageheader-thumb">
              <img
                src="/pageheader/02.jpg"
                alt="rajibraj91"
                className="w-100"
              />
              <a
                className="video-button popup"
                target="_blank"
              >
                <i className="icofont-ui-play"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="pageheader-content">
              <div className="course-category">
                {categoryList.map((val, i) => (
                  <a href={val.link} className={val.className} key={i}>
                    {val.text}
                  </a>
                ))}
              </div>
              <h2 className="phs-title">{title}</h2>
              <p className="phs-desc">{desc}</p>
              <div className="phs-thumb">
                <img src="/pageheader/03.jpg" alt="rajibraj91" />
                <span>{author}</span>
                <div className="course-reiew">
                  <Rating />
                  <span className="ratting-count">{reviewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
