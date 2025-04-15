# SolAbs - Solana Account Abstraction with Social Login

A modern implementation of account abstraction on Solana, featuring social login integration and seamless payment processing. This project demonstrates how to create non-custodial wallets with Web2 authentication methods.

## Overview

SolAbs simplifies the Web3 onboarding experience by allowing users to interact with Solana blockchain using familiar Web2 authentication methods. Each user automatically gets a non-custodial wallet upon social login, with secure key management and encryption.

## Key Features

- **Social Authentication**

  - Google and GitHub login integration
  - Automatic wallet creation on first login
  - Non-custodial key management
  - WebAuthn support for hardware security

- **Secure Key Management**

  - AES-256-CBC encryption for private keys
  - Secure key storage in MongoDB
  - Zero plaintext exposure of sensitive data

- **Payment Integration**
  - Stripe payment processing
  - Automatic SOL top-up after payment
  - Real-time balance updates
  - Secure webhook handling

## Technology Stack

- Next.js 14 (App Router)
- TypeScript
- MongoDB with Prisma ORM
- NextAuth.js v5
- Stripe Payment Integration
- Solana Web3.js

## Project Status

⚠️ **Important Notice**: This project is currently a work in progress and serves as a demonstration of account abstraction implementation on Solana. While the core functionality works, it is not recommended for production use without thorough security audits and additional testing.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/sol-abs.git
cd sol-abs
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```env
DATABASE_URL="your_mongodb_url"
ENCRYPTION_KEY="your_32_byte_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_key"
STRIPE_SECRET_KEY="your_stripe_secret"
STRIPE_WEBHOOK_SECRET="your_webhook_secret"
NEXT_PUBLIC_DOMAIN="your_domain"
RPC_URL="your_solana_rpc_url"
PRIVATE_KEY="your_solana_private_key"
```

4. Run development server

```bash
yarn dev
```

## Contributing

This project is open source and we welcome contributions. Whether it's:

- Bug fixes
- Feature additions
- Documentation improvements
- Security enhancements

Please feel free to:

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

MIT License - feel free to use this code for your own projects.

## Disclaimer

This project is meant to demonstrate the implementation of account abstraction and social login integration with Solana. It is not feature-complete and should be thoroughly reviewed and tested before any production use.

## Contact

For inquiries about custom implementations or consulting, please reach out through GitHub issues or discussions.
