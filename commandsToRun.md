From the project root, run these in **two separate terminals**:

```
npm run dev:backend
```

```
npm run dev:frontend
```

Then open <http://127.0.0.1:5173>. The backend health check is at <http://localhost:3000/api/health>.

11:17

<br/>

kill $(lsof -ti tcp:5173 -sTCP:LISTEN)
