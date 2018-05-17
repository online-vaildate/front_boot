const config = {
  "local":  <%= local %>, //是否为本地开发
  "clientId": <%= clientid %>, // 必须填入响应的客户端
  "titlename": <%= titlename %>, //项目页面的title名称
  "favicon": <%= favicon %>, //项目页面的icon图片名称
  "theme": <%= configTheme %>, //是否开启主题色设定
  "mainCss": JSON.stringify("<%= configMainCss %>"), //master选择哪个项目的主题
  "Masters": JSON.stringify("<%= configMasters %>"), //master选择哪个项目模块
  "Home": JSON.stringify("<%= configHome %>"), //Home选择哪个项目模块
  "themeSetting": {
    "antdTheme": {
      "primary-color": "<%= antd %>", //antd的主题颜色设定
    },
    "header": "<%= header %>", //头部主题颜色设定
    "backgroundColor": "<%= background %>", //背景色主题颜色设定
  },
  server : "<%= server %>", //后端api的地址
};

module.exports = config;

