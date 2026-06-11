export const siteConfig = {
  name: "OpenToolbox",
  tagline: "Your open tools directory",
  githubRepoUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/open-toolbox/open-toolbox",
  githubIssuesUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL != null
      ? `${process.env.NEXT_PUBLIC_GITHUB_REPO_URL}/issues`
      : "https://github.com/open-toolbox/open-toolbox/issues",
}
