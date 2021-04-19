#!/bin/sh
echo "window._env_['API_URL'] = '$API_URL';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['ACTIVE_NAMESPACES'] = '$ACTIVE_NAMESPACES';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['AUTH_TYPE'] = '$AUTH_TYPE';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['OIDC_AUTHORITY'] = '$OIDC_AUTHORITY';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['OIDC_CLIENT_ID'] = '$OIDC_CLIENT_ID';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['DEFAULT_USER_ID'] = '$DEFAULT_USER_ID';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['DEFAULT_USER_NAME'] = '$DEFAULT_USER_NAME';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['DEFAULT_USER_STAMP'] = '$DEFAULT_USER_STAMP';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['LOG_LEVEL'] = '$LOG_LEVEL';" >> /usr/share/nginx/html/env-config.js
exec "$@"