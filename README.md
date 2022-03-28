# shoutcastinfo (2021)

Shoutcast Info and Listeners for NodeJS

## Table of Contents

  - [Installing](#installing)
  - [How to Add Library](#example)
  - [Parameters](#parameters)
  - [Usage](#usage1)
  - [Usage 2](#usage2)
  - [Roadmap](#roadmap)
  - [License](#license)


## Installing

Using npm:

```bash
$ npm install shoutcastinfo
```

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

## Usage1

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
	
	/*
	  Examples
	  console.log(result.SongTitle);
	  console.log(result.Bitrate);
	*/
	
}).catch(function (err)
{
	console.log(err);
});
      

/*
Results for Stream Info
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
*/
```

## Usage2

```js

shoutcastInfo({
	ip: '192.168.1.1',
	port: '1234',
	password: '123456789',
	timeout: 2000,
	type: 2,
	sid: 1,
	op: 'listeners',
}).then(function (result)
{
	console.log(result);
	
	/*
	  Examples
	  console.log(result[0].HOSTNAME[0]._text[0]);
	*/
}).catch(function (err)
{
	console.log(err);
});
     
			
/*
Results for Listeners Info as Array

[
  [
    {
      HOSTNAME: [ { _text: [ '127.0.0.1' ] } ],
      USERAGENT: [
        {
          _text: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64)6'
          ]
        }
      ],
      CONNECTTIME: [ { _text: [ '1138' ] } ],
      UID: [ { _text: [ '41' ] } ],
      TYPE: [ { _text: [ '33556480' ] } ],
      REFERER: [ { _text: [ 'http://ip:port:etc/index.html?sid=1' ] } ],
      XFF: [ {} ],
      GRID: [ { _text: [ '41' ] } ],
      TRIGGERS: [ { _text: [ '0' ] } ]
    },
    {
      HOSTNAME: [ { _text: [ '33.44.55.192' ] } ],
      USERAGENT: [
        {
          _text: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          ]
        }
      ],
      CONNECTTIME: [ { _text: [ '3' ] } ],
      UID: [ { _text: [ '42' ] } ],
      TYPE: [ { _text: [ '33556480' ] } ],
      REFERER: [
        {
          _text: [
            'http://ip:port:etc8/admin.cgi?sid=1&page=1'
          ]
        }
      ],
      XFF: [ {} ],
      GRID: [ { _text: [ '42' ] } ],
      TRIGGERS: [ { _text: [ '0' ] } ]
    }
  ]
]
*/
```

## Roadmap

- Better Error Handling

## License

[MIT](LICENSE)
