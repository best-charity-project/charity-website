import GeoDb from '../../../Configs/geoConfig';

const geoApi = new GeoDb.GeoApi();

export function getRegions() {
  console.log(12312);
  geoApi.getRegionsUsingGET('BY', {
    // 'namePrefix': this.currentRequest.namePrefix,
    'languageCode': 'ru',
    'limit': 5,
    'offset': 0,
    'hateoasMode': false
  })
  .then( data => {
    console.log('QWEQWEWEQWE');
    console.log(data);
  }, function(error){
    console.error(error);
  })
}