# Voyago Project - Interview/Discussion Questions & Answers

## 📋 Project Overview Questions

### Q: What is this project about?
**A:** Voyago is a full-stack tourism/travel booking platform for Lucca, Italy. It allows users to:
- Browse and book tour packages (bike tours, wine tasting, Cinque Terre, etc.)
- Rent services (bikes, rickshaws, guided tours, taxi/NCC, luxury cars)
- View reviews and testimonials
- Contact the company
- Manage bookings through a user dashboard
- Admin panel for managing content

### Q: What technologies did you use?
**A:** 
- **Frontend:** React 18, Vite, React Router, Zustand (state management), i18next (internationalization), Framer Motion (animations), CSS Modules
- **Backend:** Node.js, Express.js, MongoDB with Mongoose
- **Authentication:** Passport.js with Google OAuth 2.0, JWT tokens
- **Image Storage:** Cloudinary CDN
- **Deployment:** Vercel (frontend & backend)

### Q: Why did you choose these technologies?
**A:**
- **React + Vite:** Fast development, hot module replacement, optimized builds
- **Zustand:** Simpler than Redux, less boilerplate, built-in persistence
- **MongoDB:** Flexible schema for tour packages with varying fields
- **Cloudinary:** Reliable CDN for images, automatic optimization
- **Vercel:** Easy deployment, serverless functions support

---

## 🎨 Frontend Questions

### Q: How did you handle state management?
**A:** We use Zustand with multiple stores:
- `useAuthStore` - User authentication state
- `useServiceBookingStore` - Service booking flow (multi-step form)
- `useUserTicketsStore` - User's booked tickets
- `useDiscountStore` - Promo codes and discounts

Example:
```javascript
const useAuthStore = create(persist((set) => ({
  user: null,
  token: null,
  login: (userData) => set({ user: userData.user, token: userData.token }),
  logout: () => set({ user: null, token: null })
}), { name: 'auth-storage' }));
```

### Q: How does internationalization (i18n) work?
**A:** We use i18next with:
- Translation files in `public/locales/en/` and `public/locales/ar/`
- Namespaced translations: `home.json`, `booking.json`, `packages.json`, etc.
- RTL support for Arabic with `i18n.dir()` detection
- Usage: `const { t } = useTranslation('home'); t('service1_title')`

### Q: How did you implement the booking flow?
**A:** Multi-step wizard pattern:
1. **Step 1:** Service Selection (type, quantity, duration, date/time)
2. **Step 2:** Customer Details (form with validation)
3. **Step 3:** Payment Information
4. **Step 4:** Confirmation with booking reference

State is persisted in Zustand store with localStorage backup.

### Q: How does form validation work?
**A:** Centralized validation in `src/lib/validation.js`:
- `validateName()` - Length 2-50, letters/spaces/hyphens only, no repeated chars
- `validateEmail()` - Format validation, typo detection (gmail.con → gmail.com)
- `validatePhone()` - 7-15 digits, detects fake patterns
- `validatePassword()` - Strength meter, special chars requirement

### Q: How did you handle responsive design?
**A:** 
- CSS Modules with media queries
- `useMediaQuery` custom hook for conditional rendering
- Mobile-first approach with breakpoints at 576px, 768px, 992px

### Q: How do you handle image loading and errors?
**A:** `src/lib/imageUtils.js`:
- `getImageUrl()` - Maps service images to correct Cloudinary URLs
- `handleImageError()` - Fallback to placeholder on load failure
- Lazy loading with `loading="lazy"` attribute

### Q: How does the theme toggle (dark/light mode) work?
**A:** 
- `useTheme` hook manages theme state
- Stored in localStorage
- Applied via `data-theme` attribute on HTML element
- CSS variables change based on `[data-theme="dark"]`

---

## 🔧 Backend Questions

### Q: What is your API architecture?
**A:** RESTful API with Express.js:
```
/api/auth         - Authentication (login, register, Google OAuth)
/api/tourPackages - CRUD for tour packages
/api/services     - CRUD for services
/api/reviews      - Customer reviews (with approval system)
/api/contact      - Contact form submissions
/api/stats        - Site statistics
/api/upload       - Cloudinary image upload
```

### Q: How does authentication work?
**A:** 
1. **Local Auth:** Email/password with bcrypt hashing, JWT tokens
2. **Google OAuth:** Passport.js strategy
   - User clicks "Sign in with Google"
   - Redirects to Google consent screen
   - Callback receives user profile
   - Creates/updates user in MongoDB
   - Returns JWT token

```javascript
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });
  }
  done(null, user);
}));
```

### Q: How do you protect routes?
**A:** Middleware in `authMiddleware.js`:
```javascript
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

### Q: How is the database structured?
**A:** MongoDB collections:
- **users** - Authentication, roles (user/admin)
- **tourPackages** - Tours with images, pricing, descriptions
- **services** - Rental services (bikes, cars, etc.)
- **reviews** - Customer reviews with approval workflow
- **contacts** - Contact form submissions
- **stats** - Site statistics (years experience, customers, etc.)

### Q: What is the seed data for?
**A:** `seeds/seed.js` populates MongoDB with initial data:
- Tour packages with Cloudinary image URLs
- Services catalog
- Sample reviews
- Site statistics

Run once: `node seeds/seed.js`

### Q: How do you handle file uploads?
**A:** Cloudinary integration:
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload endpoint
router.post('/upload', async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'voyago'
  });
  res.json({ url: result.secure_url });
});
```

