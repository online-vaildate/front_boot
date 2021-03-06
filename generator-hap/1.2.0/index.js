// initializing - 您的初始化方法（检查当前项目状态，获取配置等）
// prompting- 在哪里提示用户选择（你打电话的地方this.prompt()）
// configuring- 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
// default - 如果方法名称与优先级不匹配，将被推送到此组。
// writing - 编写生成器特定文件（路由，控制器等）的位置
// conflicts - 处理冲突（内部使用）
// install - 运行安装（npm，bower）
// end- 称为最后，清理，再见再见等
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const fs = require('fs');
const files = fs.readdirSync(path.join(__dirname, "../../../")).filter(function (file) {
  return file != "boot" && file.indexOf(".") < 0 && fs.statSync(path.join(__dirname, "../../../", file)).isDirectory();
});

const promtArray = [
  {
    type: 'list',
    name: 'local',
    message: '是否开启本地开发?（Do you open the option of local development ?）',
    choices: ['true', 'false']
  },
  {
    type: 'input',
    name: 'clientid',
    message: '请输入客户端ID?（Please input Client ID: ）',
    default: this.clientid
  },
  {
    type: 'input',
    name: 'titlename',
    message: '请输入网站页面的名称?（Please input name of Web: ）',
    default: this.titlename
  },
  {
    type: 'input',
    name: 'favicon',
    message: '请输入网站页面的Icon?（Please input Icon of Web: ）',
    default: this.favicon
  },
  {
    type: 'list',
    name: 'Theme',
    message: '是否开启主题?（Do you open the option of theme ?）',
    choices: ['true', 'false']
  },
  {
    type: 'list',
    name: 'MainCss',
    message: '请输入你要选择哪个模块作为项目的主要css文件：（Please input project name as the mainstyle:）',
    choices: files
  },
  {
    type: 'list',
    name: 'Masters',
    message: '请输入你要选择哪个模块作为项目的主要Master文件：（Please input project name as the Master:）',
    choices: files
  },
  {
    type: 'list',
    name: 'Home',
    message: '请输入你要选择哪个模块作为项目的首页：（Please input project name as the homepage:）',
    choices: files
  },
  {
    type: 'input',
    name: 'server',
    message: '请输入服务端地址: (Please input server address:)',
    default: this.server
  },
  {
    type: 'input',
    name: 'AntdTheme',
    message: '请输入你想要Antd的主题颜色: (Please input antd of theme:)',
    default: this.themeAntdTheme
  },
  {
    type: 'input',
    name: 'Header',
    message: '请输入你想要Header的颜色: (Please input header of color:)',
    default: this.themeHeader
  },
  {
    type: 'input',
    name: 'backgroundColor',
    message: '请输入你想要背景颜色: (Please input backgroundColor:)',
    default: this.themeBackgroundColor
  },
];
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.local = true,
    this.clientid = 'localhost',
    this.titlename = 'HAP',
    this.favicon = 'favicon.jpg',
    this.configTheme = true;
    this.configMainCss = 'boot';
    this.configMasters = 'boot';
    this.configHome = 'iam';
    this.server = "http://gateway.devops.saas.hand-china.com";
    this.themeAntdTheme = "#3b78e7";
    this.themeHeader = "#3b78e7";
    this.themeBackgroundColor = "white";
  }

  info() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('HAP Cloud')
    ));
  }
  prompting() {
    return this.prompt(promtArray).then(answer => {
      this.local = answer.local,
      this.clientid = answer.clientid,
      this.titlename = answer.titlename,
      this.favicon = answer.favicon,
      this.configTheme = answer.Theme;
      this.configMainCss = answer.MainCss;
      this.configMasters = answer.Masters;
      this.configHome = answer.Home;
      this.server = answer.server;
      this.themeAntdTheme = answer.AntdTheme;
      this.themeHeader = answer.Header;
      this.themeBackgroundColor = answer.backgroundColor;
    });
  };
  writing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('.gitlab-ci.yml'),
      this.destinationPath('.gitlab-ci.yml')
    );
    this.fs.copy(
      this.templatePath('deployment.template.yml'),
      this.destinationPath('deployment.template.yml')
    );
    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile')
    );
    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile')
    );
    this.fs.copy(
      this.templatePath('.deploy.yml'),
      this.destinationPath('.deploy.yml')
    );
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config.js'),
      {
        local: this.local,
        titlename: this.titlename,
        favicon: this.favicon,
        configMasters: this.configMasters,
        clientid: this.clientid,
        configTheme: this.configTheme,
        configMainCss: this.configMainCss,
        configHome: this.configHome,
        antd: this.themeAntdTheme,
        header: this.themeHeader,
        background: this.themeBackgroundColor,
        server: this.server
      }
    );
  };
  end() {
    this.log(yosay(
      'Create option Success'
    ));
  }
};
