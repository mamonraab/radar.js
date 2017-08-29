// const Web3 = require('web3')

class Statistics {
  constructor () {
    this.mines = new Map()
    this.campaigns = []
    this.timeout = null
  }

  /**
   * Start continuous update process
   */
  startInterval () {
    if (this.timeout) return log.error('Timer already started')
    this.timeout = setTimeout(this._update.bind(this), config.statsUpdateIntervalS * 1000)
  }

  /**
   * Stop update process
   */
  stopInterval () {
    if (this.timeout) {
      clearTimeout(this.timeout)
      delete this.timeout
    }
  }

  _update () {
    if (this.timeout && !this.timeout._called) return log.error('Timer already started')
    log.debug('Updating statistics..')
    return new Promise((resolve, reject) => {
      this.updateSonarStats()
      this.checkMineStatus()
      resolve()
    })
    .then(() => {
      this.timeout = setTimeout(this._update.bind(this), config.statsUpdateIntervalS * 1000)
    })
  }
  /**
   * Check smart contract statistics
   */
  updateSonarStats () {

  }

  /**
   * Update mines list and remove timed out mines
   */
  checkMineStatus () {
    log.debug(`checking ${this.mines.size} mines for active heartbeats`)
    this.mines.forEach((mine, key) => {
      const notSeenForS = (new Date() - mine.lastSeen) / 1000
      console.log(notSeenForS, config.mineTimeout, 'wee')
      if (notSeenForS > config.mineTimeout) {
        log.info(`removing mine ${key}; not seen for ${notSeenForS}s`)
        this.mines.delete(key)
      }
    })
  }

  mineSpotted (id, ws) {
    if (this.mines.has(id)) {
      this.mines.get(id).lastSeen = new Date()
    } else {
      this.mines.set(id, {ws, lastSeen: new Date(), id})
    }
  }
}

// export an instance so requiring allows to share the instance
module.exports = new Statistics()
