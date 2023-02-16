//import { useEffect } from "react";
import soapRequest from "./helper/soapRequest";

function App() {
    const url = "https://localhost:44343/DemoSoap.asmx";
    const sampleHeaders = {
        "Content-Type": "text/xml; charset=utf-8"
    };
    const xml = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <login xmlns="http://tempuri.org/">
                        <email>angella.freeman@email.com</email>
                        <password>string</password>
                        </login>
                    </soap:Body>
                    </soap:Envelope>`;

    async function makeRequest() {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 });
        const { headers, body, statusCode } = response;
        console.log(headers);
        console.log(body);
        console.log(statusCode);
        document.body.innerHTML = body;
    };

    const callSOAP = () => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "https://webapi.allegro.pl/service.php", true);
        var sr =
            '<?xml version="1.0" encoding="utf-8"?>' +
            "<SOAP-ENV:Envelope " +
            'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' +
            'xmlns:main="https://webapi.allegro.pl/service.php" ' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
            "<SOAP-ENV:Body>" +
            "<main:DoGetCountriesRequest>" +
            "<main:countryCode>1</main:countryCode>" +
            "<main:webapiKey>xxxxxxxx</main:webapiKey>" +
            "</main:DoGetCountriesRequest>" +
            "</SOAP-ENV:Body>" +
            "</SOAP-ENV:Envelope>";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.response);
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
    };

    const callSOAPlocal = () => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "https://localhost:44343/DemoSoap.asmx", true);
        var sr =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<soap:Body>' +
                '<login xmlns="http://tempuri.org/">' +
                  '<email>angella.freeman@email.com</email>' +
                  '<password>string</password>' +
                '</login>' +
              '</soap:Body>' +
            '</soap:Envelope>';

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.response);
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        xmlhttp.send(sr);
    };

    return (
        <div className="App">
            <button onClick={makeRequest}>makeRequest</button>
            <button onClick={callSOAP}>ex</button>
            <button onClick={callSOAPlocal}>example local</button>
        </div>
    );
}

export default App;
