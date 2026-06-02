import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h1>Learn Skills. Build Your Future.</h1>

      <p>
        Upgrade your knowledge with industry-focused courses,
        live workshops, and hands-on projects designed by experts.
      </p>

      <p>
        Join thousands of students who are improving their skills
        in Web Development, Artificial Intelligence, Machine Learning,
        Data Science, and many more emerging technologies.
      </p>

      <div className="hero-buttons">
        <button>Explore Courses</button>
        <button className="secondary-btn">View Events</button>
      </div>

      
       
    </section>
  );
}

export default Hero;