import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";

function JobList({ applyToJob }) {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    const jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Jobs</h1>

      <SearchForm
        search={search}
        placeholder="Search jobs..." 
        />

      {jobs.length ? (
        jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
            applyToJob={applyToJob}
          />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;