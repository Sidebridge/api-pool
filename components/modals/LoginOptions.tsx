import AuthIntegrations from "@/public/constants/integrations";

import BasePill from "../common/base/BasePill";

const LoginOptions = () => {
  return (
    <div className="align-col w-full p-8">
      <h1 className="text-white text-3xl font-semibold">Hey 👋🏼, Login!</h1>
      <p className="text-grey font-light mt-2">
        Login to access more actions like: <br />
        Adding reviews, bookmarking APIs, and stay notified.
      </p>

      <div className="row-btwn items-center w-full mt-6 flex-wrap gap-x-4">
        {AuthIntegrations.map((integration) => (
          <BasePill
            key={integration.name}
            text={`Login with ${integration.name}`}
            preIcon={integration.icon}
            styles="flex-grow mb-4 press border-2"
          />
        ))}
      </div>
    </div>
  );
};

export default LoginOptions;
