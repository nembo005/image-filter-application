"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFiles = exports.filterImageFromURL = void 0;
const axios = require('axios').default;
const fs_1 = __importDefault(require("fs"));
const Jimp = require("jimp");
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
function filterImageFromURL(inputURL) {
    return __awaiter(this, void 0, void 0, function* () {
        // link to issue on github and solution => https://github.com/oliver-moran/jimp/issues/775
        try {
            const { data: imageBuffer } = yield axios({
                method: 'get',
                url: inputURL,
                responseType: 'arraybuffer'
            });
            const photo = yield Jimp.read(imageBuffer);
            const outpath = `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`;
            const path = __dirname + outpath;
            const photoResult = yield photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .writeAsync(path);
            return path;
        }
        catch (error) {
            console.log('ERROR ===============> ', error);
        }
    });
}
exports.filterImageFromURL = filterImageFromURL;
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
function deleteLocalFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let file of files) {
            fs_1.default.unlinkSync(file);
        }
    });
}
exports.deleteLocalFiles = deleteLocalFiles;
//# sourceMappingURL=util.js.map