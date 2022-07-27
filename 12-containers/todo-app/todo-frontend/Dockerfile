FROM node:16

# COPY FILES & SET WORKDIR
COPY . ./frontend
WORKDIR /frontend

# INSTALL DEPENDENCIES
RUN npm install -y
RUN npm install -g -y serve

# SET BACKEND REF IN ENV
ENV REACT_APP_BACKEND_URL="http://localhost:3001"

# RUN UNIT TESTS
RUN CI=true npm test

# BUILD & SERVE
RUN npm run build
CMD serve build

# docker build -t todo_frontend .
# docker run -it -p 3000:3000 todo_frontend