---

## 🚀 Deployment Questions

### Q: How is the project deployed?
**A:**
- **Frontend:** Vercel (auto-deploys from GitHub main branch)
- **Backend:** Vercel Serverless Functions
- **Database:** MongoDB Atlas (cloud)
- **Images:** Cloudinary CDN

### Q: How do you handle environment variables?
**A:**
- Local: `.env` file (not committed to git)
- Production: Vercel Environment Variables dashboard
- Variables: `MONGO_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `CLOUDINARY_*`

### Q: How do you handle SPA routing on Vercel?
**A:** `vercel.json` configuration:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures all routes go to React Router instead of 404.

---

## 🔒 Security Questions

### Q: How do you secure the API?
**A:**
- JWT tokens with expiration
- Password hashing with bcrypt (salt rounds: 10)
- Input validation and sanitization
- CORS configuration for allowed origins
- Admin-only routes protected by middleware

### Q: How do you prevent common attacks?
**A:**
- **XSS:** Input sanitization in `validation.js`
- **CSRF:** JWT in Authorization header (not cookies)
- **SQL Injection:** Not applicable (MongoDB), but use Mongoose schema validation
- **Brute Force:** Consider rate limiting (can add express-rate-limit)

---

## 🧪 Testing & Quality Questions

### Q: How do you ensure code quality?
**A:**
- ESLint configuration for consistent code style
- Component-based architecture for reusability
- Centralized utilities (validation, image handling)
- Git version control with meaningful commits

### Q: How would you test this application?
**A:**
- **Unit Tests:** Jest for validation functions, utilities
- **Component Tests:** React Testing Library
- **E2E Tests:** Cypress or Playwright
- **API Tests:** Supertest with Jest

---

## 📊 Performance Questions

### Q: How do you optimize performance?
**A:**
- **Lazy Loading:** React.lazy() for route-based code splitting
- **Image Optimization:** Cloudinary auto-optimization, lazy loading
- **State Persistence:** Zustand persist middleware (localStorage)
- **Caching:** Browser caching for static assets
- **Bundle Size:** Vite tree-shaking, dynamic imports

### Q: How do you handle loading states?
**A:**
- Suspense with Loader component for lazy-loaded routes
- Loading spinners during API calls
- Skeleton screens for better UX

---

## 🤝 Team & Process Questions

### Q: How did you collaborate as a team?
**A:**
- Git/GitHub for version control
- Feature branches and pull requests
- Task tracking (see TEAM_TASKS.md)
- Code reviews before merging

### Q: What challenges did you face?
**A:**
- Google OAuth callback URL configuration for different environments
- Image URL mapping between old and new Cloudinary folders
- Translation key management across components
- Multi-step form state persistence

### Q: What would you improve if you had more time?
**A:**
- Add comprehensive test suite
- Implement email notifications for bookings
- Add payment gateway integration (Stripe)
- Improve accessibility (WCAG compliance)
- Add PWA support for offline access
- Implement real-time chat support

---

## 💡 Specific Code Questions

### Q: Explain Zustand persist middleware
**A:**
```javascript
const useStore = create(
  persist(
    (set, get) => ({
      // state and actions
    }),
    {
      name: 'storage-key', // localStorage key
      partialize: (state) => ({ /* only persist certain fields */ })
    }
  )
);
```

### Q: How does the discount system work?
**A:**
- Automatic discounts: Group (10+ people = 25% off), Early bird (30+ days = 15% off)
- Promo codes: WELCOME10, FAMILY15, VIP25
- Applied in `useDiscountStore` with validation logic

### Q: Explain the image fallback system
**A:**
```javascript
export const handleImageError = (e, placeholder = PLACEHOLDER_IMAGE) => {
  if (e.target.src !== placeholder) {
    e.target.src = placeholder;
    e.target.onerror = null; // Prevent infinite loop
  }
};
```

---

## 🎯 Quick Facts to Remember

| Aspect | Technology/Approach |
|--------|---------------------|
| Frontend Framework | React 18 + Vite |
| State Management | Zustand |
| Styling | CSS Modules |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + Google OAuth (Passport.js) |
| Images | Cloudinary |
| i18n | i18next (EN/AR) |
| Animations | Framer Motion |
| Deployment | Vercel |

---

## 📝 Key Files to Know

- `src/app/routes.jsx` - All frontend routes
- `src/store/` - Zustand stores
- `src/lib/validation.js` - Form validation
- `src/lib/imageUtils.js` - Image handling
- `server/routes/` - API endpoints
- `server/middleware/authMiddleware.js` - Auth protection
- `server/config/passport.js` - Google OAuth config
- `public/locales/` - Translation files

Good luck with your discussion! 🚀
