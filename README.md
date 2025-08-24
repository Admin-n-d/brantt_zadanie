# Brantt – WordPress Theme with Custom Gutenberg Blocks

Brantt is a custom WordPress theme that includes a custom Gutenberg block (**Latest Posts**) with a styled front-end and editor preview.  
The project was developed locally using [LocalWP](https://localwp.com/) and is ready for deployment in a WordPress environment.

---

## 📁 Project Structure

```
brantt/
├── build/                      # Compiled block assets (JS/CSS)
│   └── blocks/
│       └── latest-posts/
├── src/                        # Source files for custom blocks
│   └── blocks/
│       └── latest-posts/
│           ├── block.json
│           ├── edit.js
│           └── index.js
├── footer.php                  # Footer template
├── functions.php               # Theme functions and block registration
├── header.php                  # Header template
├── index.php                   # Main template file
├── package.json                # NPM dependencies & scripts
├── webpack.config.js           # Webpack configuration
└── .gitignore                  # Ignored files/folders for Git
```

---

## 🚀 Installation

1. **Clone the repository**
   ```
   git clone https://github.com/ORG_OR_USER/REPO_NAME.git
   ```

2. **Move the theme into WordPress themes directory**
   ```
   wp-content/themes/brantt
   ```

3. **Install dependencies**
   ```
   npm install
   ```

4. **Build the assets**
   - For production:
     ```
     npm run build
     ```
   - For development (watch mode):
     ```
     npm run start
     ```

---

## 🛠 Usage

1. Activate the **Brantt** theme in your WordPress admin panel.
2. In the Gutenberg editor, add the **Latest Posts** block from the Brantt category.
3. Customize the block settings as needed — styles are applied automatically.

---

## 📄 License
This project is licensed under the MIT License.
