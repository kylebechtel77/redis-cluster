'use strict';
// to use this you must run the cluster in elasticache in CLUSTER MODE

// let RedisClustr = require('redis-clustr');
// let RedisClient = require('redis');
// const redis_client = redis.createClient({
//     host: 'master.test-encrypted.cs2jln.use1.cache.amazonaws.com',
//     auth_pass: 'asdfqweruiopjklasdfjlklqweriuogyanebzasdhjfbae',
//     port: 6379,
    
// });
// let redis = new RedisClustr({
//   servers: [
//       {
//       host: 'master.test-encrypted.cs2jln.use1.cache.amazonaws.com',
//       auth_pass: 'asdfqweruiopjklasdfjlklqweriuogyanebzasdhjfbae',
//       port: 6379,
//     }
//   ],
//   createClient: function (port, host) {
//       // this is the default behaviour
//       return RedisClient.createClient(port, host);
//   }
// });
const Redis = require('ioredis');
const cacheCluster = new Redis.Cluster(
    [
        {
            host: 'master.jwicks-poc-atomic-counter.cs2jln.use1.cache.amazonaws.com',
            port: 6379,
        },
    ],
    {
        enableReadyCheck: false,
        slotsRefreshTimeout: 2000,
        redisOptions: {
            tls: {},
            password: '',
        },
    }
);

const { promisify } = require("util");
const getAsync = promisify(cacheCluster.get).bind(cacheCluster);
const setAsync = promisify(cacheCluster.set).bind(cacheCluster);

module.exports.hello = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('start');

  console.time('set')
  let res = await setAsync("foo", 'test');
  console.timeEnd('set')
  console.log(res);

  console.time('redis')
  let reply = await getAsync("foo");
  console.timeEnd('redis')
  console.log(reply)
};
