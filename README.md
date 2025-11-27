# RAG Chatbot Frontend

React frontend application for the CN Dump RAG Chatbot. Built with Vite and React.

## Features

- **Interactive Chat Interface**: Query the chatbot with natural language
- **Real-time Responses**: Get instant answers from the RAG system
- **Source Document Display**: View source documents used for answers
- **Modern UI**: Clean and responsive design

## Tech Stack

- **React**: UI library
- **Vite**: Build tool and dev server
- **CSS**: Styling

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8002
```

**Note**: The default backend URL is `http://localhost:8002`. Update this if your backend runs on a different port.

## Development

```bash
# Start development server
npm run dev
```

The frontend will be available at http://localhost:3001 (configured in `vite.config.js`).

## Building for Production

```bash
# Build for production
npm run build
```

The production build will be in the `dist/` directory.

## Project Structure

```
.
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point
│   └── App.css          # Component styles
├── index.html           # HTML template
├── index.css            # Global styles
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel deployment config
└── README.md           # This file
```

## Configuration

### Backend URL

Update the backend API URL in:
- `.env` file: `VITE_API_URL`
- Or directly in `App.jsx` if needed

### Port Configuration

Default port is `3001`. To change:
1. Update `vite.config.js`:
```js
server: {
  port: 3000  // Your desired port
}
```

2. Update `package.json` scripts if needed

## Deployment

### Vercel

The project includes `vercel.json` for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the project and deploy the `dist/` folder:

```bash
npm run build
# Deploy dist/ folder to your hosting service
```

## API Integration

The frontend communicates with the backend API:

- **Health Check**: `GET /health`
- **Query**: `POST /query`

See backend README for API documentation.

## Troubleshooting

### Backend Connection Issues

1. Ensure backend is running on the configured port
2. Check `VITE_API_URL` in `.env`
3. Verify CORS is enabled on backend

### Port Conflicts

Change the port in `vite.config.js` if port 3001 is in use.

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

[Your License Here]
