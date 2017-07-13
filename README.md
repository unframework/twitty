# TwiTTY

## Development

```
npm install
node_modules/.bin/t2 run index.js
```

## SSH

```
$ node_modules/.bin/t2 wifi
INFO Looking for your Tessel...
INFO Connected to blanky.
INFO Connected to "Butterbrot"
INFO IP Address: 192.168.1.12
INFO Signal Strength: (61/70)
INFO Bitrate: 72mbps

$ ssh -i ~/.tessel/id_rsa root@192.168.1.12
```
