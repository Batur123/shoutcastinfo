# shoutcastinfo

Shoutcast Info and Listeners for NodeJS

## Table of Contents

  - [How to Add Library](#example)
  - [Parameters](#parameters)
  - [Usage](#usage)
  - [Result From Function](#result)
  - [Roadmap](#roadmap)
  - [Installing](#installing)
  - [License](#license)

## Example

```js
const shoutcastInfo = require('shoutcastinfo');
```

## Parameters

```js
  // `ip` is the server IP
  ip: '127.0.0.1',

  // `port` is the server PORT
  port: '1234',
  
  // `password` is the admin password for shoutcast
  password: '123456789',
  
  // `timeout` Timeout for server response, if no response within that time. Request throws error. (Milliseconds)
  port: 2000,
  
  // `type` is the shoutcast version
  type: 1, // Shoutcast v1,
  type: 2, // Shoutcast v2,v2.5,
  
  // `sid` SID
  sid: 1,
  
  // `op` is the operation for request
  op: 'streaminfo', // Returns the stream info
  op: 'listeners', // Returns the listeners by IP and their listen time

```

## Usage

```js

const shoutcastInfo = require('shoutcastinfo.js');

shoutcastInfo({
	ip: '192.168.1.1',
	port: '1234',
	password: '123456789',
	timeout: 2000,
	type: 2,
	sid: 1,
	op: 'streaminfo',
}).then(function (result)
{
	console.log(result);
}).catch(function (err)
{
	console.log(err);
});
      
      

```
## Result

```js
{
  CurrentListeners: '0',
  PeakListeners: '0',
  MaxListeners: '0',
  UniqueListeners: '0',
  AverageTime: '0',
  ServerGenre: 'West',
  ServerURL: 'Test.Com',
  ServerTitle: 'TestFM',
  SongTitle: 'Country Roads',
  StreamHits: '0',
  StreamSource: '127.0.0.1',
  Bitrate: '128',
  Content: 'audio/mpeg',
  Version: '2.5.5.733 (posix(linux x64))'
}
```

## Roadmap

- Shoutcast v1 support
- Current Listeners by IP support

## Installing

Using npm:

```bash
$ npm install shoutcastinfo
```

## License

[MIT](LICENSE)
