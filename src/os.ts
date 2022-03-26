import os from "os";

// There are a few useful properties of the os module.

os.EOL; // gives the line delimiter sequence. It's \n on Linux and macOS, and \r\n on Windows

os.constants.signals; // gives a list of all the signals that can be used to interrupt a process.

os.constants.errno; // gives a list of all the error numbers that can be returned by the OS.

// Return the platform that Node.js was compiled for
let platform: NodeJS.Platform = os.platform();
console.log(platform); // linux, darwin, freebsd, linux, openbsd, win32, more

// Identifies the operating system:
let osType: string = os.type();
console.log(osType); // 'Darwin', 'Windows_NT', 'Linux', 'SunOS', 'FreeBSD', 'OpenBSD', 'NetBSD', 'DragonFlyBSD'

// Returns the architecture of the operating system.
let arch: string = os.arch();
console.log(arch);

// Returns a string that identifies the operating system release number
let release: string = os.release();
console.log(release)

// Return information on the CPUs available on your system.
let cpuInfo = os.cpus();
console.log(cpuInfo)

// Returns the number of bytes that represent the total memory available in the system.
let totalMemory = os.totalmem();
console.log(totalMemory)

// Returns available memory(RAM) in the system.
let freeMemory: number = os.freemem();
console.log(freeMemory)

// Return the path to the home directory of the current user.
let homeDirOfCurrentUser: string = os.homedir()
console.log(homeDirOfCurrentUser)

// Return the host name (Device Name).
let hostname: string = os.hostname();
console.log(hostname)

// Returns the details of the network interfaces available on your system.
let nicInfo = os.networkInterfaces();
console.log(nicInfo)

// Returns the number of seconds the computer has been running since it was last rebooted.
let uptime: number =os.uptime();
console.log(uptime)

// Returns an object that contains the current username, uid, gid, shell, and homedir
let userInfo: os.UserInfo<any> = os.userInfo()
console.log(userInfo)