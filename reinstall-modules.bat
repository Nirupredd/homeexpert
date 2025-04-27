@echo off
echo Cleaning up and reinstalling node_modules...

echo Removing existing node_modules...
rmdir /s /q node_modules
rmdir /s /q client\node_modules
rmdir /s /q server\node_modules

echo Installing client dependencies...
cd client
npm install
cd ..

echo Installing server dependencies...
cd server
npm install
cd ..

echo Done!
