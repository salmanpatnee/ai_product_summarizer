# 🚀 Modern Full Stack Project Starter

A **modern boilerplate** to kickstart your next project with a clean, scalable, and developer-friendly setup.  
Built with the latest tools in the ecosystem:

- ⚡ **Bun** – Blazing fast JavaScript runtime  
- ⚛️ **React 18** – UI library  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🧩 **shadcn/ui** – Beautifully designed UI components  
- ⚡ **Vite** – Next-gen frontend tooling  
- 📘 **TypeScript** – Type safety for maintainable code  
- 🧹 **ESLint** – Code linting  
- ✨ **Prettier** – Consistent code formatting  

---

## 📂 Project Structure

```bash
.
├── src/               # Application source code
│   ├── components/    # Shared UI components
│   ├── pages/         # App routes/pages
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities & helpers
│   └── styles/        # Global styles
├── public/            # Static assets
├── bun.lockb          # Bun lock file
├── tsconfig.json      # TypeScript configuration
├── eslint.config.js   # ESLint rules
├── prettier.config.js # Prettier rules
└── vite.config.ts     # Vite configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Bun](https://bun.sh) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Verify installation:

```bash
bun --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/modern-fullstack-starter.git
cd modern-fullstack-starter
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Run the Development Server

```bash
bun dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app in action. 🎉  

### 5. Build for Production

```bash
bun run build
```

### 6. Preview Production Build

```bash
bun run preview
```

---

## 🛠️ Features

- 🔥 Fast development with Vite + Bun  
- 🧩 Pre-configured UI components from **shadcn/ui**  
- 🎨 Tailwind CSS with dark mode support  
- ✅ Strict TypeScript setup  
- 🧹 Linting and formatting out of the box  

---

## 🤝 Contributing

Contributions are welcome! 🙌  

### Steps to Contribute:

1. **Fork** the repository  
2. **Clone** your fork:  
   ```bash
   git clone https://github.com/your-username/modern-fullstack-starter.git
   ```
3. Create a new branch for your feature or fix:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes and commit:  
   ```bash
   git commit -m "feat: add new component"
   ```
5. Push your branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request** on the main repo  

### Guidelines

- Use **TypeScript** for all new code  
- Follow **ESLint + Prettier** rules  
- Keep commits clear and descriptive (use [conventional commits](https://www.conventionalcommits.org/))  
- Update docs when needed  

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
