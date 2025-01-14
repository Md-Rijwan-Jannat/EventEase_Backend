# EventEase Backend

The backend for **EventEase** is built using Node.js, Express, and MongoDB to support event creation, attendee management, ticketing, and payment processing. It follows the modular pattern for scalable and maintainable code structure. The backend API provides endpoints to handle user authentication, event management, and payment integration.

## Live URL

You can access the live backend API [here](https://event-ease-backend-indol.vercel.app/api).

## Technology Stack

- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB)
  - TypeScript
  - Modular Pattern
- **API**:
  - RESTful API design
  - JWT Authentication
- **Payment Integration**:
  - Integration with AmarPay for payment processing
- **Deployment**: Vercel

## Installation Guidelines

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git https://github.com/Md-Rijwan-Jannat/EventEase_Backend
   cd EventEase_Backend
   Public

   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:

   ```env
   PORT="5000"
   NODE_ENV ="development"
   DATABASE_URL="mongodb+srv://EventEase:EventEase@cluster0.jzg5j.mongodb.net/EventEase?retryWrites=true&w=majority&appName=Cluster0"
   BCRYPT_SLAT_ROUNDS=12
   JWT_ACCESS_SECRET="secret"
   JWT_ACCESS_EXPIRES_IN="60d"
   cloudinary_cloud_name= // todo put your cloudinary_cloud_name here.
   cloudinary_api_key=// todo put your cloudinary_api_key here.
   cloudinary_api_secret=// todo put your cloudinary_api_secret here.
   ```

````

4. **Run the Development Server**:

```bash
npm run dev
````

5. **Build the Project**:

   ```bash
   npm run build
   ```

6. **Run the Backend Server**:
   ```bash
   npm run dev
   ```

## Contact

**Project Maintainer**: [Md Rijwan Jannat](rijwanjannat36@gmail.com)

For more information, visit our backend gitHub [website](https://github.com/Md-Rijwan-Jannat/EventEase_Frontend).
FrontEnd live link [website](https://enet-ease.vercel.app/).
BackEnd live link [website](https://event-ease-backend-indol.vercel.app/)/api.

## Acknowledgements

- Special thanks to [Md Rijwan Jannat](https://github.com/Md-Rijwan-Jannat) for their contributions.
- This project is powered by [React](https://reactjs.org), [Node.js](https://nodejs.org), and [AmarPay](https://amarpay.com).
