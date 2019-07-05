let Parser = require('rss-parser')
let parser = new Parser()
let fs = require('fs');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const levelMap = {
  'Noudata tavanomaista varovaisuutta': 1,
  'Noudatettava tavanomaista varovaisuutta': 1,
  'Noudata erityistä varovaisuutta': 2,
  'Noudatettava erityistä varovaisuutta': 2,
  'Vältä tarpeetonta matkustamista': 3,
  'Vältä kaikkea matkustamista': 4,
  'Poistuttava maasta välittömästi': 5,
  'Poistu maasta välittömästi': 5,
};

const levelTranslations = {
  1: 'Follow the usual caution',
  2: 'Take special care',
  3: 'Avoid unnecessary traveling',
  4: 'Avoid All Travel',
  5: 'Leave the country immediately',
};

const levels = {
  1: 'Noudata tavanomaista varovaisuutta',
  2: 'Noudata erityistä varovaisuutta',
  3: 'Vältä tarpeetonta matkustamista',
  4: 'Vältä kaikkea matkustamista',
  5: 'Poistu maasta välittömästi',
};

const countryMap = {
  'Bosnia ja Hertsegovina': 'Bosnia and Herzegovina',
  'Albania': 'Albania',
  'Kreikka': 'Greece',
  'Ruotsi': 'Sweden',
  'Malediivit': 'Maldives',
  'Slovakia': 'Slovakia',
  'Sveitsi': 'Switzerland',
  'Venezuela': 'Venezuela',
  'Libya': 'Libya',
  'Serbia': 'Serbia',
  'Puola': 'Poland',
  'Tunisia': 'Tunisia',
  'Myanmar': 'Myanmar',
  'Tansania': 'Tanzania',
  'Hongkong': 'Hong Kong',
  'Pakistan': 'Pakistan',
  'Viro': 'Estonia',
  'Bangladesh': 'Bangladesh',
  'Kambodža': 'Cambodia',
  'Irak': 'Iraq',
  'Andorra': "Andorra",
  'Indonesia': 'Indonesia',
  'Etelä-Sudan': 'South Sudan',
  'Unkari': 'Hungary',
  'Nepal': 'Nepal',
  'Slovenia': 'Slovenia',
  'Ranska': 'France',
  'Kap Verde': 'Cape Verde',
  'Malta': 'Malta',
  'Luxemburg': 'Luxembourg',
  'Papua-Uusi-Guinea': 'Papua New Guinea',
  'Montenegro': "Montenegro",
  'Pohjois-Korea': 'North Korea',
  'Georgia': 'Georgia',
  'Etiopia': 'Ethiopia',
  'Paraguay': 'Paraguay',
  'Trinidad ja Tobago': 'Trinidad and Tobago',
  'Bahama': "The Bahamas",
  'Tanska': 'Denmark',
  'Arabiemiirikunnat': 'United Arab Emirates',
  'Eritrea': 'Eritrea',
  'Intia': 'India',
  'Madagaskar': 'Madagascar',
  'Mosambik': 'Mozambique',
  'Kypros': 'Cyprus',
  'Turkmenistan': 'Turkmenistan',
  'Moldova': "Moldova",
  'Liettua': 'Lithuania',
  'Kroatia': 'Croatia',
  'Bulgaria': 'Bulgaria',
  'El Salvador': 'El Salvador',
  'Sri Lanka': 'Sri Lanka',
  'Bolivia': 'Bolivia',
  'Kuwait': 'Kuwait',
  'Iso-Britannia': 'Great Britain',
  'Valko-Venäjä': 'Belarus',
  'Costa Rica': 'Costa Rica',
  'Jordania': 'Jordan',
  'Kosovo': 'Kosovo',
  'Honduras': 'Honduras',
  'Portugali': 'Portugal',
  'Norja': 'Norway',
  'Latvia': 'Latvia',
  'Azerbaidžan': 'Azerbaijan',
  'Armenia': 'Armenia',
  'Irlanti': 'Ireland',
  'Uzbekistan': 'Uzbekistan',
  'Algeria': 'Algeria',
  'Zimbabwe': 'Zimbabwe',
  'Yhdysvallat': 'United States',
  'Angola': 'Angola',
  'Filippiinit': 'Philippines',
  'Macao': 'Macau',
  'Marokko': 'Morocco',
  'Peru': 'Peru',
  'Mauritius': "Mauritius",
  'Lesotho': "Lesotho",
  'Saudi-Arabia': 'Saudi Arabia',
  'Uganda': 'Uganda',
  'Kiina': 'China',
  'Burundi': 'Burundi',
  'Sambia': 'Zambia',
  'Syyria': 'Syria',
  'Venäjä': 'Russia',
  'Japani': 'Japan',
  'Namibia': 'Namibia',
  'Israel': 'Israel',
  'Romania': 'Romania',
  'Guatemala': 'Guatemala',
  'Belgia': 'Belgium',
  'Ukraina': 'Ukraine',
  'Nigeria': 'Nigeria',
  'Tšekki (Tshekin tasavalta)': 'Czech Republic',
  'Islanti': 'Iceland',
  'Seychellit': "Seychelles",
  'Swazimaa': 'Swaziland',
  'Malawi': 'Malawi',
  'Thaimaa': 'Thailand',
  'Malesia': 'Malaysia',
  'Brunei': 'Brunei',
  'Belize': 'Belize',
  'Monaco': 'Monaco',
  'Oman': 'Oman',
  'Jemen': 'Yemen',
  'Ruanda': 'Rwanda',
  'Australia': 'Australia',
  'Laos': 'Laos',
  'Argentiina': 'Argentina',
  'Iran': 'Iran',
  'Barbados': 'Barbados',
  'Kuuba': 'Cuba',
  'Haiti': 'Haiti',
  'Bahrain': 'Bahrain',
  'Qatar': 'Qatar',
  'Panama': 'Panama',
  'Kolumbia': 'Colombia',
  'Somalia': 'Somalia',
  'Taiwan': 'Taiwan',
  'Nicaragua': 'Nicaragua',
  'Palestiinalaisalue': 'Occupied Palestinian Territory',
  'Itä-Timor': 'East Timor',
  'Saksa': 'Germany',
  'Kirgisia': 'Kyrgyzstan',
  'Tadzhikistan': "Tajikistan",
  'Kenia': 'Kenya',
  'Djibouti': 'Djibouti',
  'Espanja': 'Spain',
  'Turkki': 'Turkey',
  'Brasilia': 'Brazil',
  'Vietnam': 'Vietnam',
  'Meksiko': 'Mexico',
  'Bhutan': 'Bhutan',
  'Etelä-Afrikka': 'South Africa',
  'Botswana': 'Botswana',
  'Chile': 'Chile',
  'Ecuador': 'Ecuador',
  'Sudan': 'Sudan',
  'Afganistan': 'Afghanistan',
  'Singapore': 'Singapore',
  'Kazakstan': "Kazakhstan",
  'Libanon': 'Lebanon',
  'Liechtenstein': 'Liechtenstein',
  'Mongolia': 'Mongolia',
  'Italia': 'Italy',
  'Kongon demokraattinen tasavalta': 'Democratic Republic of Congo',
  'Pohjois-Makedonia': 'Northern Macedonia',
  'Fidži': 'Fiji',
  'Uusi-Seelanti': 'New Zealand',
  'Itävalta': 'Austria',
  'Alankomaat': 'Netherlands',
  'Etelä-Korea': 'South Korea',
  'Kanada': 'Canada',
  'Uruguay': 'Uruguay',
  'Egypti': 'Egypt',
  'Dominikaaninen tasavalta': 'Dominican Republic',
  'Jamaika': 'Jamaica'
};

  (async () => {

    let feed = await parser.parseURL('https://um.fi/o/rss?dctype=matkustustiedotteet&lang=fi');

    var allData = []
    var simpleData = { 'en': [['Country', 'Security']], 'fi': [['Valtio', 'Turvallisuus']] }
    var parsedCountries = new Set()
    var parsedLevels = new Set()

    feed.items.forEach(item => {
      let levelName = new JSDOM(item['content:encoded']).window.document.getElementById('safetyLevelMainLevel').getElementsByTagName('p')[0].textContent

      let level = levelMap[levelName]

      let countryData = {
        'country:fi': item.title.substring(0, item.title.lastIndexOf(':')),
        'country:en': countryMap[item.title.substring(0, item.title.lastIndexOf(':'))],
        'link': item.link,
        'security:code': levelName,
        'security:fi': levelName,
        'security:en': levelTranslations[level],
        'country:code': item.guid.split('/').pop(),
      }

      parsedCountries.add(countryData['country'])
      parsedLevels.add(countryData['security'])

      allData.push(countryData)
      simpleData['en'].push([{'v': countryData['country:code'], 'f': countryData['country:en']}, {'v': level, 'f': countryData['security:en']}])
      simpleData['fi'].push([{'v': countryData['country:code'], 'f': countryData['country:fi']}, {'v': level, 'f': countryData['security:fi']}])
    });

    fs.writeFile('full-safety.json', JSON.stringify(allData, null, 2), 'utf8', function (error) {
      if (error) {
        throw error
      }
    });

    fs.writeFile('safety-fi.json', JSON.stringify(simpleData['fi'], null, 2), 'utf8', function (error) {
      if (error) {
        throw error
      }
    });
    fs.writeFile('safety-en.json', JSON.stringify(simpleData['en'], null, 2), 'utf8', function (error) {
      if (error) {
        throw error
      }
    });

  })();
