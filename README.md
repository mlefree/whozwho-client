# 🌟 WhozWho Client

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Version](https://img.shields.io/badge/version-1.1.2-green.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

A client for [WhozWho](https://github.com/mlefree/whozwho) services with seamless integration and error handling.

[Getting Started](#🚀-getting-started) •
[Features](#✨-features) •
[Installation](#📦-installation) •
[Usage](#💡-usage) •
[API](#📚-api) •
[Contributing](#🤝-contributing)

</div>

## 📦 Installation

```bash
npm install whozwho-client
# or
yarn add whozwho-client
```

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

- `memory-bank-rules.md`: Rules to follow and to consider in all contexts
- `projectbrief.md`: Overview of the project, core requirements, and goals
- `productContext.md`: Why the project exists, problems it solves, and how it works
- `systemPatterns.md`: System architecture, key technical decisions, and design patterns
- `techContext.md`: Technologies used, development setup, and technical constraints
- `activeContext.md`: Current work focus, recent changes, and next steps
- `progress.md`: What works, what's left to build, and known issues

=> !! These files should always be considered as a context and kept up-to-date !!

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
    version: '1.1.2'
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

### `AdviceType`

Enum for different types of advice:

```typescript
enum AdviceType {
  UPDATE = 'you need an update'
}
```

### `AdviceStatus`

Enum for tracking the status of advice:

```typescript
enum AdviceStatus {
  TODO = 'toDo',
  ONGOING = 'onGoing',
  DONE = 'done'
}
```

### `Question`

Enum for different types of questions that can be asked to the WhozWho service:

```typescript
enum Question {
  PRINCIPAL = 'have I the principal role for my category ?',
  ADDRESS_ALL = 'what is all actors (from a category) addresses ?',
  ADDRESS_PRINCIPAL = 'what is principal actor (from a category) address ?'
}
```

### `Answer`

Enum for standard answers from the WhozWho service:

```typescript
enum Answer {
  YES = 'yes',
  NO = 'no'
}
```

## 🔧 Configuration

| Option           | Type    | Description                           | Default Value           |
|------------------|---------|---------------------------------------|-------------------------|
| serverUrl        | string  | WhozWho service URL                   | 'http://localhost:3003' |
| myUrl            | string  | URL of this service instance          | 'http://localhost:3000' |
| category         | string  | Service category                      | 'default'               |
| id               | number  | Service identifier (must be a number) | 1                       |
| weight           | number  | Instance weight                       | 1                       |
| alivePeriodInSec | number  | Health check interval                 | 60                      |
| disabled         | boolean | Enable mock mode                      | false                   |

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Release process

Before any git push, consider to align documentation: readme, changelog, badge version, memory bank...

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
