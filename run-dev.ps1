# Запускаем frontend в новом окне PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run start"

# Запускаем backend в новом окне PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start"