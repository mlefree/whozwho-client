# 🌟 WhozWho Client

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.6.7-purple.svg)](https://axios-http.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-red.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

A client for [WhozWho](https://github.com/mlefree/whozwho) services with seamless integration and error handling.

[Getting Started](#🚀-getting-started) •
[Features](#✨-features) •
[Installation](#📦-installation) •
[Usage](#💡-usage) •
[API](#📚-api) •
[Contributing](#🤝-contributing)

</div>

## 🚀 Getting Started

WhozWho Client provides a seamless interface to interact with WhozWho services. Built with TypeScript for type safety
and modern JavaScript features for developer productivity.

```typescript
import { Whozwho } from 'whozwho-client';

const client = new Whozwho({
  whozwho: {
    serverUrl: 'https://your-whozwho-service.com',
    myUrl: 'https://your-service.com',
    category: 'your-category',
    id: 1  // Numeric ID for your service instance
  }
});

// Check if user is principal
const isPrincipal = await client.isPrincipal();
console.log('Is Principal:', isPrincipal);
```

## ✨ Features

- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🚦 **Smart Error Handling**: Robust error management and logging
- 🔄 **Health Checks**: Automated service health monitoring
- 🎯 **Advice Management**: Easy handling of service advices
- 🔌 **Mock Mode**: Built-in mock mode for testing
- 📝 **Extensive Logging**: Detailed logging for debugging

## 📚 Documentation

### Memory Bank

This project uses a Memory Bank for comprehensive documentation and context retention. The Memory Bank is located in the
`.memory-bank` directory and contains the following files:

- `projectbrief.md`: Overview of the project, core requirements, and goals
- `productContext.md`: Why the project exists, problems it solves, and how it works
- `systemPatterns.md`: System architecture, key technical decisions, and design patterns
- `techContext.md`: Technologies used, development setup, and technical constraints
- `activeContext.md`: Current work focus, recent changes, and next steps
- `progress.md`: What works, what's left to build, and known issues

## 📦 Installation

```bash
npm install whozwho-client
# or
yarn add whozwho-client
```

## 💡 Usage

### Basic Configuration

```typescript
import { Whozwho } from 'whozwho-client';

const client = new Whozwho({
  whozwho: {
    serverUrl: 'https://api.whozwho.com',
    myUrl: 'https://my-service.com',
    category: 'my-service',
    id: 1,  // Numeric ID for service instance
    weight: 1,
    alivePeriodInSec: 60,
    disabled: false
  },
  deploy: {
    version: '1.1.1'
  }
});
```

### Managing Advices

```typescript
// Get all advices
const advices = await client.getAdvices();

// Post new advice
const newAdvice = await client.postAdvice(AdviceType.UPDATE);

// Mark advice as ongoing
await client.mentionThatAdviceIsOnGoing(advice);
```

### Principal Role Verification

```typescript
const isPrincipal = await client.isPrincipal();
if (isPrincipal) {
  console.log('This instance is the principal!');
}
```

## 📚 API

### `Whozwho`

Main client class for interacting with WhozWho services.

#### Methods

- `getAdvices()`: Fetch all available advices
- `postAdvice(type: AdviceType)`: Create a new advice
- `mentionThatAdviceIsOnGoing(advice: Advice)`: Update advice status
- `isPrincipal()`: Check if current instance is principal
- `getPrincipalAddress(category: string)`: Get the address of the principal actor for a specific category
- `getAllAddresses(category: string)`: Get addresses of all actors in a specific category

### `Advice`

Data model for WhozWho advices.

```typescript
interface Advice {
  id: string;
  type: AdviceType;
}
```

## 🔧 Configuration

| Option           | Type    | Description                           |
|------------------|---------|---------------------------------------|
| serverUrl        | string  | WhozWho service URL                   |
| myUrl            | string  | URL of this service instance          |
| category         | string  | Service category                      |
| id               | number  | Service identifier (must be a number) |
| weight           | number  | Instance weight                       |
| alivePeriodInSec | number  | Health check interval                 |
| disabled         | boolean | Enable mock mode                      |

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript
- Powered by Axios
- Tested with Jest

---

<div align="center">

Made with ❤️ by mlefree

</div> 
