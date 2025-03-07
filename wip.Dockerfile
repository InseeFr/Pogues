FROM nginxinc/nginx-unprivileged:1.27-alpine

# Non root user
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx

ENV NGINX_CONF_ENV_VARIABLES="\${VITE_POGUES_LEGACY} \${VITE_OIDC_ISSUER_BASE}"

USER $NGINX_USER_ID

# Add build to nginx root webapp
COPY --chown=$NGINX_USER:$NGINX_USER dist /usr/share/nginx/html

# Copy nginx configuration
RUN rm etc/nginx/conf.d/default.conf
# COPY --chown=$NGINX_USER:$NGINX_USER nginx.conf etc/nginx/conf.d/
COPY --chown=$NGINX_USER:$NGINX_USER nginx.conf etc/nginx/conf.d/
RUN chmod 755 /usr/share/nginx/html/vite-envs.sh

USER $NGINX_USER_ID
EXPOSE 8080

ENTRYPOINT sh -c "/usr/share/nginx/html/vite-envs.sh \
    && envsubst '$NGINX_CONF_ENV_VARIABLES' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'"