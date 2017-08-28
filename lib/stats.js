const Web3 = require('web3')

class Statistics {
  constructor (opts) {
    this.mines = []
    this.campaigns = []
    this.timeout = null
  }

  /**
   * Start continuous update process
   * @param {Number} intervalS Delay between updates in seconds
   */
  startInterval (intervalS) {
    if (this.timeout) throw new Error('Interval already started')
  }

  /**
   * Check smart contract statistics
   */
  checkSonarStats () {
  }

  /**
   * Update mines list and remove timed out mines
   */
  checkMineStatus () {

  }

  addMine (mine) {
  }
}

// export an instance so requiring allows to share the instance
module.export = new Statistics()
