export interface AtsBoard {
  token: string;
  name: string;
  careerUrl: string;
  provider: "greenhouse" | "lever";
}

/**
 * Javni career boardovi. Ne tvrdimo da zapošljavaju iz Srbije.
 * Eligibility se računa iz lokacije svakog oglasa.
 */
export const ATS_BOARDS: AtsBoard[] = [
  {
    token: "gitlab",
    name: "GitLab",
    careerUrl: "https://about.gitlab.com/jobs/",
    provider: "greenhouse",
  },
  {
    token: "remotecom",
    name: "Remote",
    careerUrl: "https://remote.com/careers",
    provider: "greenhouse",
  },
  {
    token: "1password",
    name: "1Password",
    careerUrl: "https://1password.com/careers",
    provider: "greenhouse",
  },
  {
    token: "hashicorp",
    name: "HashiCorp",
    careerUrl: "https://www.hashicorp.com/careers",
    provider: "greenhouse",
  },
  {
    token: "grafana",
    name: "Grafana Labs",
    careerUrl: "https://grafana.com/about/careers/",
    provider: "greenhouse",
  },
  {
    token: "cloudflare",
    name: "Cloudflare",
    careerUrl: "https://www.cloudflare.com/careers/",
    provider: "greenhouse",
  },
  {
    token: "elastic",
    name: "Elastic",
    careerUrl: "https://www.elastic.co/careers",
    provider: "greenhouse",
  },
];
