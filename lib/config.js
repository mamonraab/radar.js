module.exports = {
  port: 8080,
  debug: process.env.DEBUG,
  statsUpdateIntervalS: 1, // how often to check mine/sonar stats [seconds]
  mineTimeout: 10 // maximum time a mine remains 'active' w/o heartbeats [seconds]
}
