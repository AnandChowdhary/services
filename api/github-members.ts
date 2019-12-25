import { NowRequest, NowResponse } from "@now/node";
import { githubUserPics } from "../helpers/github-user-pics";

export default async (req: NowRequest, res: NowResponse) => {
  return await githubUserPics(
    req,
    res,
    `https://api.github.com/orgs/${req.query.org}/members`
  );
};
