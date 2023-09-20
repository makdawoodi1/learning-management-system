const Author = ({ authorImage }) => {
  return (
    <div className="authors">
      <div className="author-thumb">
        <img src={authorImage ? authorImage : "/author.jpg"} alt="rajibraj91" />
      </div>
      <div className="author-content">
        <h5>Dr. Adrienne Platt</h5>
        <span>Phd</span>
        <p>I'm an Afro-Latina digital artist originally from Long Island, NY. I love to paint design and photo manpulate in Adobe Photoshop while helping others learn too. Follow me on Instagram or tweet me</p>
      </div>
    </div>
  );
};

export default Author;
