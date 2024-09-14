/* eslint-disable no-useless-escape */
import { Octokit } from "octokit";
import { UserListItem } from "../interfaces/user/search-item.interface";

const octokit = new Octokit();

export const getUserById = async (id: number) => {
  return await octokit.request(`GET /user/${id}`);
};

export const getPaginatedData = async (url: string, query: string) => {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let data: UserListItem[] = [];
  let hasMore: boolean = false;

  const response = await octokit.request(`GET ${url}`, {
    per_page: 100,
    q: query,

    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const parsedData = parseData(response.data) as UserListItem[];
  data = [...data, ...parsedData];

  const linkHeader = response.headers.link;

  hasMore = linkHeader ? linkHeader.includes(`rel=\"next\"`) : false;

  if (hasMore && linkHeader) {
    url = linkHeader.match(nextPattern)![0];
  }

  return { data, hasMore, url };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseData(data: any) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data) {
    return [];
  }

  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;

  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}
