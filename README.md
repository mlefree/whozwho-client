# WhozWho Client

A TypeScript client library for interacting with the WhozWho service.

## Installation

```bash
npm install whozwho-client
```

## Usage

```typescript
import { Whozwho, AdviceType } from 'whozwho-client';

// Check if the client is principal
const isPrincipal = await Whozwho.IsPrincipal();

// Get advices
const advices = await Whozwho.GetAdvices();

// Post a new advice
const newAdvice = await Whozwho.PostAdvice(AdviceType.UPDATE);

// Mark an advice as ongoing
if (newAdvice) {
  await Whozwho.MentionThatAdviceIsOnGoing(newAdvice);
}
```

## Configuration

The client requires configuration for:
- WhozWho service URL
- Category and ID for identification
- Weight and alive period settings
- Optional mocking flag for testing

Example configuration:

```typescript
const config = {
  whozwho: {
    url: 'https://your-whozwho-service.com',
    category: 'your-category',
    id: 'your-id',
    weight: 1,
    alivePeriodInSec: 60,
    mocked: false
  },
  deploy: {
    version: '1.0.0'
  }
};
```

## API Reference

### Whozwho Class

#### Static Methods

- `IsPrincipal(): Promise<boolean>`
  - Checks if the client has the principal role for its category
  
- `GetAdvices(): Promise<Advice[]>`
  - Retrieves a list of advices from the service
  
- `PostAdvice(adviceType: AdviceType): Promise<Advice | null>`
  - Creates a new advice
  
- `MentionThatAdviceIsOnGoing(advice: Advice): Promise<void>`
  - Updates an advice status to ongoing

### Types

```typescript
enum AdviceType {
  UPDATE = 'you need an update'
}

class Advice {
  constructor(
    public id: string,
    public type: AdviceType
  ) {}
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 