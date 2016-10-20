const config= require('./config');
const supportedLanguages= config.supportedLanguages || ['en'];

class I18n {

  constructor(code, language) {

    this.language= language;
    this.code= code;
  }


  getMessage()  {

    this.language = (typeof arguments[0] ==='string')?arguments[0]:this.language ;
    this.language = (typeof arguments[1] ==='string')?arguments[1]:this.language ;

    try {

      const messages = this.getMessages();
      return eval(`messages.${this.code}`);
    } catch (e) {

      return this.code.toUpperCase();
    }


  }

  getMessages() {
      return require(`./i18n/${this.language}.json`);
  }

}

const facade = function(code) {
  const instance = new I18n(code, facade.lang) ;
  return instance.getMessage(arguments[1],arguments[2]);
};

facade.lang = config.language || 'en';


module.exports = facade;
