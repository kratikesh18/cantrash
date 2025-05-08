#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import readline from "readline";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("❌ Please provide a valid command (move, restore, empty)");
  process.exit(1);
}

const command = args[0];
console.log(args);
const targetPathArray = args[1].split("\\") || "";
// const targetPath = targetPathArray[targetPathArray.length - 1];
const targetPath = args[1];
console.log(targetPath);
const trashDir = ".cantrash";
const destPath = path.join(trashDir, targetPath);

const comments = {
  py: "#",
  cpp: "//",
  css: "/*,*/",
  js: "//",
  ts: "//",
  html: "<!--,-->",
};

async function readFirstLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rows = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rows) {
    return line;
    rows.close();
  }
}

async function moveToTrash() {
  try {
    if (!targetPath) {
      console.error("❌ Please provide a file or folder path to move.");
      process.exit(1);
    }

    await fs.ensureDir(path.dirname(destPath));

    const fileContent = fs.readFileSync(targetPath, "utf8");
    const fileExt = path.extname(targetPath).slice(1); // e.g., 'js'

    let prependedContent = fileContent;
    if (comments[fileExt]) {
      if (fileExt === "html" || fileExt === "css") {
        const [commentInit, commentEnd] = comments[fileExt].split(",");
        prependedContent = `${commentInit} ${targetPath} ${commentEnd}\n${fileContent}`;
      } else {
        prependedContent = `${comments[fileExt]} ${targetPath}\n${fileContent}`;
      }
      fs.writeFileSync(targetPath, prependedContent, "utf8");
    }

    await fs.move(targetPath, destPath, { overwrite: true });
    console.log(`✅ Moved ${targetPath} to ${destPath}`);
  } catch (err) {
    console.error(`❌ Failed to move: ${err.message}`);
  }
}

function move(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      if (err.code === "EXDEV") {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on("error", callback);
    writeStream.on("error", callback);

    readStream.on("close", function () {
      fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }
}

async function restoreFromTrash() {
  try {
    // Placeholder for restore logic
    const fileToRestore = (await fs.readdir(trashDir))[0];
    const oldPath = `${trashDir}/${fileToRestore}`;

    const pathToRestore = await readFirstLine(oldPath);

    // console.log(pathToRestore);
    const newPath = pathToRestore.split(" ")[1];

    try {
      await fs.move(oldPath, newPath, { overwrite: true });
      console.log("file restored");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error(`❌ Failed to restore: ${error.message}`);
  }
}

async function emptyTrashBin() {
  if (!(await fs.pathExists(trashDir))) {
    console.log("🟡 Trash directory does not exist. Nothing to empty.");
    return;
  }

  const files = await fs.readdir(trashDir);
  if (files.length === 0) {
    console.log("🟡 Trashcan is already empty.");
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `⚠️  Are you sure you want to delete ${files.length} items? (yes/no): `,
    async (answer) => {
      rl.close();
      if (answer.toLowerCase() === "yes" || "y") {
        try {
          await fs.emptyDir(trashDir);
          console.log(`✅ Trashcan emptied. ${files.length} items removed.`);
        } catch (error) {
          console.error(`❌ Failed to empty trash bin: ${error.message}`);
        }
      } else {
        console.log("✅ Empty operation cancelled.");
      }
    }
  );
}

async function main() {
  switch (command) {
    case "move":
      await moveToTrash();
      break;
    case "restore":
      await restoreFromTrash();
      break;
    case "empty":
      await emptyTrashBin();
      break;
    default:
      console.error("❌ Unknown command. Use move, restore, or empty.");
      process.exit(1);
  }
}

main();
