# WhozWho Client Product Context

## Problem Statement
- Applications need to interact with WhozWho service
- Communication requires consistent health checks and advice management
- Role verification needs to be standardized
- Error handling and logging should be consistent

## Solution Overview
- TypeScript client library that handles:
  - Service communication via axios
  - Health check reporting
  - Advice management
  - Principal role verification
  - Error handling and logging

## User Experience Goals
- Simple and intuitive API
- Consistent error handling
- Clear feedback on service status
- Type-safe development experience
- Easy configuration

## Key Features
- Health check reporting with configurable parameters
- Advice management (get, create, update status)
- Principal role verification
- Configurable service endpoints
- Mock mode for testing
- TypeScript type definitions
- Comprehensive error handling

## User Workflows
1. Service Health Check:
   - Configure client
   - Send periodic health updates
   - Handle connection issues

2. Advice Management:
   - Get current advices
   - Create new advices
   - Update advice status
   - Handle advice lifecycle

3. Role Verification:
   - Check principal status
   - Handle role-based operations
   - Manage authorization

Note: This document reflects the current implementation and should be updated as features evolve. 