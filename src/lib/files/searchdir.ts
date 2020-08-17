import {readdirSync, statSync} from "fs";
import {resolve} from "path";

export default function searchdir(dir: string, extension: string, compare: string):boolean {
    let did: boolean = false;

    let ls: string[] = readdirSync(dir);

    for(let file of ls) {
        if(statSync(resolve(dir, file)).isDirectory()) {
            let subscan: boolean = searchdir(resolve(dir, file), extension, compare);
            if(subscan) did = true;
        } else if(file.split(".")[file.split(".").length - 1] === extension) {
            if(statSync(resolve(dir, file)).mtime > statSync(compare).mtime) {
                did = true;
            }
        }
    }

    return did;
}
