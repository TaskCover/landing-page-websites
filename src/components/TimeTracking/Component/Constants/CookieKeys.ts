const port = import.meta.env.VITE_APP_PORT || 3000;

export default {
  SAVED_SECURE_TOKEN: `@ELECTRON${port}:secure_token`,
  SAVED_SECURE_REFRESH_TOKEN: `@ELECTRON${port}:secure_refresh_token`,
  CURRENT_LANGUAGE: `@ELECTRON${port}:current_language`,
  SAVED_USER_DATA: `@ELECTRON${port}:udata`,
  SAVED_FULL_NAME: `@ELECTRON${port}:full_name`,
  SAVED_REMEMBER: `@ELECTRON${port}:remember`,
  ROLE_KEY: `@ELECTRON${port}:role_key`,
  LOCALE_KEY: `@ELECTRON${port}:locale`,
  EXPANDED_SIDEBAR: `@ELECTRON${port}:expanded_sidebar`,
  SAVED_USER_ID: `@ELECTRON${port}:user_id`,
  SAVED_USER_EMAIL: `@ELECTRON${port}:email`,
  SAVED_WINDOW_MODE: `@ELECTRON${port}:darkmode`,
  SAVED_AUTH_KEY: `@ELECTRON${port}:authkey`,
};
