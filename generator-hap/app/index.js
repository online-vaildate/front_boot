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

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.appProject = "demo";
    this.description = "";
    this.author = "";
    this.license = "";
  }

  info() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hap cloud')
    ));
  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name:',
        default: this.appProject
      },
      {
        type: 'list',
        name: 'projectVersion',
        message: 'Please choose version(1.0.0/1.1.0(后端初始化数据库),1.2.0(前端初始化部分数据库))',
        choices: ['release-1.0.0','release-1.1.0','release-1.2.0']
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:',
        default: this.description
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author:',
        default: this.author
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC']
      }
    ]).then(answer => {
      this.appProject = answer.projectName;
      this.description = answer.projectDesc;
      this.author = answer.projectAuthor;
      this.license = answer.projectLicense;
      this.projectVersion = answer.projectVersion;
    });
  };
  configuring() {
    let defaultSettings = this.fs.readJSON(`package.json`);
    let packageSettings = {
      name: this.appProject,
      description: this.description,
      author: this.author,
      license: this.license,
      version: '0.0.1',
      main: 'index.js',
      keywords: [],
      devDependencies: {},
      dependencies: {}
    };
    this.fs.writeJSON(this.destinationPath(this.appProject + '/package.json'), packageSettings);
  }

  writing() {
    const fscopy = (template, paths) => {
      this.fs.copy(
        this.templatePath(`${template}`),
        this.destinationPath(`${paths}${template}`)
      );
    }
    const path = this.appProject + '/src/app/' + this.appProject + '/';
    const singlePath = this.appProject + '/';
    mkdirp(path + 'assets');
    mkdirp(path + 'assets/css/');
    mkdirp(path + 'assets/images/');
    mkdirp(path + 'common');
    mkdirp(path + 'components');
    mkdirp(path + 'containers');
    mkdirp(path + 'locale');
    mkdirp(path + 'stores');
    mkdirp(path + 'config');
    mkdirp(path + 'config/language');
    mkdirp(path + 'test');
    this.fs.copyTpl(
      this.templatePath('containers/RouteIndex.js'),
      this.destinationPath(`${path}containers/${_.upperCase(this.appProject)}Index.js`),
      { title: _.upperCase(this.appProject) + 'Index' }
    );
    fscopy('containers/Home.js', path);
    fscopy('assets/css/main.less', path);
    fscopy('locale/en_US.js', path);
    fscopy('locale/zh_CN.js', path);
    fscopy('test/index.test.js', path);
    fscopy('.eslintrc.json', singlePath);
    fscopy('.editorconfig', singlePath);
    switch(this.projectVersion) {
      case 'release-1.0.0':
        fscopy('common/RouteMap.js', path);
        fscopy('common/Permission.js', path);
        fscopy('common/Icons.js', path);
        break;
      case 'release-1.1.0':
        fscopy('common/RouteMap.js', path);
        fscopy('common/Permission.js', path);
        fscopy('common/Icons.js', path);
        break;
      case 'release-1.2.0':
        fscopy('config/Menu.yml', path);
        fscopy('config/language/en.yml', path);
        fscopy('config/language/zh.yml', path);
        break;
    }
  };
  end() {
    this.log(yosay(
      'Create Module Success'
    ));
  }
};
