## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and utilities
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage component 
└── components/
    ├── index.ts             # Component exports
    ├── Layout.tsx           # Main layout wrapper
    ├── Header.tsx           # Top navigation bar
    ├── Sidebar.tsx          # Left sidebar navigation
    ├── HeroSection.tsx      # Main hero banner
    ├── CharacterCard.tsx    # Individual character card
    ├── CharacterFilter.tsx  # Filter buttons
    └── CharacterCarousel.tsx # Character grid/carousel
```

## 🎨 Design Features

### Header
- Fixed navigation bar with backdrop blur
- Logo with gradient styling
- Premium button with discount badge
- Timer countdown
- Theme toggle and login button

### Sidebar
- Fixed left sidebar with purple gradient
- Navigation icons with hover effects
- Active state indicators
- Get Premium button at bottom

### Hero Section
- Full-screen hero with animated background
- Character placeholders on left and right
- Gradient text effects
- Call-to-action button with animations

### Character Carousel
- Filterable character grid
- Premium badges
- Online status indicators
- Hover effects and animations
- Responsive grid layout

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

The clone is fully responsive and includes:
- Mobile-first design approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized spacing for different screen sizes

## 🎭 Animations

Built with Framer Motion for smooth, performant animations:
- Page load animations
- Hover effects on cards and buttons
- Scale and transform animations
- Staggered animations for lists
- Smooth transitions between states

## 🎨 Customization

### Colors
The design uses a consistent color palette:
- Primary: Purple gradients (`from-purple-500 to-purple-600`)
- Secondary: Pink accents (`from-pink-500 to-pink-600`)
- Background: Dark grays (`bg-gray-900`, `bg-gray-800`)
- Text: White and gray variants

### Typography
- Font: Inter (Google Fonts)
- Weights: Regular, Medium, Semibold, Bold
- Responsive text sizing

## 🔧 Development

### Adding New Components
1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in pages

### Styling Guidelines
- Use TailwindCSS utilities
- Follow the established color palette
- Maintain consistent spacing
- Include hover and focus states

### Animation Guidelines
- Use Framer Motion for complex animations
- Keep animations subtle and purposeful
- Ensure accessibility with reduced motion support

## 📄 License

This project is for educational purposes.

## env
NEXT_PUBLIC_BASE_URL= backend base url


