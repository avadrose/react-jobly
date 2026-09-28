import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    search();
  }, []);

  async function search(name) {
    const companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Companies</h1>

      <SearchForm 
        search={search}
        placeholder="Search companies..."
        />

      {companies.length ? (
        companies.map(company => (
          <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
          />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}

export default CompanyList;