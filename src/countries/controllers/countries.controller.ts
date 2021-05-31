import express from 'express';
import countriesService from '../services/countries.service';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:countires-controller');
class CountriesController {

    async listCountries(req: express.Request, res: express.Response) {
        const { query } = req;
        const countries = await countriesService.list(100, 0, (query.sort) ? query.sort : 'asc');
        res.status(200).send(countries);
    }

    async getCountryById(req: express.Request, res: express.Response) {
        const country = await countriesService.readById(req.params.countryId);
        res.status(200).send(country);
    }

    async createCountry(req: express.Request, res: express.Response) {
        const countryId = await countriesService.create(req.body);
        res.status(201).send({id: countryId});
    }

    async patch(req: express.Request, res: express.Response) {
        
        log(await countriesService.patchById(req.body));
        res.status(204).send(``);
    }

    async put(req: express.Request, res: express.Response) {
        log(await countriesService.updateById({id: req.params.countryId, ...req.body}));
        res.status(204).send(``);
    }

    async removeCountry(req: express.Request, res: express.Response) {
        log(await countriesService.deleteById(req.params.countryId));
        res.status(204).send(``);
    }
}

export default new CountriesController();