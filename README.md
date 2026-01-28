# Credit Card Management System 💳

A modern, feature-rich credit card management application built with React, TypeScript, and Vite. This application provides a comprehensive dashboard for managing credit cards, tracking transactions, monitoring rewards, and handling billing payments.

## Final View
https://drive.google.com/file/d/1A495dFpDLkSg-9irpmAnaWPNTZPIfWJk/view?usp=sharing


## ✨ Features

### 📊 Dashboard
- **Real-time Overview**: View total balance, spending trends, and available credit
- **Interactive Charts**: Visual representation of spending patterns using Recharts
- **Quick Actions**: Fast access to common tasks like viewing transactions and making payments
- **Recent Transactions**: Monitor your latest card activity

### 💳 Card Management
- **Multiple Cards**: Support for managing multiple credit cards
- **Card Details**: Track card limits, balances, and usage
- **Visual Card Display**: Interactive card UI with animations
- **Card Status Monitoring**: Track active, inactive, and pending cards

### 📈 Transactions
- **Transaction History**: Comprehensive list of all transactions
- **Search & Filter**: Find transactions by date, amount, or category
- **Export Functionality**: Download transaction data in Excel or PDF format
- **Categorization**: Automatic transaction categorization

### 💰 Billing & Payments
- **Payment Processing**: Make payments directly from the dashboard
- **Due Date Tracking**: Never miss a payment with due date reminders
- **Payment History**: View all past payments
- **Outstanding Balance**: Monitor amounts due
- **Export Reports**: Export billing statements in multiple formats

### 🎁 Rewards & Cashback
- **Points Tracking**: Monitor accumulated reward points
- **Redemption System**: Redeem points for gift cards and cashback
- **Centralized History**: Track all redemptions across sessions
- **Real-time Updates**: Instant point balance updates after redemption

### 📤 Export Capabilities
- **Excel Export**: Export data to Excel format using XLSX
- **PDF Export**: Generate professional PDF reports with jsPDF
- **Custom Formatting**: Well-formatted exports with headers and styling
- **Multiple Data Sources**: Export transactions, billing, and rewards data

## 🚀 Technology Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router 7.13.0
- **Charts**: Recharts 3.7.0
- **Animations**: Motion 12.29.2
- **Icons**: Lucide React 0.563.0
- **Forms**: React Hook Form 7.71.1
- **Notifications**: React Toastify 11.0.5
- **PDF Generation**: jsPDF 4.0.0 + jsPDF AutoTable 5.0.7
- **Excel Generation**: XLSX 0.18.5

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Sidebar.tsx    # Side navigation
│   │   └── dashboard/     # Dashboard-specific components
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   └── ...           # Other pages
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── router.ts          # Route configurations
├── public/                # Public assets
├── eslint.config.js       # ESLint configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creditCardManagement/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run preview` | Preview production build locally |

## 🎨 Key Features Implementation

### State Management
- **Context API**: Centralized state management using React Context
- **Local Storage**: Persistent data storage for cards, transactions, and redemptions
- **Real-time Updates**: Automatic UI updates on state changes

### Export Functionality
The application includes a custom `useExport` hook that provides:
- Excel export with XLSX library
- PDF export with jsPDF and autoTable
- Automatic column configuration
- Custom styling and formatting

### Toast Notifications
- Non-blocking user notifications using react-toastify
- Success, error, and info messages
- Customizable positioning and styling
- Auto-dismiss functionality

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🔧 Configuration

### TypeScript
The project uses strict TypeScript configuration for type safety:
- Strict mode enabled
- Path aliases for cleaner imports
- Type checking for all files

### ESLint
Code quality is maintained through ESLint with:
- React-specific rules
- TypeScript integration
- Automatic code formatting

### Vite
Optimized build configuration:
- Fast Hot Module Replacement (HMR)
- Optimized production builds
- Plugin-based architecture

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication and authorization
- [ ] Multi-currency support
- [ ] Budget tracking and alerts
- [ ] Credit score monitoring
- [ ] Automated payment scheduling
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Email notifications
- [ ] Advanced analytics and insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed with ❤️ using React, TypeScript, and Vite

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- All open-source contributors whose libraries made this possible

---

**Happy Card Managing! 💳✨**
