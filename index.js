const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');


const app = express()
const url = "https://deportelauquen.com.ar/termino-el-torneo-u17-de-formativas-campeon-deportivo-argentino-de-pehuajo-goleadores-del-clausura-de-primera-division/"

app.use(express.static(__dirname));
app.set('view engine', 'ejs'); // serve static files from the current directory

axios.get(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const tableRows = $("table tr");

    const data = [];
    
    // Loop over the rows, skipping the first two header rows
    for (let i = 2; i < tableRows.length; i++) {
      const row = tableRows.eq(i);
      const columns = row.find("td");
    
      const item = {
        jugador: columns.eq(0).text(),
        equipo: columns.eq(1).text(),
        F1: columns.eq(2).text(),
        F2: columns.eq(3).text(),
        F3: columns.eq(4).text(),
        F4: columns.eq(5).text(),
        F5: columns.eq(6).text(),
        F6: columns.eq(7).text(),
        total: columns.eq(8).text(),
        promFR: columns.eq(9).text(),
        S1: columns.eq(10).text(),
        S2: columns.eq(11).text(),
        totalS: columns.eq(12).text(),
        promS: columns.eq(13).text(),
        FI1: columns.eq(14).text(),
        FI2: columns.eq(15).text(),
        FI3: columns.eq(16).text(),
        totalFI: columns.eq(17).text(),
        promFI: columns.eq(18).text(),
        totalGral: columns.eq(19).text(),
        promGral: columns.eq(20).text(),
      };
    
      data.push(item);
    }
    
    const filteredData = data.filter(item => item.equipo.includes("DEPO CAS"));

    app.get('/', (req, res) => {
        res.render('index', { data: filteredData }); // send the index.ejs file as the response
    });

    app.get('/todos', (req, res) => {
      res.render('index', { data: data }); // send the index.ejs file as the response
  });

})
  .catch(error => console.log(error));


  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})
