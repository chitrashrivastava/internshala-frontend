import React from "react";

const InternshipCard = ({ internship }) => {
  return (
    <div className="internship-card">
      {/* Image (Optional) */}
      {internship.image && (
        <img src={internship.image} alt={internship.profile} className="card-image" />
      )}

      <div className="card-content">
        {/* Title and Basic Info */}
        <div className="card-header">
          <h3>{internship.profile}</h3>
          <p>
            {internship.internshiptype}, {internship.from} - {internship.to}
          </p>
        </div>

        {/* Key Details */}
        <ul className="key-details">
          <li>
            <span className="detail-label">Openings:</span>
            <span className="detail-value">{internship.openings}</span>
          </li>
          <li>
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{internship.duration}</span>
          </li>
          <li>
            <span className="detail-label">Stipend:</span>
            <span className="detail-value">
              {internship.stipend.status === "Fixed"
                ? `${internship.stipend.amount}`
                : internship.stipend.status}
            </span>
          </li>
        </ul>

        {/* Additional Info (Optional) */}
        {internship.skills && (
          <div className="card-section">
            <h4>Skills</h4>
            <p>{internship.skills}</p>
          </div>
        )}
        {internship.perks && (
          <div className="card-section">
            <h4>Perks</h4>
            <p>{internship.perks}</p>
          </div>
        )}
        {internship.assessment && (
          <div className="card-section">
            <h4>Assessment Process</h4>
            <p>{internship.assessment}</p>
          </div>
        )}
      </div>

      {/* Action button (Optional) */}
      {internship.action && (
        <button className="card-action">{internship.action}</button>
      )}
    </div>
  );
};

export default InternshipCard;
