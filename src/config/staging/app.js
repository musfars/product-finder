'use strict';

const DevelopmentConfig = require('../development/app').clazz;

class StagingConfig extends DevelopmentConfig {
  constructor() {
    super();
    this.baseUrl = 'http://10.4.6.200:6010';
  }
}

module.exports = {
  clazz: StagingConfig,
  instance: new StagingConfig()
};
