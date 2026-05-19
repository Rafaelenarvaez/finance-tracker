# 💰 Finance Tracker

A responsive personal finance dashboard built with **Angular 15** and **Angular Material**, featuring real-time balance tracking, expense categorization, and interactive monthly charts.

🔗 **[Live Demo](https://finance-tracker-tau-eight.vercel.app/dashboard)**

---

## ✨ Features

- **Real-time balance** — income and expense totals update instantly across the app
- **Transaction management** — add and delete transactions with category tagging
- **Monthly chart** — bar chart visualization of income vs. expenses over time (Chart.js)
- **Persistent data** — transactions saved to localStorage, no backend required
- **Responsive UI** — works on desktop and mobile using Angular Material grid layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 15 |
| UI Library | Angular Material |
| Charts | Chart.js + ng2-charts |
| State | RxJS BehaviorSubject |
| Language | TypeScript |
| Deployment | Vercel |

---


## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Rafaelenarvaez/finance-tracker.git

# Install dependencies
cd finance-tracker
npm install

# Run development server
ng serve
```

Open `http://localhost:4200` in your browser.

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Balance cards + monthly chart
│   │   ├── add-transaction/    # Form to add income/expense
│   │   ├── transaction-list/   # List with delete functionality
│   │   └── header/             # Navigation header
│   ├── services/
│   │   └── finance.service.ts  # Reactive state with BehaviorSubject
│   └── models/
│       └── transaction.model.ts
```

---

## 💡 Key Technical Decisions

- **Reactive state with BehaviorSubject** — all components subscribe to a single source of truth via RxJS observables, avoiding prop drilling and manual change detection
- **No backend required** — data persisted in localStorage makes the app fully portable and instantly deployable
- **Angular Material** — consistent, accessible UI components without custom CSS overhead

---

## 👨‍💻 Author

**Rafael Narvaez** — Frontend Developer  
Angular · React · Node.js · TypeScript

[![LinkedIn](https://www.linkedin.com/in/rafaelnnarvaez/)
