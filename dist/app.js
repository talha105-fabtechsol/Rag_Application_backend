"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import session from 'express-session';
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import compression from 'compression';
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./modules/logger");
const auth_1 = require("./modules/auth");
const utils_1 = require("./modules/utils");
const errors_1 = require("./modules/errors");
const v1_1 = __importDefault(require("./routes/v1"));
const seo_1 = require("./modules/seo");
const app = (0, express_1.default)();
if (config_1.default.env !== 'test') {
    app.use(logger_1.morgan.successHandler);
    app.use(logger_1.morgan.errorHandler);
}
app.set('trust proxy', 1);
// set security HTTP headers
app.use((0, helmet_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// increase timeout for long-running operations like PDF generation
app.use((req, res, next) => {
    // Set longer timeout for specific routes that might use Puppeteer
    if (req.path.includes('/reports') || req.path.includes('/report')) {
        req.setTimeout(600000); // 10 minutes
        res.setTimeout(600000); // 10 minutes
    }
    next();
});
// sanitize request data
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use('jwt', auth_1.jwtStrategy);
// Root SEO endpoints for crawlers and Nginx pass-through
app.get("/sitemap.xml", seo_1.seoController.getSitemapXml);
app.get("/robots.txt", seo_1.seoController.getRobotsTxt);
// limit repeated failed requests to auth endpoints
if (config_1.default.env === 'production') {
    app.use('/v1/auth', utils_1.authLimiter);
}
// v1 api routes
app.use('/v1', v1_1.default);
app.get("/api/health", (_, res) => {
    res.send({ status: "healthy" });
});
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError('Not found', http_status_1.default.NOT_FOUND));
});
// convert error to ApiError, if needed
app.use(errors_1.GlobalError);
app.get('/oauth2callback', (req, res) => {
    console.log('req.query', req.query);
    res.send('OAuth2 callback received');
});
exports.default = app;
