import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <Link to={`/companies/${handle}`}>
      <div>
        <h3>{name}</h3>

        <p>{description}</p>

        {logoUrl && (
          <img
            src={logoUrl}
            alt={name}
            style={{ width: "100px" }}
          />
        )}
      </div>
    </Link>
  );
}

export default CompanyCard;