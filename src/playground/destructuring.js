/////////////////////////
/// destructuring Object
/////////////////////////

const person = {
    age:27,
    name:'Lukas',
    location: {
        city:'Bratislava',
        temp: 15
    }
}
//pomocou vlastnosti v ES6 destructring vieme vytvarat premenne z objektov do jedneho riadku.

/*
destructring
const{city, temp: temperature} = person.location;

klasicky zapis
const city = person.location.city;
const temperature = person.location.temp;
*/

// mozeme tiez zmenit nazov premmenej ak nam nevyhovuje ten povodny nazov z objektu napr.( temp: temperature )
// mozeme tiez zvolit aj defaultnu hodnotu v pripade ze dana vlastnot z objektu neexistuje alebo je undefined napr.( name = "Anonymus" )
// mozeme tiez kombinovat novy nazov s default hodnotu.( name:firstName = "Anonymus" )


const{name:firstName = "Anonymus", age = 'age not found'} = person;
console.log(`${firstName} is ${age}.`)

const{city, temp: temperature} = person.location;
console.log(`It's ${temperature} in ${city}.`)


/////////////////////////
/// destructuring Array
/////////////////////////

// na male vynimky totozne z objektom. AK si chcem vybrat konkretny index(poradie prvku) da sa tom dosiahnut ciarkami.
// je potreba vediet na ktorom indexe sa nachadza konkretna hodnota. Index sa ale neda napisat, len ciarky.
const adress = ['Narcisova 10', 'Bratislava', 'Slovensko','82101']
const [, yourCity='Mestisko', country] = adress;
console.log(`I am from ${yourCity} in ${country}`)




