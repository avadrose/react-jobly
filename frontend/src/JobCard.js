import React, { useContext } from "react";
import UserContext from "./UserContext";

function JobCard({
  id,
  title,
  salary,
  equity,
  companyName,
  applyToJob
}) {
  const { currentUser } = useContext(UserContext);

  const hasApplied =
    currentUser &&
    currentUser.applications &&
    currentUser.applications.includes(id);

  async function handleApply() {
    if (applyToJob) {
      await applyToJob(id);
    }
  }

  return (
    <div>
      <h3>{title}</h3>

      {companyName && <p>{companyName}</p>}

      <p>Salary: {salary || "Not listed"}</p>
      <p>Equity: {equity || "0"}</p>

      {applyToJob && (
        <button
          onClick={handleApply}
          disabled={hasApplied}
        >
          {hasApplied ? "Applied" : "Apply"}
        </button>
      )}
    </div>
  );
}

export default JobCard;