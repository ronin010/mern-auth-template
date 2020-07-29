FILE=/home/user/projects/mern-login-system/client/build

if [ -d "$FILE" ]; then
    echo " -- Removing current build directory -- "
    rm -r ./client/build
fi

echo " -- Creating new build file -- "
npm run deploy

git add .
git commit -m "committing to heroku"
git push heroku master