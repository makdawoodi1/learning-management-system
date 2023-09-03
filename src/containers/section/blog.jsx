import React from "react";
import { Link } from "react-router-dom";

const subTitle = "FORM OUR BLOG POSTS";
const title = "More Articles From Resource Library";

const blogList = [
  {
    imgUrl: "/blog/01.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "3",
  },
  {
    imgUrl: "/blog/02.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "4",
  },
  {
    imgUrl: "/blog/03.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "6",
  },
];

const Blog = () => {
  return (
    <div className="blog-section padding-tb section-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
            {blogList.map((val, i) => (
              <div className="col" key={i}>
                <div className="post-item">
                  <div className="post-inner">
                    <div className="post-thumb">
                      <Link to="/article/1">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </Link>
                    </div>
                    <div className="post-content">
                      <Link to="/article/1">
                        <h4>{val.title}</h4>
                      </Link>
                      <div className="meta-post">
                        <ul className="lab-ul">
                          <li>
                            <i className="icofont-ui-user"></i>
                            {val.author}
                          </li>
                          <li>
                            <i className="icofont-calendar"></i>
                            {val.date}
                          </li>
                        </ul>
                      </div>
                      <p>{val.desc}</p>
                    </div>
                    <div className="post-footer">
                      <div className="pf-left">
                        <Link to="/article/1" className="lab-btn-text">
                          {val.btnText}
                          <i className="icofont-external-link"></i>
                        </Link>
                      </div>
                      <div className="pf-right">
                        <i className="icofont-comment"></i>
                        <span className="comment-count">
                          {val.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
