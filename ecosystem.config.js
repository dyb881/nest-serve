const createApp = (name) => {
  return {
    name: `v3-${name}`,
    script: `dist/apps/${name}/main.js`,
    env: { NODE_ENV: 'development' },
    env_production: { NODE_ENV: 'production' },
  };
};

module.exports = {
  apps: [createApp('account'), createApp('infos'), createApp('admin')],
  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
};
