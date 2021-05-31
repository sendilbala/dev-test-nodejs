import CountriesDao from '../daos/countries.dao';
import {CRUD} from "../../common/interfaces/crud.interface";
import {CountryDto} from "../dto/country.dto";

class CountriesService implements CRUD {

    async create(resource: CountryDto) {
        return CountriesDao.addCountry(resource);
    }

    async deleteById(resourceId: string) {
        return CountriesDao.removeCountryById(resourceId);
    };

    async list(limit: number, page: number, sort?:any) {
        return CountriesDao.getCountries(sort);
    };

    async patchById(resource: CountryDto) {
        return CountriesDao.patchCountryById(resource)
    };

    async readById(resourceId: string) {
        return CountriesDao.getCountryById(resourceId);
    };

    async updateById(resource: CountryDto) {
        return CountriesDao.putCountryById(resource);
    };

    async getCountryByCode(code: string) {
        return CountriesDao.getCountryByCode(code);
    }
}

export default new CountriesService();