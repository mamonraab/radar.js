# Feature Map ⚙️🗺

<!-- TOC depthFrom:2 -->

- [Short Term](#short-term)
    - [Collect Mine heartbeats](#collect-mine-heartbeats)
- [Far out](#far-out)

<!-- /TOC -->

## Short Term

### Collect Mine heartbeats

1. websocket endpoint `/api/v1/mine` that Mines can connect to
1. Mines submit "sign on" and heartbeats every ~30s
    * check for mines that "timed out"
    * anonymize as much as possible (do not store IPs or things that are not already exposed via blockchain)
1. expose a second websocket for use on a web UI that publishes statistics data `/api/v1/stats`
    * identify "timed out" mines and publish counts, sign on/off events
1. also crawl `Sonar` for events
    * model count
    * gradients
    * unique "mines"/miners

## Far out

1. 🤔