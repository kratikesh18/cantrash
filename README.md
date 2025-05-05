# 🗑️ cantrash

**cantrash** is a simple and lightweight Node.js CLI tool to safely “remove” unwanted code files or folders by moving them to a separate `.cantrash` directory — without deleting them from your project. This allows you to keep your codebase clean while preserving old files for recovery if needed.

---

## 🚀 Features

✅ Move files or folders to `.cantrash` without permanent deletion  
✅ Keep your main project clean and organized  
✅ Easily restore files when needed  
✅ Simple CLI commands  
✅ Works across Windows, macOS, and Linux

---

## 📦 Installation

```bash
npm install -g cantrash
```

---

## ⚙️ Usage

```bash
cantrash <file_or_folder_path>
```

### Example

```bash
cantrash src/oldComponent.js
```

This will move `oldComponent.js` to `.cantrash/src/oldComponent.js`

---

## ♻️ Restore Files

```bash
cantrash restore <file_or_folder_path>
```

Example:

```bash
cantrash restore src/oldComponent.js
```

---

## 🧹 Empty Trashcan

```bash
cantrash empty
```

⚠️ This will **permanently delete** all files in `.cantrash`.

---

## 💡 Why use cantrash?

- Safe removal: No accidental deletions  
- Organized projects: Keep unused code out of the main tree  
- Version control friendly: `.cantrash` can be added to `.gitignore`  
- Fast recovery: Restore files in seconds

---

## 📂 Configuration

You can customize the trash directory by creating a `.cantrashrc` file:

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

MIT License © 2025 [kratikesh18]

---

## ⭐️ Support

If you like this project, please give it a ⭐️ on GitHub! It helps a lot 🚀