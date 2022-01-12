"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usingTenderly = void 0;
const misc_utils_1 = require("./misc-utils");
exports.usingTenderly = () => misc_utils_1.DRE &&
    (misc_utils_1.DRE.network.name.includes('tenderly') ||
        process.env.TENDERLY === 'true');
