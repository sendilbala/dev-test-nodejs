import {CommonRoutesConfig} from '../common/common.routes.config';
import CountriesController from './controllers/Countries.controller';
import CountriesMiddleware from './middleware/Countries.middleware';
import express from 'express';

export class CountriesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CountriesRoutes');
    }

    configureRoutes() {
        this.app.route(`/Countries`)
            .get(CountriesController.listCountries)
            .post(
                CountriesMiddleware.validateRequiredCountryBodyFields,
                CountriesMiddleware.validateSameCountryDoesntExist,
                CountriesController.createCountry
            );

        this.app.param(`countryId`, CountriesMiddleware.extractCountryId);

        this.app.route(`/Countries/:countryId`)
            .all(CountriesMiddleware.validateCountryExists)
            .get(CountriesController.getCountryById)
            .delete(CountriesController.removeCountry);

        this.app.put(`/Countries/:countryId`,[
            CountriesMiddleware.validateRequiredCountryBodyFields,
            CountriesMiddleware.validateSameCodeBelongToSameCountry,
            CountriesController.put
        ]);

        this.app.patch(`/Countries/:countryId`, [
            CountriesMiddleware.validatePatchCode,
            CountriesController.patch
        ]);

        return this.app;
    }
}