const axios = require('axios');
const xmljs = require('xml-js');

const shoutcastV2 = async (ip, port, password, timeout, sid, op) => {
  const getUrl = (page) => `http://${ip}:${port}/admin.cgi?pass=${password}&sid=${sid}&mode=viewxml&page=${page}`;

  switch (op) {
    case 'listeners': {
      try {
        const response = await axios.get(getUrl(3), { timeout });
        const result = xmljs.xml2js(response.data, {
          ignoreComment: true,
          alwaysChildren: true,
          compact: true,
          trim: true,
          normalize: true,
          alwaysArray: true
        });

        return [
          result?.SHOUTCASTSERVER?.[0]?.LISTENERS?.[0]?.LISTENER ??
            'No Listener'
        ];
      } catch (error) {
        return error;
      }
    }

    case 'streaminfo': {
      try {
        const response = await axios.get(getUrl(1), { timeout });
        const result = xmljs.xml2js(response.data, {
          ignoreComment: true,
          alwaysChildren: true,
          compact: true
        });

        return {
          currentListeners:
            result?.SHOUTCASTSERVER?.CURRENTLISTENERS?._text ?? 'No Info',
          peakListeners: result?.SHOUTCASTSERVER?.PEAKLISTENERS?._text ?? 'No Info',
          maxListeners: result?.SHOUTCASTSERVER?.MAXLISTENERS?._text ?? 'No Info',
          uniqueListeners:
            result?.SHOUTCASTSERVER?.UNIQUELISTENERS?._text ?? 'No Info',
          averageTime: result?.SHOUTCASTSERVER?.AVERAGETIME?._text ?? 'No Info',
          streamUptime: result?.SHOUTCASTSERVER?.STREAMUPTIME?._text ?? 'No Info',
          serverGenre: result?.SHOUTCASTSERVER?.SERVERGENRE?._text ?? 'No Info',
          serverURL: result?.SHOUTCASTSERVER?.SERVERURL?._text ?? 'No Info',
          serverTitle: result?.SHOUTCASTSERVER?.SERVERTITLE?._text ?? 'No Info',
          songTitle: result?.SHOUTCASTSERVER?.SONGTITLE?._text ?? 'No Info',
          streamHits: result?.SHOUTCASTSERVER?.STREAMHITS?._text ?? 'No Info',
          streamSource:
            result?.SHOUTCASTSERVER?.STREAMSOURCE?._text ?? 'No Info',
          bitrate: result?.SHOUTCASTSERVER?.BITRATE?._text ?? 'No Info',
          content: result?.SHOUTCASTSERVER?.CONTENT?._text ?? 'No Info',
          version: result?.SHOUTCASTSERVER?.VERSION?._text ?? 'No Info'
        };
      } catch (error) {
        return error;
      }
    }

    default: {
      throw new Error('Wrong operation.');
    }
  }
};

const shoutcastV1 = async (ip, port, password, timeout, sid, op) => {
  const getUrl = (page) =>
    `http://${ip}:${port}/admin.cgi?pass=${password}&sid=${sid}&mode=viewxml&page=${page}`;

  const headers = {
    timeout,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7) Gecko/20040614 Firefox/0.8',
    },
  };

  switch (op) {
    case 'listeners': {
      try {
        const response = await axios.get(getUrl(3), headers);
        const result = xmljs.xml2js(response.data, {
          ignoreComment: true,
          alwaysChildren: true,
          compact: true,
          trim: true,
          normalize: true,
          alwaysArray: true,
        });

        return [
          result?.SHOUTCASTSERVER?.[0]?.LISTENERS?.[0]?.LISTENER ??
            'No Listener',
        ];
      } catch (error) {
        return error;
      }
    }

    case 'streaminfo': {
      try {
        const response = await axios.get(getUrl(1), headers);
        const result = xmljs.xml2js(response.data, {
          ignoreComment: true,
          alwaysChildren: true,
          compact: true,
        });

        return {
          currentListeners:
            result?.SHOUTCASTSERVER?.CURRENTLISTENERS?._text ?? 'No Info',
          peakListeners: result?.SHOUTCASTSERVER?.PEAKLISTENERS?._text ?? 'No Info',
          maxListeners: result?.SHOUTCASTSERVER?.MAXLISTENERS?._text ?? 'No Info',
          uniqueListeners: result?.SHOUTCASTSERVER?.PEAKLISTENERS?._text ?? 'No Info',
          averageTime: result?.SHOUTCASTSERVER?.AVERAGETIME?._text ?? 'No Info',
          streamUptime: result?.SHOUTCASTSERVER?.AVERAGETIME?._text ?? 'No Info',
          serverGenre: result?.SHOUTCASTSERVER?.SERVERGENRE?._text ?? 'No Info',
          serverURL: result?.SHOUTCASTSERVER?.SERVERURL?._text ?? 'No Info',
          serverTitle: result?.SHOUTCASTSERVER?.SERVERTITLE?._text ?? 'No Info',
          songTitle: result?.SHOUTCASTSERVER?.SONGTITLE?._text ?? 'No Info',
          streamHits: result?.SHOUTCASTSERVER?.STREAMHITS?._text ?? 'No Info',
          streamSource: "Shoutcast v1 doesn't support StreamSource IP Address.",
          bitrate: result?.SHOUTCASTSERVER?.BITRATE?._text ?? 'No Info',
          content: result?.SHOUTCASTSERVER?.CONTENT?._text ?? 'No Info',
          version: result?.SHOUTCASTSERVER?.VERSION?._text ?? 'No Info',
        };
      } catch (error) {
        return error;
      }
    }

    default: {
      throw new Error('Wrong operation.');
    }
  }
};

const shoutcast = (args) => {
  const {
    ip,
    port,
    password,
    type,
    timeout = 2000,
    op
  } = args;

  if (!ip) throw new Error('IP is required');
  if (!port) throw new Error('PORT is required');
  if (!password) throw new Error('PASSWORD is required');
  if (typeof type !== 'number' || ![1, 2].includes(type)) throw new Error('Shoutcast type is wrong. Use 1 or 2');
  if (!op) throw new Error('Operation is required.');

  return (type === 1) ? shoutcastV1(ip, port, password, timeout, args.sid, op) : shoutcastV2(ip, port, password, timeout, args.sid, op);
};

module.exports = shoutcast;
