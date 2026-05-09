# As we need node to run this project, we have to pull this using image name
# lts -> latest LTS version
FROM node:lts 

# We used pnpm instead of default npm. Thats why we have to install it first
RUN npm install -g pnpm

# Working directory
WORKDIR /usr/src/app

# To install all the dependencies of the project, we have to copy the package.json file and others to directory
COPY package.json pnpm-lock.yaml* ./


# After copying package.json and others, we have to install them using below command
# --ignore-scripts is used for allowing build scripts for any package which needs external execution
RUN pnpm install --ignore-scripts

# Then we will copy the project files
COPY . .

# Declaring running port
EXPOSE 3000

# Starint point of the project. First trigger of the container of built container
CMD ["pnpm","run","start:prod"]