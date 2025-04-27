@echo off
echo Cleaning up node_modules directories...

echo Removing node_modules from Git tracking...
git rm -r --cached node_modules
git rm -r --cached client/node_modules
git rm -r --cached server/node_modules

echo Committing changes...
git add .gitignore
git commit -m "Remove node_modules from Git tracking"

echo Done!
