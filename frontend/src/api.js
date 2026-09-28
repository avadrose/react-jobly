import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${JoblyApi.token}`
    };

    const params = method === "get" ? data : {};

    try {
      return (
        await axios({
          url,
          method,
          data,
          params,
          headers
        })
      ).data;
    } catch (err) {
      console.error("API Error:", err.response);

      let message =
        err.response?.data?.error?.message ||
        "Unknown API error";

      throw Array.isArray(message)
        ? message
        : [message];
    }
  }

  static async getCompanies(name) {
    const res = await this.request(
      "companies",
      name ? { name } : {}
    );

    return res.companies;
  }

  static async getCompany(handle) {
    const res = await this.request(
      `companies/${handle}`
    );

    return res.company;
  }

  static async getJobs(title) {
    const res = await this.request(
      "jobs",
      title ? { title } : {}
    );

    return res.jobs;
  }

  static async login(data) {
    const res = await this.request(
      "auth/token",
      data,
      "post"
    );

    return res.token;
  }

  static async signup(data) {
    const res = await this.request(
      "auth/register",
      data,
      "post"
    );

    return res.token;
  }

  static async getUser(username) {
    const res = await this.request(
      `users/${username}`
    );

    return res.user;
  }

  static async saveProfile(username, data) {
    const res = await this.request(
      `users/${username}`,
      data,
      "patch"
    );

    return res.user;
  }

  static async applyToJob(username, jobId) {
    await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );

    return jobId;
  }
}

export default JoblyApi;