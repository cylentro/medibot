const hospital = require("./lib/data/hospital");
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const baseUrl = 'http://www.siloamhospitals.com/our-hospitals';
const scheduleUrl = 'http://www.pjnhk.go.id/index.php?option=com_chronoforms&tmpl=component&chronoform=jadwaldokterapp-Copy&event=Ganti&dokter=';

let urls = new Set;

fetch(baseUrl)
    .then(res => res.text())
    .then(body => {
        let $ = cheerio.load(body);
        let hospitalList = $('.syptom-list>.item-grid').children().find($('a'));
        hospitalList.each((i, elem) => {
            urls.add($(elem).attr('href').trim());
        });

        urls.forEach((url) => {
            fetchHospitalInformation(url);
        });
    });

let fetchHospitalInformation = (hospitalUrl) => {
    fetch(hospitalUrl)
        .then(res => res.text())
        .then(body => {
            let $ = cheerio.load(body);

            let name = $('#content h1').text().trim();

            let contactUs = $('#content .container').last().find($('.sub-title')).last().next();
            let address = contactUs.find($('.titik-dua')).text().trim();

            contactUs = contactUs.next();
            let phone = contactUs.find($('.titik-dua')).text().trim();

            contactUs = contactUs.next();
            let hotline = contactUs.find($('.titik-dua')).text().trim();

            contactUs = contactUs.next();
            let email = contactUs.find($('.titik-dua')).text().trim();

            let info = new hospital();
            info.Address = address;
            info.Name = name;
            info.Phone = [phone];
            info.Hotline = hotline;
            info.Email = [email];
            info.Institution = "Siloam";
            info.Website = hospitalUrl;
            info.Country = "Indonesia";
            info.RegistrationUrl = "http://www.siloamhospitals.com/make-an-appointment.html";

            console.log(info);
        });
};