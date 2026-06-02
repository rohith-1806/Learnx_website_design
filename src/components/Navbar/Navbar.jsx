import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>LearnHub</h2>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#courses">Courses</a></li>
      </ul>

      <div>
        <button className="btn">Sign In</button>
        <button className="btn login">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;