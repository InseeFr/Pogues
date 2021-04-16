#!/bin/sh
echo "window._env_['API_URL'] = '$API_URL';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['LOG_LEVEL'] = '$LOG_LEVEL';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['ACTIVE_NAMESPACES'] = '$ACTIVE_NAMESPACES';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['ESLINT_NO_DEV_ERRORS'] = '$ESLINT_NO_DEV_ERRORS';" >> /usr/share/nginx/html/env-config.js
exec "$@"