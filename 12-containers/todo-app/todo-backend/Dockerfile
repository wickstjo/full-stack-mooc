FROM node:16

# COPY FILES & SET WORKDIR
COPY . ./backend
WORKDIR /backend

# INSTALL DEPENDENCIES
RUN npm install -y

# BOOT UP
CMD npm start

# docker build -t todo_backend .
# docker run -it -p 3000:3000 todo_backend