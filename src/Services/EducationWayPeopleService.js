import { server } from "../api";
import http from "./httpService";

const regions = [
  { id: "obl1", name: "Брестская область" },
  { id: "obl2", name: "Витебская область" },
  { id: "obl3", name: "Гомельская область" },
  { id: "obl4", name: "Гродненская область" },
  { id: "obl5", name: "Минская область" },
  { id: "obl6", name: "Могилевская область" }
];

const districts = [
  { id: "dis1", foreignId: "obl1", name: "Барановичский район" },
  { id: "dis2", foreignId: "obl1", name: "Березовский район" },
  { id: "dis3", foreignId: "obl1", name: "Брестский район" },
  { id: "dis4", foreignId: "obl1", name: "Дрогичинский район" },
  { id: "dis5", foreignId: "obl1", name: "Ивацевичский район" },
  { id: "dis6", foreignId: "obl1", name: "Каменецкий район" },

  { id: "dis7", foreignId: "obl2", name: "Витебский район" },
  { id: "dis8", foreignId: "obl2", name: "Миорский район" },
  { id: "dis9", foreignId: "obl2", name: "Оршанский район" },
  { id: "dis10", foreignId: "obl2", name: "Чашникский район" },

  { id: "dis11", foreignId: "obl3", name: "Гомельский район" },
  { id: "dis12", foreignId: "obl3", name: "Житковичский район" },
  { id: "dis13", foreignId: "obl3", name: "Речицкий район" },
  { id: "dis14", foreignId: "obl3", name: "Светлогорский район" },

  { id: "dis15", foreignId: "obl4", name: "Волковысский район" },
  { id: "dis16", foreignId: "obl4", name: "Гродненский район" },
  { id: "dis17", foreignId: "obl4", name: "Лидский район" },
  { id: "dis18", foreignId: "obl4", name: "Новогрудский район" },

  { id: "dis19", foreignId: "obl5", name: "Дзержинский район" },
  { id: "dis20", foreignId: "obl5", name: "Логойский район" },
  { id: "dis21", foreignId: "obl5", name: "Минский район" },
  { id: "dis22", foreignId: "obl5", name: "Слуцкий район" },

  { id: "dis23", foreignId: "obl6", name: "Бобруйский район" },
  { id: "dis24", foreignId: "obl6", name: "Могилевский район" },
  { id: "dis25", foreignId: "obl6", name: "Осиповичский район" }
];

const cities = [
  { id: "ct1", foreignId: "dis1", name: "Городище" },
  { id: "ct2", foreignId: "dis1", name: "Барановичи" },

  { id: "ct3", foreignId: "dis2", name: "Береза" },
  { id: "ct4", foreignId: "dis2", name: "Белоозерск" },

  { id: "ct5", foreignId: "dis3", name: "Брест" },

  { id: "ct6", foreignId: "dis4", name: "Дрогичин" },

  { id: "ct7", foreignId: "dis5", name: "Ивацевичи" },
  { id: "ct8", foreignId: "dis5", name: "Коссово" },

  { id: "ct9", foreignId: "dis6", name: "Каменец" },
  { id: "ct10", foreignId: "dis6", name: "Высокое" },

  { id: "ct11", foreignId: "dis7", name: "Витебск" },

  { id: "ct12", foreignId: "dis8", name: "Миоры" },
  { id: "ct13", foreignId: "dis8", name: "Дисна" },

  { id: "ct14", foreignId: "dis9", name: "Орша" },
  { id: "ct15", foreignId: "dis9", name: "Барань" },

  { id: "ct16", foreignId: "dis10", name: "Чашники" },
  { id: "ct17", foreignId: "dis10", name: "Новолукомль" },

  { id: "ct18", foreignId: "dis11", name: "Гомель" },

  { id: "ct19", foreignId: "dis12", name: "Житковичи" },
  { id: "ct20", foreignId: "dis12", name: "Туров" },

  { id: "ct21", foreignId: "dis13", name: "Речица" },
  { id: "ct22", foreignId: "dis13", name: "Василевичи" },

  { id: "ct23", foreignId: "dis14", name: "Светлогорск" },

  { id: "ct24", foreignId: "dis15", name: "Волковыск" },

  { id: "ct25", foreignId: "dis16", name: "Гродно" },
  { id: "ct26", foreignId: "dis16", name: "Скидель" },

  { id: "ct27", foreignId: "dis17", name: "Лида" },
  { id: "ct28", foreignId: "dis17", name: "Березовка" },

  { id: "ct29", foreignId: "dis18", name: "Новогрудок" },

  { id: "ct30", foreignId: "dis19", name: "Дзержинск" },
  { id: "ct31", foreignId: "dis19", name: "Фаниполь" },

  { id: "ct32", foreignId: "dis20", name: "Логойск" },

  { id: "ct33", foreignId: "dis21", name: "Минск" },
  { id: "ct34", foreignId: "dis21", name: "Заславль" },

  { id: "ct35", foreignId: "dis22", name: "Слуцк" },

  { id: "ct36", foreignId: "dis23", name: "Бобруйск" },

  { id: "ct37", foreignId: "dis24", name: "Могилев" },

  { id: "ct38", foreignId: "dis25", name: "Осиповичи" }
];

