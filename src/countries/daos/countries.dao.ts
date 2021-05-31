import {CountryDto} from "../dto/country.dto";
import countries from "../../configs/country";
import { Country } from "../../types";
import shortid from "shortid";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class CountriesDao {
    countries: Array<CountryDto> = [];

    constructor() {
        log('Created new instance of CountriesDao');

        this.addCountries();
    }

    async addCountries()  {

      countries.forEach(async (country: { name: string, code: string }) => {
          const newCountry: CountryDto = {...country, id:shortid.generate(), population:Math.floor(Math.random() * 100000000)};
       // country.id = shortid.generate();
        //country.population = Math.floor(Math.random() * 100000000);
        this.countries.push(newCountry);
      });
    }

    async addCountry(country: CountryDto) {
        country.id = shortid.generate();
        this.countries.push(country);
        return country.id;
    }

    async getCountries(sort?:any) {

        if (sort) {
            const asc = (x: CountryDto, y: CountryDto) => (x.population > y.population) ? 1 : -1;
            const desc = (x: CountryDto, y: CountryDto) => (x.population > y.population) ? -1 : 1;

            const countriesList:CountryDto[] = this.countries.sort((sort === 'asc' ? asc : desc));
            return countriesList;
        } else {
            return this.countries;
        }    
    }

    async getCountryById(countryId: string) {
        return this.countries.find((country: { id: string; }) => country.id === countryId);
    }

    async putCountryById(country: CountryDto) {
        const objIndex = this.countries.findIndex((obj: { id: string; }) => obj.id === country.id);
        this.countries.splice(objIndex, 1, country);
        return `${country.id} updated via put`;
    }

    async patchCountryById(country: CountryDto) {
        const objIndex = this.countries.findIndex((obj: { id: string; }) => obj.id === country.id);
        let currentCountry = this.countries[objIndex];
        const allowedPatchFields = ["code", "name", "population"];
        for (let field of allowedPatchFields) {
            if (field in country) {
                // @ts-ignore
                currentCountry[field] = country[field];
            }
        }
        this.countries.splice(objIndex, 1, currentCountry);
        return `${country.id} patched`;
    }


    async removeCountryById(countryId: string) {
        const objIndex = this.countries.findIndex((obj: { id: string; }) => obj.id === countryId);
        this.countries.splice(objIndex, 1);
        return `${countryId} removed`;
    }

    async getCountryByCode(code: string) {
        const objIndex = this.countries.findIndex((obj: { code: string; }) => obj.code === code);
        let currentCountry = this.countries[objIndex];
        if (currentCountry) {
            return currentCountry;
        } else {
            return null;
        }
    }
}

export default new CountriesDao();