# Use the official Playwright image as a base
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set the working directory inside the container
WORKDIR /app

# Install OpenJDK (Java) and other necessary packages
RUN apt-get update && apt-get install -y openjdk-11-jdk && apt-get clean

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-arm64
ENV PATH=$JAVA_HOME/bin:$PATH

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install && npm install -g allure-commandline --save-dev && npm install -g http-server && npm cache clean --force

# Copy all files from the host machine into the container
COPY . .

# Ensure all necessary Playwright dependencies are installed and the necessary folders are created
RUN npx playwright install --with-deps && mkdir -p /app/allure-results /app/allure-report

# Expose Allure report port
EXPOSE 5252

# Run the custom npm script to execute tests, generate and open Allure reports
CMD ["npm", "run", "test:allure-report"]