import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>LearnHub</h2>
        <p>Learn, Grow and Build Your Career with Us.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">Events</a>
          <a href="/">My Courses</a>
          <a href="/">Contact</a>
        </div>

        <p className="copyright">
          © 2026 LearnHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;