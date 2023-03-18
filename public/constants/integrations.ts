type AuthIntegration = {
  name: string;
  icon: string;
};

const AuthIntegrations: Array<AuthIntegration> = [
  { name: "Google", icon: "GoogleLogo" },
  { name: "Github", icon: "GithubWhite" },
  // { name: "Apple", icon: "AppleLogo" },
];

export default AuthIntegrations;
