const axios = require("axios");

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = `${process.env.RO_API_KEY2}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


module.exports = {
  getProvince: async (req, res) => {
    try {
      let getData = await axios.get('/province');
      //console.log(getData.data.rajaongkir.results)
      let dataProvince = getData.data.rajaongkir.results;
      res.status(200).send(dataProvince);

    } catch (error) {
      //console.log(error)
      res.status(500).send(error)
    }
  },

  getCity: async (req, res) => {
    try {
      let getData = await axios.get('/city')
      //console.log(getData.data.rajaongkir.results)
      let dataCity = getData.data.rajaongkir.results;
      res.status(200).send(dataCity);
    } catch (error) {
      //console.log(error)
      res.status(500).send(error)
    }
  },

  getDelivery: async (req, res) => {
    try {
      //console.log(req.params)

      if (req.params.courier !== 'none') {
        let get = await axios.post('/cost', {
          origin: req.params.origin,
          destination: req.params.destination,
          weight: req.params.weight,
          courier: req.params.courier
        })
        //console.log(get.data.rajaongkir.results[0]);
        res.status(200).send(get.data.rajaongkir.results[0].costs);
      }

    } catch (error) {
      console.log(error)
    }
  },
}