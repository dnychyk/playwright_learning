# Playwright Tests

This repository contains automated end-to-end tests built using Playwright 
All code were written during yajsc-course

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/your-org/your-playwright-repo.git
cd your-playwright-repo 
```

Install dependencies: 
```bash
npm install
# or
yarn install
# or
pnpm install
```

Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests:

Run all tests in headless mode:
```bash
npx playwright test
```
Run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

Run a specific test file:
```bash
npx playwright test tests/example.spec.ts
```

Run tests using a tag (if tag-based filtering is used):
```bash
npx playwright test --grep @smoke
```

## 📊 Test Report:

Generate an HTML report:
```bash
npx playwright test --reporter=html
```

Open the latest HTML report:
```bash
npx playwright show-report
```