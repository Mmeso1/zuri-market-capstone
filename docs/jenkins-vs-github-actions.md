# Jenkins vs GitHub Actions for Zuri Market

Zuri Market is a three-developer team with its code on GitHub and no dedicated
operations staff. This compares the two CI/CD options for that situation.

| Criterion              | Jenkins                                                         | GitHub Actions                                                                           | For Zuri              |
| ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------- |
| Who runs it            | We install, patch and back up the server and agents             | GitHub runs it                                                                           | Actions               |
| Time to first pipeline | Install, plugins, credentials, webhooks                         | A YAML file in the repo works on the first push                                          | Actions               |
| Git integration        | Via plugins and webhooks                                        | Native: pull request checks, required status checks                                      | Actions               |
| Pipeline as code       | Jenkinsfile plus some UI and plugin configuration               | YAML in the repo only                                                                    | Actions, slightly     |
| Ecosystem              | Very large plugin ecosystem; each plugin is something to secure | Marketplace of actions; supply-chain risk                                                | Tie                   |
| Cost                   | Server cost plus maintenance time                               | Free minutes for public repos; per-minute pricing beyond the free tier for private repos | Actions               |
| Ceiling                | Very strong for complex, on-premises or highly customised needs | Enough for most teams; self-hosted runners exist                                         | Revisit if needs grow |

## What we saw in this project

- **Setup:** two workflow files (`backend-ci.yml`, `frontend-ci.yml`) were enough for a
  full pipeline: lint, test, `npm audit`, SonarQube quality gate, Docker build, Trivy
  scan and a push to GHCR. No server to install or maintain.
- **Merge gate:** the four jobs are required status checks on `main`, so a pull request
  cannot merge until they all pass. This is built into GitHub; Jenkins would need a
  plugin and webhooks for the same result.
- **The pipeline failed when it should:** on the first pull request, Trivy found
  HIGH/CRITICAL vulnerabilities in both images (npm bundled in the Node image, and
  outdated Alpine packages in the nginx image). No image was pushed until they were fixed.
- **Supply-chain risk is real on both sides:** the March 2026 Trivy action compromise
  is why third-party actions here are pinned to full commit SHAs, with Dependabot
  proposing updates. Jenkins plugins carry the same kind of risk.

## Conclusion to adapt

Zuri is a three-developer team on GitHub with no dedicated operations staff, so the managed, in-repo, PR-integrated model of GitHub Actions wins. Jenkins becomes attractive only if the company later needs heavy customisation or on-premises builds.
I would only reconsider when the team needs total control of their CI/CD pipeline. As the Trivy incident showed, third-party code in a pipeline can be used to attack it. Running our own Jenkins server gives more control over what runs, but it does not remove that risk, because Jenkins plugins are third-party code too, and the server itself must be secured and patched. Jenkins also makes sense once there is an operations team to run it and the extra server and maintenance cost is acceptable.
