import express from 'express';
import countryService from '../services/countries.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:countries-controller');
class CountriesMiddleware {

    async validateRequiredCountryBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.code && req.body.name && req.body.population) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields `});
        }
    }

    async validateSameCountryDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const country = await countryService.getCountryByCode(req.body.code);
        if (country) {
            res.status(400).send({error: `country code already exists`});
        } else {
            next();
        }
    }

    async validateSameCodeBelongToSameCountry(req: express.Request, res: express.Response, next: express.NextFunction) {
        const country = await countryService.getCountryByCode(req.body.code);
        if (country && country.id === req.params.countryId) {
            next();
        } else {
            res.status(400).send({error: `Invalid code`});
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchCode = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.code) {
            log('Validating code', req.body.code);
            
            this.validateSameCodeBelongToSameCountry(req, res, next);
        } else {
            next();
        }
    }

    async validateCountryExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const country = await countryService.readById(req.params.countryId);
        if (country) {
            next();
        } else {
            res.status(404).send({error: `Country ${req.params.countryId} not found`});
        }
    }

    async extractCountryId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.countryId;
        next();
    }
}

export default new CountriesMiddleware();

