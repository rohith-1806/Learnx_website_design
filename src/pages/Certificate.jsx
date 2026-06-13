import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Certificate.css";

const cleanCourseName = (name, description) => {
  if (description) {
    const parts = description.split(/\s+content\s+for\s+/i);
    if (parts.length > 1) {
      let trackName = parts[1].trim();
      if (trackName.toLowerCase().includes("communication")) return "Communication";
      if (trackName.toLowerCase().includes("soft skills")) return "Soft Skills";
      if (trackName.toLowerCase().includes("data science")) return "Data Science";
      if (trackName.toLowerCase().includes("aptitude")) return "Aptitude Training";
      if (trackName.toLowerCase().includes("express")) return "Express.js";
      if (trackName.toLowerCase().includes("mongodb")) return "MongoDB";
      if (trackName.toLowerCase().includes("personality")) return "Personality Development";
      if (trackName.toLowerCase().includes("interview")) return "Interview Preparation";
      if (trackName.toLowerCase().includes("cyber")) return "Cyber Security";
      if (trackName.toLowerCase().includes("cloud")) return "Cloud Computing";
      if (trackName.toLowerCase().includes("ai track")) return "AI Track";
      return trackName;
    }
  }
  if (name === "Tutorials" || name === "Videos" || name === "Assignments" || name === "Quizzes" || name === "Projects") {
    if (description && description.includes("HTML")) return "HTML";
    if (description && description.includes("CSS")) return "CSS";
    if (description && description.includes("JavaScript")) return "JavaScript";
    if (description && description.includes("React")) return "React";
    if (description && description.includes("Node")) return "Node.js";
  }
  return name || "";
};

const Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { cert, course } = location.state || {};

  if (!cert || !course) {
    return (
      <div className="cert-error-page">
        <h3>No Certificate Context</h3>
        <p>Please select a certificate to view from your Profile page.</p>
        <button className="btn-back-profile" onClick={() => navigate("/profile")}>
          Go to Profile
        </button>
      </div>
    );
  }

  const issueDate = cert.createdAt ? new Date(cert.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="certificate-page-container">
      <div className="cert-utility-bar">
        <button className="btn-back-profile" onClick={() => navigate("/profile")}>
          ← Back to Profile
        </button>
        <button className="btn-print-cert" onClick={printCertificate}>
          🖨️ Print / Save as PDF
        </button>
      </div>

      {/* Frame boundary wrapper */}
      <div className="certificate-canvas-frame">
        <div className="certificate-inner-border">
          <div className="certificate-header">
            <div className="cert-logo-container">L</div>
            <h1 className="cert-main-title">Certificate of Completion</h1>
            <p className="cert-subtitle">LernX Online Learning Platform</p>
          </div>

          <div className="certificate-body">
            <p className="cert-presented-txt">This credential is proudly awarded to</p>
            <h2 className="cert-user-name">
              {(() => {
                let name = cert.studentFullName || cert.studentName || user?.name || "Perumalla Rohith";
                if (name === "Student Learner") name = user?.name || "Perumalla Rohith";
                return name;
              })()}
            </h2>
            
            {cert.collegeName && (
              <p className="cert-college-txt" style={{ fontSize: "1.1rem", color: "#475569", margin: "0.25rem 0 0.5rem 0" }}>
                of <strong>{cert.collegeName}</strong>
              </p>
            )}

            {cert.year && (
              <p className="cert-year-txt" style={{ fontSize: "0.95rem", color: "#64748b", margin: "0.25rem 0 0.5rem 0" }}>
                Graduation Year: <strong>{cert.year}</strong>
              </p>
            )}

            <p className="cert-completion-statement" style={{ marginTop: "1rem" }}>
              for successfully finishing the curriculum and requirements for the learning course
            </p>
            <h3 className="cert-course-name">{cleanCourseName(course?.name || cert?.courseId?.name, course?.description || cert?.courseId?.description)}</h3>

            <p className="cert-congrats-text">
              An accomplishment of standard excellence demonstrating comprehensive conceptual understanding and hands-on laboratory application.
            </p>
          </div>

          <div className="certificate-footer">
            <div className="footer-sig-block">
              <div className="sig-line">LernX Registrar</div>
              <div className="sig-label">Authorized Signatory</div>
            </div>

            <div className="footer-seal-block">
              <div className="cert-gold-seal">
                <span className="seal-text">VERIFIED</span>
                <span className="seal-stars">★ ★ ★</span>
              </div>
            </div>

            <div className="footer-meta-block">
              <div className="meta-line">
                <span className="lbl">Issue Date:</span>
                <span className="val">{issueDate}</span>
              </div>
              <div className="meta-line">
                <span className="lbl">Credential ID:</span>
                <span className="val">{cert._id || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
