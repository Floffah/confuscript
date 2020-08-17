import {platform} from "os";

export default {
    npm: platform() === "win32" ? "npm.cmd" : "npm",
    npx: platform() === "win32" ? "npx.cmd" : "npx",
    node: platform() === "win32" ? "node.cmd" : "node",
}
