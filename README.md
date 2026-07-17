# ☀️ SunScope — Solar System Explorer & HelioView

An interactive, educational solar platform featuring a real-time **3D Solar System Explorer** and the **HelioView** multi-wavelength solar observation archive.

---

## 🚀 Features

### 🪐 Solar System Explorer (`/`)
- Fully interactive **3D Solar System** rendered with Three.js & React Three Fiber
- Click any planet to reveal **AI-powered fact panels** with detailed information
- Animated orbits, realistic planet scaling, and smooth camera controls
- Dynamic lighting centered on the Sun

### 🔭 HelioView Solar Observatory (`/helio`)
- **Live multi-wavelength solar imaging** — H-alpha, UV, and more
- **Archive browser** — explore and filter historical solar observations
- **Image Viewer** — deep-dive into individual captures with metadata
- **Upload** — submit your own solar observations to the community
- **Learn** — educational guides on wavelengths, solar phenomena, and safety
- **User Accounts** — save favourites and manage your profile

---

## 🗂️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Solar Explorer | 3D interactive solar system |
| `/helio` | Home | HelioView dashboard with live feed |
| `/archive` | Archive | Browse historical solar images |
| `/viewer/:id` | Viewer | Full-screen image viewer with metadata |
| `/learn` | Learn | Educational content & safety guides |
| `/upload` | Upload | Submit solar observations |
| `/account` | Account | User account management |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Three.js + React Three Fiber** | 3D solar system rendering |
| **Tailwind CSS** | Styling |
| **shadcn/ui + Radix UI** | Accessible UI components |
| **Framer Motion** | Animations & transitions |
| **Supabase** | Backend, auth & database |
| **TanStack Query** | Server state management |
| **React Router v6** | Client-side routing |
| **Recharts** | Data visualization |
| **React Hook Form + Zod** | Form handling & validation |

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

```sh
npm run dev        # Start development server with HMR
npm run build      # Build for production
npm run build:dev  # Build in development mode
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following keys:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/
│   ├── celestial/    # 3D solar system components (Sun, Planet, CameraController)
│   ├── ui/           # shadcn/ui base components
│   ├── Header.tsx
│   ├── SolarSystem3D.tsx
│   ├── SpaceExplorer.tsx
│   ├── PlanetInfoPanel.tsx
│   ├── TimeControl.tsx
│   └── ...
├── hooks/            # Custom React hooks
├── integrations/     # Supabase client & type definitions
├── lib/              # Utilities and mock data
├── pages/
│   ├── SolarExplorer.tsx   # 3D explorer entry point
│   ├── Index.tsx           # HelioView home
│   ├── Archive.tsx
│   ├── Viewer.tsx
│   ├── Learn.tsx
│   ├── Upload.tsx
│   └── Account.tsx
└── App.tsx           # Root router
```

---

## 🌐 Deployment

### Lovable (Recommended)
Open your [Lovable Project](https://lovable.dev/projects/474e364f-f962-46bd-b295-7703a7ec38dc) and click **Share → Publish**.

### Custom Domain
Navigate to **Project → Settings → Domains** and click **Connect Domain**.
See: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## 🔒 Safety & Credits

Solar images are provided for **educational purposes only**. Never observe the Sun directly without certified solar filters. All imagery is captured with specialized equipment.

Data and imagery credits are listed on the `/learn` page within the app.

---

## 📝 License

This project was built with [Lovable](https://lovable.dev). Educational use encouraged.
