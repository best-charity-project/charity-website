const GeoDb = require('wft-geodb-js-client');
// import  GeoDb from 'wft-geodb-js-client';

GeoDb.ApiClient.instance.basePath = 'http://geodb-free-service.wirefreethought.com';

export default {
    GeoDb: GeoDb
};