const microdistricts = [
  { id: "mdis1", foreignId: "ct5", name: "Ковалево" },
  { id: "mdis2", foreignId: "ct5", name: "Речица" },
  { id: "mdis3", foreignId: "ct5", name: "Восток" },
  { id: "mdis4", foreignId: "ct5", name: "Граевка" },
  { id: "mdis5", foreignId: "ct5", name: "Южный городок" },
  { id: "mdis6", foreignId: "ct5", name: "Вулька" },
  { id: "mdis7", foreignId: "ct5", name: "Плоска" },
  { id: "mdis8", foreignId: "ct5", name: "Дубровка" },

  { id: "mdis9", foreignId: "ct33", name: "Уручье" },
  { id: "mdis10", foreignId: "ct33", name: "Троицкое предместье" },
  { id: "mdis11", foreignId: "ct33", name: "Малиновка" },
  { id: "mdis12", foreignId: "ct33", name: "Серебрянка" },
  { id: "mdis13", foreignId: "ct33", name: "Сухарево" },
  { id: "mdis14", foreignId: "ct33", name: "Коморовка" },

  { id: "mdis15", foreignId: "ct11", name: "Восток" },
  { id: "mdis16", foreignId: "ct11", name: "Себяха" },
  { id: "mdis17", foreignId: "ct11", name: "Орехово" },
  { id: "mdis18", foreignId: "ct11", name: "Клины" }
];

const addresses = makeAddressList();

const contactPersons = [
  { name: "Александра" },
  { name: "Виктор" },
  { name: "Мария" },
  { name: "Владислав" },
  { name: "Алексей" },
  { name: "Екатерина" },
  { name: "Ярослав" },
  { name: "Ярослав" },
  { name: "Борис" },
  { name: "Григорий" },
  { name: "Георгий" },
  { name: "Диана" },
  { name: "Дмитрий" },
  { name: "Евгения" },
  { name: "Елена" },
  { name: "Зинаида" },
  { name: "Игорь" },
  { name: "Ирина" },
  { name: "Кристина" },
  { name: "Кирилл" },
  { name: "Людмила" },
  { name: "Лев" },
  { name: "Лев" },
  { name: "Николай" },
  { name: "Наталья" },
  { name: "Олег" },
  { name: "Ольга" },
  { name: "Петр" },
  { name: "Полина" },
  { name: "Рената" },
  { name: "Роман" },
  { name: "Роман" },
  { name: "Сергей" },
  { name: "София" },
  { name: "Татьяна" },
  { name: "Тимофей" },
  { name: "Ульяна" },
  { name: "Федор" },
  { name: "Эдуард" },
  { name: "Михаил" }
];

