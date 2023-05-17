# Best Practices App

## 1 - Following 12 factor app

### 1.1  - Codebase - One codebase tracked in revision control, many deploys
  - Ex: git
### 1.2  - Dependencies - Explicitly declare and isolate dependencies
  - Ex: npm
### 1.3  - Config - Store config in the environment
  - Ex: .env
### 1.4  - Backing services - Treat backing services as attached resources
  - Locally using Docker, services are not installed locally
### 1.5  - Build, release, run - Strictly separate build and run stages
  - Heroku does it for us
### 1.6  - Processes - Execute the app as one or more stateless processes
  - create assets at building stage
  - don't store anything locally
### 1.7  - Port binding - Export services via port binding
  - even cron jobs
### 1.8  - Concurrency - Treat backing services as attached resources
  - Heroku does it for us
  - scale horizontally 
### 1.9  - Disposability - Maximize robustness with fast startup and graceful shutdown
  - containers are disposable
  - Heroku does it for us
### 1.10 - Dev/prod parity - Keep development, staging, and production as similar as possible
  - 
### 1.11 - Logs - Treat logs as event streams
### 1.12 - Admin processes - Run admin/management tasks as one-off processes
  - Use the same codebase and environment but with a different entry point to perform administrative tasks, such as database migrations or maintenance

## 2 - Tests
### 2.1 - Minimum code coverage is 90%
### 2.2 - Every new feature should be tested
## 3 - Documentation
### 3.1 - Every route should have a documentation
### 3.2 - Every new feature should be documented
