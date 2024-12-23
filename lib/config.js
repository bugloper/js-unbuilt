class Config {
  constructor() {
    this.app_path = null;
    this.asset_path = "app/assets";
    this.public_path = "public";
  }

  configure(callback) {
    callback(this);
  }
}

export const config = new Config();
