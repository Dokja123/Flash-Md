const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUpaS1BJSmRpQ1U3dm9TSklXdEovblhzK3RVazZJT0wyR0J5T25rMWRuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTRYM1hkNkkvenJZVVVJa3ZqaVh6UHQzbmgrd0lWcWc3eEhiR1RXTVFCaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnR2pwZkd4dEZNVS9jcEJHTGFKTVp2d3FUYmRQbWZWR01TZitrQmdWdWtFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrVGdBNVN0SHVEYlRPRWsrblpSeE1XN2xVb3hDeGQybUM4N3pjWFFLd0hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJEOXRCbXZnUlZIQmlmc0FTbThCeDVCQmRCL1RlYmNidy9iT2JXYkNPMzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFQTlNlNEhPaG9ZT3BMTm1aVVhITmd1Zlh3Z3JKcDdGTEtXbk4rWEJJVHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0FSRTVuc1VtR2tHR1cxQjNPZXBldU1nNW5IakZ5UWFkclhGYVdnWEQwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmxVaTdZYkdkRlQ3MTVINzlFdDduOGxMdVBEQWlSM20yWmpNdkVLN1RUcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRva0x0SlQvYk9VMFZ0OGZkUWNBejByNHhGT1VpTEgrY3U1N0J5bXBkWEx2SHBucmx5ZWtCbXlWZmtraTR4bXZmUHZtYlFjTTY3L2NaSmhPMU02bEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjksImFkdlNlY3JldEtleSI6IjVXQXpnUm5ZM0g5Wlc0KzVFTTI3VlZpcXNMUHdpRlN1bnFXOVhCZXVYNlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1MDEwMDExMzU0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5NTQxNjQyRDJFOTg3Nzc5RTUzQzA0MjQ3NERFNjZGNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyNjQ3NTgyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDUzZIQUNWWlNCMndLdnFnSE9MTGVBIiwicGhvbmVJZCI6Ijc0ZDcyZTU4LWJmNDUtNGMzZi1iNTkzLTdlNDZlZjZhNTFjNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzTFZtVytJenpVRi9xSXROd0l0M3RBYm5GL1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0FhNGlML0NZZk1Oc3lJQkdibHlRdzBySytzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1LQzVTQlJSIiwibWUiOnsiaWQiOiIyMjUwMTAwMTEzNTQzOjI2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkRpd2F0ZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSW14Z3VrR0VJaTFtTG9HR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRmU0bStieDNWR0x3SW9RNzM5cjFlc2Z5MWpSUlpkRUlpN0JFYlArM1oxUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiU1pIVnYzR0VVYlkxNDFmemFwck13YmVxb3BHa0wyNDNUTjZ4b1VwZHB0RnJlTHM0bUhWdWg2RXZUakt1TEN2Sk01L1RBWGVueVgyZTdBVE1kdUpPQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjZGNVgxb1pYcHdiZHJESEN1eFA0V2V6Yk9HMk8rQ1VNWnc1d29wbnQ5ajRJQXJaNHFlMUh5OEk2UTgvWGRYTTFHMG1Bc2hGemFRRlhjbnQrQTl4eURRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1MDEwMDExMzU0MzoyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSWHVKdm04ZDFSaThDS0VPOS9hOVhySDh0WTBVV1hSQ0l1d1JHei90MmRVIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNjQ3NTc0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpVTiJ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Diwate",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2250100113543",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/nfmsbu.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
