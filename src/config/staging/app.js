'use strict';

const DevelopmentConfig = require('../development/app').clazz;

class StagingConfig extends DevelopmentConfig {
  constructor() {
    super();
    this.baseUrl = 'http://productfinder.qburst.build:7001';
  }
}

module.exports = {
  clazz: StagingConfig,
  instance: new StagingConfig()
};
