# TODO List for Deploying Project and Adding Chatbot

## Deployment Tasks
- [ ] Check and install Heroku CLI if not present
- [ ] Login to Heroku account
- [ ] Create Heroku app for backend
- [ ] Set environment variables for backend (MONGO_URL, etc.)
- [ ] Push backend code to Heroku
- [ ] Verify backend deployment
- [ ] Build frontend React app
- [ ] Install Vercel CLI if not present
- [ ] Login to Vercel account
- [ ] Deploy frontend to Vercel
- [ ] Update frontend API calls to point to deployed backend URL
- [ ] Verify full app deployment

## Chatbot Addition Tasks
- [x] Install OpenAI package in backend
- [x] Create new model for consultancy chat messages
- [x] Create new controller for consultancy chatbot (integrate OpenAI API)
- [x] Create new route for consultancy chat
- [x] Update server.js to include new route
- [x] Create new frontend component/page for consultancy chatbot
- [x] Update frontend routing to include consultancy chat page
- [x] Add consultancy link to sidebar
- [x] Update package.json with OpenAI dependency
- [ ] Test chatbot functionality

## Testing and Finalization
- [ ] Test all features on live server
- [ ] Ensure chatbot provides 24/7 consultancy
- [ ] Fix any issues found during testing
