import { Link } from "react-router-dom";

function Home() {
  const hobbyExamples = [
    "woodworking",
    "crochet",
    "cars",
    "gardening",
    "photography",
    "cooking",
  ];

  return (
    <section className="home-page">
      <div className="hero">
        <h1>Discover resources for every hobby.</h1>
        <p>
          HobbyBook helps makers, builders, and hobbyists find books and
          learning resources for the projects they care about.
        </p>

        <Link to="/search" className="hero-button">
          Start Searching
        </Link>
      </div>

      <div className="home-section">
        <h2>Search by hobby or interest</h2>
        <p>
          Look up resources for hobbies like car builds, woodworking, crochet,
          gardening, photography, and more.
        </p>

        <div className="hobby-tags">
          {hobbyExamples.map((hobby) => (
            <Link key={hobby} to={`/search?topic=${hobby}`} className="hobby-tag">
              {hobby}
            </Link>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h2>Save useful resources</h2>
        <p>
          Add helpful books to your Saved Book Stack so you can come back to them
          later while planning future projects.
        </p>
      </div>
    </section>
  );
}

export default Home;