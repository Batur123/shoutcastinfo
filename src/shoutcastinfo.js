const axios = require('axios');
var xmljs = require('xml-js');
const xmljsoptions = {ignoreComment: true, alwaysChildren: true, compact: true};
const xmljsoptionswitharray = {ignoreComment: true, alwaysChildren: true, compact: true, trim: true, normalize: true, alwaysArray: true};

// Experimental
// const XHeaders = { timeout: timeout, 'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7) Gecko/20040614 Firefox/0.8'};

/*
 * @param url
 * @param port
 * @param password
 * @param timeout
 * @param sid
 * @param op
 * @returns {PromiseLike<T> | Promise<T>}
 */
function ShoutcastV2(ip,port,password,timeout,sid,op)
{
    var WholeURL = "";
    const SHeaders =  { timeout: timeout };

    switch(op)
    {
        //Experimental
        case 'listeners':
        {
            WholeURL = 'http://'+ip+':'+port+'/admin.cgi?pass='+password+'&sid='+sid+'&mode=viewxml&page=3';
            return axios.get(WholeURL,SHeaders)
                .then(response =>
                {
                    let result = xmljs.xml2js(response.data, xmljsoptionswitharray);

                    return [
                        typeof result.SHOUTCASTSERVER[0].LISTENERS[0].LISTENER == 'undefined' ? "No Listener" : result.SHOUTCASTSERVER[0].LISTENERS[0].LISTENER
                    ];
                })
                .catch(function(error)
                {
                    return error;
                });
        }

        case 'streaminfo':
        {
            WholeURL = 'http://'+ip+':'+port+'/admin.cgi?pass='+password+'&sid='+sid+'&mode=viewxml&page=1';
            return axios.get(WholeURL,SHeaders)
                .then(response =>
                {
                    let result = xmljs.xml2js(response.data, xmljsoptions);
                    return {
                        CurrentListeners : typeof result.SHOUTCASTSERVER.CURRENTLISTENERS._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.CURRENTLISTENERS._text,
                        PeakListeners : typeof result.SHOUTCASTSERVER.PEAKLISTENERS._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.PEAKLISTENERS._text,
                        MaxListeners : typeof result.SHOUTCASTSERVER.MAXLISTENERS._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.MAXLISTENERS._text,
                        UniqueListeners : typeof result.SHOUTCASTSERVER.UNIQUELISTENERS._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.UNIQUELISTENERS._text,
                        AverageTime : typeof result.SHOUTCASTSERVER.AVERAGETIME._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.AVERAGETIME._text,
                        StreamUptime : typeof result.SHOUTCASTSERVER.STREAMUPTIME._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.STREAMUPTIME._text,
                        ServerGenre : typeof result.SHOUTCASTSERVER.SERVERGENRE._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.SERVERGENRE._text,
                        ServerURL : typeof result.SHOUTCASTSERVER.SERVERURL._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.SERVERURL._text,
                        ServerTitle : typeof result.SHOUTCASTSERVER.SERVERTITLE._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.SERVERTITLE._text,
                        SongTitle : typeof result.SHOUTCASTSERVER.SONGTITLE._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.SONGTITLE._text,
                        StreamHits : typeof result.SHOUTCASTSERVER.STREAMHITS._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.STREAMHITS._text,
                        StreamSource : typeof result.SHOUTCASTSERVER.STREAMSOURCE._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.STREAMSOURCE._text,
                        Bitrate : typeof result.SHOUTCASTSERVER.BITRATE._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.BITRATE._text,
                        Content : typeof result.SHOUTCASTSERVER.CONTENT._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.CONTENT._text,
                        Version : typeof result.SHOUTCASTSERVER.VERSION._text == 'undefined' ? "No Info" : result.SHOUTCASTSERVER.VERSION._text,
                    }
                })
                .catch(function(error)
                {
                    return error;
                });
        }

        default:
        {
            throw new Error("Wrong operation.");
        }
    }


}

/*
 * Song Info Main Function
 * @params args
 * @returns {*}
 */
function shoutcastinfo(args)
{
    if(typeof args.ip == 'undefined' || !Boolean(args.ip)) throw new Error('IP is required');
    if(typeof args.port == 'undefined' || !Boolean(args.port)) throw new Error('PORT is required');
    if(typeof args.password == 'undefined' || !Boolean(args.password)) throw new Error('PASSWORD is required');
    if(typeof args.type == 'undefined' || !Boolean(args.type)) throw new Error('Shoutcast type is wrong. Use 1 or 2');
    if(typeof args.timeout == 'undefined' || !Boolean(args.timeout)) args.timeout = 2000;
    if(typeof args.op == 'undefined' || !Boolean(args.op)) throw new Error('Operation is required.');

    console.log(args.ip);
    console.log(args.port);
    console.log(args.password);
    console.log(args.type);
    console.log(args.timeout);
    console.log(args.op);
    switch (args.type)
    {
        case 1:
        {
            //Experimental
            return ShoutcastV1
            (
                args.ip,
                args.port,
                args.password,
                args.timeout,
                args.sid,
                args.op
            );
            break;
        }
        case 2:
        {
            return ShoutcastV2
            (
                args.ip,
                args.port,
                args.password,
                args.timeout,
                args.sid,
                args.op
            );
            break;
        }

        default:
        {
            throw new Error('Shoutcast type is wrong. Use 1 or 2');
        }
    }

}


/**
 * Public method
 * @type {streamTitle}
 */
module.exports = shoutcastinfo;
