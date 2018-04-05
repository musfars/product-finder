class DevelopmentConfig {
  constructor() {
    this.environment = process.env.NODE_ENV;
    this.baseUrl = 'https://productfinderapi.qburst.build';
  }
}

module.exports = {
  clazz: DevelopmentConfig,
  instance: new DevelopmentConfig()
};  