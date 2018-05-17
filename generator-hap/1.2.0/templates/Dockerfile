FROM registry.saas.hand-china.com/tools/pynginx:stable

MAINTAINER tongyan.liu@hand-china.com

ENV PRO_API_HOST gateway.devops.saas.hand-china.com
ENV LOCAL false
ENV TITLE_NAME HAP_CLOUD

RUN echo "Asia/shanghai" > /etc/timezone;
ADD dist /usr/share/nginx/html
COPY ./boot/structure/enterpoint.sh /usr/share/nginx/html
COPY config.yml /usr/share/nginx/html
COPY ./boot/structure/pythonsql.py /usr/share/nginx/html
RUN chmod 777 /usr/share/nginx/html/enterpoint.sh
ENTRYPOINT ["/usr/share/nginx/html/enterpoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
