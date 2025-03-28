const { VITE_ENV: environment = 'development', VITE_API_URL: apiUrl = '' } =
  import.meta.env;

export const EnvConfig = () => ({
  environment,
  apiUrl,
});