const diagnoses = [
  { name: "Аутизм" },
  { name: "Cиндром Аспергера" },
  { name: "Умственная отсталость" },
  { name: "Шизофрения" },
  { name: "Слепоглухота" },
  { name: "Трахеостома" },
  { name: "Низкорослость" },
  { name: "Травмы позвоночника" },
  { name: "Склероз" },
  { name: "Иммунодефициты" },
  { name: "Атеросклероз" },
  { name: "болезнь Крона" },
  { name: "Цирроз печени" },
  { name: "Остеогенез" },
  { name: "Лейциноз" },
  { name: "синдром Дауна" },
  { name: "Эпилепсия" },
  { name: "ВИЧ" }
];

const years = [
  { name: 2000 },
  { name: 2001 },
  { name: 2002 },
  { name: 2003 },
  { name: 2004 },
  { name: 2005 },
  { name: 2006 },
  { name: 2007 },
  { name: 2008 },
  { name: 2009 },
  { name: 2010 },
  { name: 2011 },
  { name: 2012 },
  { name: 2013 },
  { name: 2014 },
  { name: 2015 },
  { name: 2016 },
  { name: 2017 },
  { name: 2018 }
];

const defaultContact = "+375(44)123-45-67 charity@godeltech.com";
const defaultStreet = "ул.Советская";

function makeAddressList() {
  return regions.map(region => {
    region.districts = districts.filter(
      district => district.foreignId === region.id
    );
    region.districts.forEach(district => {
      district.cities = cities.filter(city => city.foreignId === district.id);
      cities.forEach(city => {
        city.microdistricts = microdistricts.filter(
          microdistrict => microdistrict.foreignId === city.id
        );
        if (city.microdistricts.length === 0) {
          delete city.microdistricts;
        }
      });
    });

    return region;
  });
}

function getRandomElement(items) {
  return items[Math.floor(Math.random() * items.length)]["name"];
}

function getRandomAddress() {
  const randomRegion = addresses[Math.floor(Math.random() * addresses.length)];
  const randomDistrict =
    randomRegion.districts[
      Math.floor(Math.random() * randomRegion.districts.length)
    ];
  const randomCity =
    randomDistrict.cities[
      Math.floor(Math.random() * randomDistrict.cities.length)
    ];
  let randomMicrodistrict = "";
  if (randomCity.microdistricts) {
    randomMicrodistrict =
      randomCity.microdistricts[
        Math.floor(Math.random() * randomCity.microdistricts.length)
      ].name;
  }

  return {
    region: randomRegion.name,
    district: randomDistrict.name,
    city: randomCity.name,
    microdistrict: randomMicrodistrict,
    street: defaultStreet
  };
}

function getRandomDate(start, end) {
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return randomDate.toISOString().toString();
}

function makeFakePeople(count) {
  const arrayOfPeople = [];

  for (let i = 0; i < count; i++) {
    const person = {};
    person._id = `person${i}`;
    person.contactPerson = getRandomElement(contactPersons);
    person.contacts = defaultContact;
    person.updatedAt = getRandomDate(new Date(2018, 3, 1), new Date());
    person.createdAt = getRandomDate(
      new Date(2018, 0, 1),
      new Date(person.updatedAt)
    );
    person.diagnosis = getRandomElement(diagnoses);
    person.isPublic = true;
    person.years = getRandomElement(years);
    person.name = getRandomElement(contactPersons);
    const randomAddress = getRandomAddress();
    const personWithAddress = { ...person, ...randomAddress };

    arrayOfPeople.push(personWithAddress);
  }

  return arrayOfPeople;
}

function doFakePeople(count = 2) {
  return makeFakePeople(count);
}

export function getPeopleList() {
  return http.get(`${server}/api/edulist`, {
    headers: { "Content-Type": "application/json; charset=UTF-8" }
  });
}

export function getFakePeopleList() {
  const fakePeople = doFakePeople();

  return new Promise((resolve, reject) => {
    resolve({ data: { persons: fakePeople}});
  });
}
