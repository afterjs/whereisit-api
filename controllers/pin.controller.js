const configFirebase = require('../firebase');
const geolib = require('geolib');


let createObject = (uid, data) => {

  const result = {
    ...uid,
    ...data,
  };

  return result
}


let convertTo = (val) => {
  return geolib.toDecimal(val) 
}

let distanceRange = (paramLat, paramLong, jsonLat, jsonLong) => {
  
var distance = geolib.getDistance(
  { latitude: convertTo(paramLat), longitude: convertTo(paramLong) },
  { latitude: convertTo(jsonLat), longitude: convertTo(jsonLong) }
); 
 
return distance/1000
}



let getAll = async (req, res) => {
  try {
    const userQuerySnapshot = await configFirebase.db.collection('pinsData').get();
    const pins = [];
    userQuerySnapshot.forEach(
      (doc) => {

        const uidObj = {
          "uid": doc.id
        }

        const result = createObject(uidObj, doc.data())

        pins.push(result);
      }
    );
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).send(error);
  }
}

let getById = async (req, res) => {
  const uid = req.params.uid;
  try {
    const pin = await configFirebase.db.collection('pinsData').doc(uid).get()

    const uidObj = {
      "uid": pin.id
    }

    const result = createObject(uidObj, pin.data())

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

let getByType = async (req, res) => {
  const type = req.params.type

  try {

    const pins = [];
    const citiesRef = configFirebase.db.collection('pinsData');
    const snapshot = await citiesRef.where('type', '==', type).get();

    snapshot.forEach(doc => {

      const uidObj = {
        "uid": doc.id
      }
      const result = createObject(uidObj, doc.data())
      pins.push(result)
    })

    res.status(200).json(pins);
  } catch (error) {
    res.status(500).send(error);
  }

}


let getByGeo = async (req, res) => {
  console.log("get by geo")
  const lat = req.params.lat
  const long = req.params.long
  const range = req.params.range


  try {
    const userQuerySnapshot = await configFirebase.db.collection('pinsData').get();
    const pins = [];
    userQuerySnapshot.forEach(
      (doc) => {

      
      if(distanceRange(parseFloat(lat), parseFloat(long), parseFloat(doc.data().loc.latitude), parseFloat((doc.data().loc.longitude))) < range) {
     
        const uidObj = {
          "uid": doc.id
        }
        const result = createObject(uidObj, doc.data())

        pins.push(result)
      }

      }
    );
    res.status(200).json(pins);
  } catch (error) {
   console.log(error)
  }



}

module.exports = {
  getAll,
  getById,
  getByType,
  getByGeo
};