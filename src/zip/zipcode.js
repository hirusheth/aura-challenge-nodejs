module.exports = {
  search
};
async function search(body) {
  let requestBody = JSON.parse(body);

  let rawdata = require("./../data.json");
  var andQueryParams = {};
  var orQueryParams = {};
  if (requestBody.zip) {
    andQueryParams.zip = requestBody.zip;
  }
  if (requestBody.city) {
    andQueryParams.primary_city = requestBody.city;
  }

  var result = rawdata.filter(andQuery, andQueryParams);

  if (requestBody.search) {
    orQueryParams.type = orQueryParams.state = orQueryParams.county = orQueryParams.area_codes = orQueryParams.country =
      requestBody.search;
    result = result.filter(orQuery, orQueryParams);
  }

  if (requestBody.latitude && requestBody.longitude) {
    result.map(each => {
      return (each.distanceInMiles = distance(
        requestBody.latitude,
        requestBody.longitude,
        each.latitude,
        each.longitude
      ));
    });
    result.sort(function(a, b) {
      return a.distanceInMiles - b.distanceInMiles;
    });
  }
  return result;
}

function andQuery(each) {
  return Object.keys(this).every(key => {
    return (
      each[key] &&
      (each[key].toLowerCase() === this[key].toLowerCase() ||
        each[key].toLowerCase().includes(this[key].toLowerCase()))
    );
  });
}

function orQuery(each) {
  return Object.keys(this).some(key => {
    return (
      each[key] &&
      (each[key].toLowerCase() === this[key].toLowerCase() ||
        each[key].toLowerCase().includes(this[key].toLowerCase()))
    );
  });
}

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}
