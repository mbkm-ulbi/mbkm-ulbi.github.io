import { $ } from "bun";
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";

function getAllHtmlFiles(dir) {
  let results = [];
  const list = readdirSync(dir);

  list.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recursively search in subdirectories
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (extname(filePath) === ".html") {
      results.push(filePath);
    }
  });

  return results;
}

async function modifyBaseHref(isProduction) {
  try {
    const filesArray = getAllHtmlFiles(".");

    filesArray.forEach((file) => {
      try {
        const content = readFileSync(file, "utf-8");
        const newBaseHref = isProduction ? '<base href="https://mbkm-ulbi.github.io/" />' : '<base href="/" />';
        const updatedContent = content.replace(/<base href=".*?" \/>/, newBaseHref);
        writeFileSync(file, updatedContent, "utf-8");
      } catch (err) {
        console.error(`Error processing file ${file}:`, err);
      }
    });
  } catch (err) {
    console.error("Error modifying base href:", err);
  }
}

async function updateBaseUrl(isProduction) {
  try {
    const settingsPath = "./src/js/customs/settings.js";
    const content = readFileSync(settingsPath, "utf-8");

    const newBaseUrl = isProduction ? "https://mbkm-ulbi.github.io/" : "/";
    const newSlugUri = isProduction ? "/mbkm-fe/" : "/";

    const updatedContent = content
      .replace(/export const baseUrl = ".*?";/, `export const baseUrl = "${newBaseUrl}";`)
      .replace(/export const slugUri = ".*?";/, `export const slugUri = "${newSlugUri}";`);

    writeFileSync(settingsPath, updatedContent, "utf-8");
    console.log("Settings updated successfully.");
  } catch (err) {
    console.error("Error updating baseUrl or slugUri:", err);
  }
}

async function runTailwindCommands(isProduction) {
  try {
    if (isProduction) {
      await $`tailwindcss -i ./src/css/raw/choices.css -o ./src/css/minify/choices.min.css --minify`;
      // await $`tailwindcss -i ./src/css/raw/filepond.css -o ./src/css/minify/filepond.min.css --minify`;
      // await $`tailwindcss -i ./src/css/raw/flatpickr.css -o ./src/css/minify/flatpickr.min.css --minify`;
      // await $`tailwindcss -i ./src/css/raw/notify.css -o ./src/css/minify/notify.min.css --minify`;
      await $`tailwindcss -i ./src/css/raw/main.css -o ./src/css/minify/main.min.css --minify`;
    } else {
      await $`tailwindcss -i ./src/css/raw/main.css -o ./src/css/minify/main.min.css --watch`;
    }
  } catch (err) {
    console.error("Error running Tailwind CSS commands:", err);
  }
}

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const mode = process.argv[2];

if (mode === "dev") {
  await modifyBaseHref(false);
  await updateBaseUrl(false);
  console.log(`${colors.green}Running in development (watch) mode, ${colors.yellow}happy coding!${colors.reset}`);
  await runTailwindCommands(false);
} else if (mode === "prod") {
  await modifyBaseHref(true);
  await updateBaseUrl(true);
  await runTailwindCommands(true);
  console.log(`${colors.blue}Done changing to production mode, ${colors.yellow}let's push it!${colors.reset}`);
} else {
  console.log("Usage: bun run switch-mode.js [dev|prod]");
}
