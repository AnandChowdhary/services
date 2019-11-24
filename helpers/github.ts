import axios, { AxiosResponse } from "axios";

export interface File {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file";
  _links: {
    git: string;
    self: string;
    url: string;
  };
}

export const writeGitHubFile = async (
  repo: string,
  path: string,
  message: string,
  content: string
) => {
  const currentContents = (await axios.get(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      headers: {
        "User-Agent": "AnandChowdhary/services",
        Authorization: `token ${process.env.FINDING_ANAND_ACCESS_TOKEN}`
      }
    }
  )) as AxiosResponse<File>;
  await fetch(
    `https://api.github.com/repos/${this.state.repo}/contents/${this.state.file}`,
    {
      method: "PUT",
      headers: {
        "User-Agent": "AnandChowdhary/services",
        Authorization: `token ${process.env.FINDING_ANAND_ACCESS_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        content: btoa(content),
        sha: currentContents.data.sha
      })
    }
  );
};
