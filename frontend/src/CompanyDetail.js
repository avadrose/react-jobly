import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function CompanyDetail({ applyToJob }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }

    getCompany();
  }, [handle]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      {company.jobs && company.jobs.length ? (
        company.jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={company.name}
            applyToJob={applyToJob}
          />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default CompanyDetail;