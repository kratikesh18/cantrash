# 🗑️ trashcan

**trashcan** is a simple and lightweight Node.js CLI tool to safely “remove” unwanted code files or folders by moving them to a separate `.trashcan` directory — without deleting them from your project. This allows you to keep your codebase clean while preserving old files for recovery if needed.

---

## 🚀 Features

✅ Move files or folders to `.trashcan` without permanent deletion  
✅ Keep your main project clean and organized  
✅ Easily restore files when needed  
✅ Simple CLI commands  
✅ Works across Windows, macOS, and Linux

---

## 📦 Installation

```bash
npm install -g trashcan
```

---

## ⚙️ Usage

```bash
trashcan <file_or_folder_path>
```

### Example

```bash
trashcan src/oldComponent.js
```

This will move `oldComponent.js` to `.trashcan/src/oldComponent.js`

---

## ♻️ Restore Files

```bash
trashcan restore <file_or_folder_path>
```

Example:

```bash
trashcan restore src/oldComponent.js
```

---

## 🧹 Empty Trashcan

```bash
trashcan empty
```

⚠️ This will **permanently delete** all files in `.trashcan`.

---

## 💡 Why use trashcan?

- Safe removal: No accidental deletions  
- Organized projects: Keep unused code out of the main tree  
- Version control friendly: `.trashcan` can be added to `.gitignore`  
- Fast recovery: Restore files in seconds

---

## 📂 Configuration

You can customize the trash directory by creating a `.trashcanrc` file:

```json
{
  "trashDir": ".mytrash"
}
```

---

## 👥 Contributing

We welcome contributions! To get started:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License © 2025 [Your Name or GitHub Username]

---

## ⭐️ Support

If you like this project, please give it a ⭐️ on GitHub! It helps a lot 🚀
