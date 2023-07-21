"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const auth_route_1 = __importDefault(require("../modules/authModule/auth.route"));
const book_route_1 = __importDefault(require("../modules/bookModule/book.route"));
const user_route_1 = __importDefault(require("../modules/userModule/user.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default.authRouter,
    },
    {
        path: '/book',
        route: book_route_1.default.bookRouter,
    },
    {
        path: '/user',
        route: user_route_1.default.userRouter,
    },
];
defaultRoutes.forEach(route => {
    const apis = route.route.stack.map(path => {
        return { path: path.route.path, methods: path.route.methods };
    });
    apis.map(api => {
        console.log([
            api.methods,
            { route: `${config_1.default.api_route}${route.path}${api.path}` },
        ]);
    });
    router.use(route.path, route.route);
});
exports.default = router;
